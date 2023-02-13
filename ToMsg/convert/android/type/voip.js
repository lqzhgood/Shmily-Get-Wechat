const _ = require('lodash');

const { getLvBuffer } = require('../../utils/index.js');

function voipText(v) {
    let type, action;

    if (v.status == 3) {
        action = '取消';
    } else if (v.status == 6) {
        action = '接通';
    } else if (v.status == 4) {
        action = '被拒绝';
    } else {
        console.log('❌', 'unknown voip status', v.status);
        action = `[未知动作-${v.status}]`;
    }

    if (v.content === 'voip_content_voice') {
        type = '语音';
    } else if (v.content === 'voip_content_video') {
        type = '视频';
    } else {
        console.log('❌', 'unknown voip type', v.content);
        action = `[未知类型-${v.content}]`;
    }

    return `${type}${action}`;
}

function getDesByLvBuff(v, merger) {
    const arr = getLvBuffer(v.msgId);
    merger.key.lvBufferToUtf8 = Buffer.from(arr).toString('utf-8');
    const fDataIndex = _.findIndex(arr, k => k !== 0);
    const eDataIndex = _.findLastIndex(arr, k => k !== 0);
    const res = arr.splice(fDataIndex, eDataIndex - fDataIndex + 1);

    const msgLength = res.splice(0, 1); // 去掉第一个表示长度的字符
    const lvDes = Buffer.from(res).toString('utf-8');
    return lvDes;
}

function voip(v, merger) {
    return {
        voipText: voipText(v),
        voipDes: getDesByLvBuff(v, merger),
    };
}

module.exports = voip;
