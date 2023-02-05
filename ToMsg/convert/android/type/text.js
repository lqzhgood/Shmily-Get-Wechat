const _ = require('lodash');

const { FILE_WEB_PUBLIC_DIR } = require('../../../config');
const baseEmojiMap = require('../../../lib/emojiByBase/dist/hasAltBaseEmojiMap.json');
const unBaseEmojiMap = require('../../../lib/emojiByBase/dist/unAltBaseEmojiMap.json');

/**
 * @name:
 * @description:  这里的 emoji 没有中文说明(alias) 如果找到这里面的值 记得把用到的手动补充到 baseEmojiMap 里面去
 * @param {*}
 * @return {*}
 */

const black_list = ['[来自超级会员的分享]', '[会员专区]', '[我的帐户]', '[DQ服务]', '[微信客服]'];

function replaceBaseEmojiHtml(_t) {
    let t = _t;
    let testT = _t; // 仅用来测试是否还有未知表情

    // 这里替换 key 为 img 并添加 alias
    baseEmojiMap.forEach(v => {
        const keys = _.isArray(v.key) ? v.key : [v.key];
        keys.forEach(rk => {
            t = t.replaceAll(rk, getImgHtml(v, rk));
            testT = testT.replaceAll(rk, getImgHtml(v, ''));
        });
    });

    // 检测是否还有没添加 alias 的表情
    // 表情太多了, 用到多少添加多少 alias 吧
    unBaseEmojiMap.forEach(v => {
        v.key.forEach(key => {
            if (testT.includes(key)) {
                console.error(`找到未处理的表情 ${key} \n${testT}`);
            }
        });
    });

    // [鸡] 这样的一般是表情  这里搜一下有没有没处理的未知表情
    const guessEmoji = testT.match(/\[.+?\]/gm);
    if (_.isArray(guessEmoji) && _.pull(guessEmoji, ...black_list).length > 0) {
        console.error('猜测到可能未处理的表情', _.pull(guessEmoji, ...black_list), testT);
    }

    return t;
}

function getImgHtml(v, rk) {
    const { type, alias, webFile } = v;
    const url = `${FILE_WEB_PUBLIC_DIR}/baseEmoji/${webFile}`;
    return `<img class="baseEmoji" src="${encodeURI(
        url,
    )}" alt="${type}-${alias}" title="${type}-${alias}" data-replace-key="${rk}" />`;
}

function text(t) {
    return replaceBaseEmojiHtml(t);
}

module.exports = text;
