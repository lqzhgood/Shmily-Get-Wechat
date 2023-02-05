const dayjs = require('dayjs');
const _ = require('lodash');

const config = require('../config');
const { replaceField } = require('../utils/index');
const typeMap = require('./type/typeMap-wxbackup');
const handleType = require('./handle/handle-wxbackup');

const { htmlToText } = require('./handle/utils');



// 前面统一 xml 处理


async function ToMsg(_res) {
    const arr = [];
    const res = preConversionMsg(_res);

    for (let i = 0; i < res.length; i++) {
        const v = res[i];
        const original = _.cloneDeep(v);

        const direction = v.m_nsFromUsr === config.rightUser ? 'go' : 'come';

        const send = {};
        const receive = {};

        if (direction === 'go') {

            send.sender = v.m_nsFromUsr || config.rightNum;
            send.senderName = config.rightName;

            receive.receiver = v.m_nsToUsr || config.leftNum;
            receive.receiverName = config.leftName;
        }

        if (direction === 'come') {

            send.sender = v.m_nsFromUsr || config.leftNum;
            send.senderName = config.leftName;

            receive.receiver = v.m_nsToUsr || config.rightNum;
            receive.receiverName = config.rightName;
        }

        const t = v.createTime * 1000;

        const preData = msgPreData(v);

        // 这里还会对资源进行下载 修改 HTML 中的路径未下载的本地路径
        const { type: _typePre } = typeMap(preData);
        if (!_typePre) throw new Error('unknown type');
        const { type: _typeUnity, html } = await handleType(_typePre, preData, original);

        const type = _typeUnity || _typePre;
        if (!type) throw new Error('unknown type');

        const msg = {
            "source": "Wechat",
            "device": 'Phone',
            type,

            direction,

            ...send,
            ...receive,

            "day": dayjs(t).format('YYYY-MM-DD'),
            "time": dayjs(t).format('HH:mm:ss'),
            "ms": t,

            // 都在 webData 中处理 html 样式太多 挪到前端拼装 仅用来搜索
            content: htmlToText(html),
            html: html.replace(/(\r\n|\r|\n)/gim, '<br/>'),

            "msAccuracy": false,

            $Wechat: {
                webData: preData,
                original,
            },
        };

        arr.push(msg);
    }
    return arr;
}


function preConversionMsg(res) {
    return res.map(v => {

        replaceField(v, 'content', 'm_nsContent');
        replaceField(v, 'type', 'm_uiMessageType');
        replaceField(v, 'createTime', 'm_uiCreateTime');

        return v;
    });
}




function msgPreData(_msg) {
    const msg = _.cloneDeep(_msg);
    try {
        //非xml结构不解析
        if (msg.type !== 1
            && msg.type !== 3
            && msg.type !== 43
            && msg.type !== 62
            && msg.type !== 34
            && msg.content.indexOf('<') === 0
            && msg.content.indexOf('SystemMessages_HongbaoIcon.png') < 0) {
            msg.content = xmlToJSON(msg.content);
        }

        if (msg.type == '49') {
            if (msg.content.msg.appmsg.type == '19') {
                msg.content.msg.appmsg.recorditem = xmlToJSON(msg.content.msg.appmsg.recorditem);
            }
        }


        return msg;
    } catch (error) {
        console.error(error, msg);
        throw new Error(`未知的 xml 格式`);
    }
}



module.exports = {
    ToMsg,
};