const dayjs = require('dayjs');
const _ = require('lodash');

const config = require('../../config');
const typeMap = require('./typeMap.js');
const typeHandle = require('./type/index.js');

const { htmlToText } = require('../utils/type.js');
const { deepDiff } = require('../../utils/index.js');

const { TYPE_DICT } = require('../dictMap.js');

async function androidToMsg(_res) {
    const arr = [];

    // const res = _res.filter(v => {
    //     if (v.type != 49) return false;
    //     v.contentXX = xmlToJSON('android', v.content || '');
    //     return _.get(v, 'contentXX.msg.appmsg.type') == 6;
    // });

    // const res = _res.filter(v => v.msgSvrId == '4628883183528991835');
    const res = _res;

    console.log('处理的消息长度', res.length);

    for (let i = 0; i < res.length; i++) {
        const v = res[i];
        // console.log('v', v);
        // 原始数据
        const original = _.cloneDeep(v);
        // 最终解密数据
        const preData = _.cloneDeep(v);

        // 这里还会对资源进行下载 修改 HTML 中的路径未下载的本地路径
        const { type: _typePre } = typeMap(preData);
        if (!_typePre) throw new Error('unknown type');

        // 最终会合并到 $Wechat 的数据 贯穿整个处理流程
        const merger = {
            raw: original, // 原始数据
            key: {}, // 过程数据
            res: preData, // 最终数据
            data: {}, // 前端使用到的数据
        };

        // debug
        // if (_typePre !== TYPE_DICT.系统消息) continue;

        const { type: _typeUnity, html } = await typeHandle(_typePre, preData, original, merger);

        const type = _typeUnity || _typePre;
        if (!type) throw new Error('unknown type');

        // 方向的最后处理 因为一些 Type 中会修改 preData.isSend 例如 TYPE_SYSTEM
        let direction = preData.isSend == 1 ? 'go' : 'come';
        if (config.isFromOtherAccount) {
            direction = direction === 'go' ? 'come' : 'go';
        }

        const send = {};
        const receive = {};

        if (direction === 'go') {
            send.sender = config.rightNum; // v.talker
            send.senderName = config.rightName;

            receive.receiver = config.leftNum;
            receive.receiverName = config.leftName;
        }

        if (direction === 'come') {
            send.sender = config.leftNum; // v.talker
            send.senderName = config.leftName;

            receive.receiver = config.rightNum;
            receive.receiverName = config.rightName;
        }

        const t = v.createTime * 1;

        const msg = {
            source: 'Wechat',
            device: 'Phone',
            type,

            direction,

            ...send,
            ...receive,

            day: dayjs(t).format('YYYY-MM-DD'),
            time: dayjs(t).format('HH:mm:ss'),
            ms: t,

            // 都在 data 中处理 html 样式太多 挪到前端拼装 仅用来搜索
            content: htmlToText(html),
            html: html.replace(/(\r\n|\r|\n)/gim, '<br/>'),

            msAccuracy: true,

            $Wechat: {
                // diff: deepDiff(original, preData),
                ...merger,
            },
        };
        if (config.isFromOtherAccount) {
            _.set(msg, '_isDev.isFromOtherAccount', config.isFromOtherAccount);
        }
        // console.log(msg.type);
        // console.log(msg.content);
        // console.log(msg.html);
        // console.log('');
        arr.push(msg);
    }

    return arr;
}

module.exports = androidToMsg;
