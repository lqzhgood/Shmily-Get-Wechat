const fs = require('fs');
const ContactDb = require('../../input/JSON/android/rcontact.json');

/**
 * @name:
 * @description:
 * @param {*} v
 * @return null 代表不是 群聊
 *         {}  代表是群聊 但是在数据库找不到群聊信息
 *         {name,contentId,rcontact}
 */
function chatroomNormalHandler(v) {
    const isChatroom = isFromChatroom(v);
    if (!isChatroom) return null;

    if (!v.content) return {};

    const { contentId, content } = getChatroomContentId(v.content);

    if (!contentId) {
        return {};
    }

    v.content = content;

    const { $name, rcontact } = findChatroomSenderInfo(contentId);
    if (!rcontact) {
        // 貌似100%存在, 暂未发现有 contentId 但数据库中无 record 的现象
        fs.writeFileSync('./has_contentId_not_found_rcontact_in_db`.json', JSON.stringify({ v, contentId }, null, 4));
    }

    const o = {
        contentId,
        rcontact,
        $name,
    };

    return o;
}

function isFromChatroom(v) {
    return v.talker.endsWith('@chatroom');
}

function findChatroomSenderInfo(contentId) {
    const rcontact = ContactDb.find(v => v.username === contentId);
    if (!rcontact) {
        return {
            name: contentId,
        };
    }
    if (Array.isArray(rcontact.lvbuff.data)) {
        // 压缩 数组 [1,2,3] -> '1,2,3'
        rcontact.lvbuff.data = rcontact.lvbuff.data.join(',');
    }
    const $name = rcontact.conRemark || rcontact.nickname || rcontact.alias || rcontact.username || contentId;

    return { $name, rcontact, contentId };
}

// https://github.com/lqzhgood/Shmily-Get-Wechat/issues/5
// 群聊  "talker": "xxxxx@chatroom", content格式为  xxxx:\n<xml.... 为第一行开头
function getChatroomContentId(content) {
    let contentId;

    // 如果开头不是 < 且 第一行结尾是 : 那么过滤掉第一行
    content = content.replace(/^[^<].+:\n/, match => {
        contentId = match.replace(/:\n$/, '');
        return '';
    });

    return { contentId, content };
}

module.exports = {
    isFromChatroom,
    chatroomNormalHandler,
    findChatroomSenderInfo,
    getChatroomContentId,
};
