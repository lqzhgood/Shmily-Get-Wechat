/**
 * @name:
 * @description: 用来填充的基础 Emoji 数据
 *               1. 消息中的 Emoji unicode 字符对应的图片
 *               2. 消息中的基础表情 (类似于 QQ 的基础表情)
 * @param {*}
 * @return {*}
 */

const fs = require('fs-extra');
const path = require('path');
const { uniq } = require('lodash');
const { encodeUnicode } = require('../../utils/index.js');

const emoji_qq = spellDir(require('./EmojiAliasMap/QQ经典/_list.js'));
const emoji_wechat = spellDir(require('./EmojiAliasMap/微信经典/_list.js'));
const emoji_emoji = spellDir(require('./EmojiAliasMap/emoji/_list.js'));

/**
 * @name:
 * @description: 已添加 alt(alias) 的表情 Map
 * @param {*}
 * @return {*}
 */
const EmojiAliasMap = [].concat(emoji_qq, emoji_wechat, emoji_emoji);

// 检查所有基础 EmojiAliasMap 是否存在
checkEmojiExist(EmojiAliasMap);

/**
 * @name:
 * @description: 微信apk里面导出的表情与快捷键对应的 Map
 * @param {*}
 * @return {*}
 */
const EmojiPathMap = require('./EmojiPathMap/list.json');
const allList = Object.entries(EmojiPathMap).reduce((pre, [key, file]) => {
    let f = pre.find(s => s.file == file);
    if (!f) {
        f = {
            file,
            key: [],
        };
        pre.push(f);
    }
    f.key.push(key);
    f.key = uniq(f.key);
    f.unicode = f.key.map(k => encodeUnicode(k));
    return pre;
}, []);

const hasAltBaseEmojiMap = allList
    .map(v => {
        const f = EmojiAliasMap.find(e => e.handleFile == v.file);
        if (f) {
            v.alias = f.alias;
            v.webFile = f.webFile;
            v.type = f.type;
        }
        return v;
    })
    .filter(v => v.alias);

const unAltBaseEmojiMap = allList.filter(v => !v.alias);

fs.mkdirpSync(path.join(__dirname, './dist/'));
fs.writeFileSync(
    path.join(__dirname, './dist/hasAltBaseEmojiMap.json'),
    JSON.stringify(hasAltBaseEmojiMap, null, 4).replaceAll('\\\\u', '\\u'),
);
fs.writeFileSync(
    path.join(__dirname, './dist/unAltBaseEmojiMap.json'),
    JSON.stringify(unAltBaseEmojiMap, null, 4).replaceAll('\\\\u', '\\u'),
);

console.log('未处理 Emoji 数量', allList.length - hasAltBaseEmojiMap.length, unAltBaseEmojiMap.length);

function spellDir(k) {
    const baseDir = k.baseDir;
    return k.list.map(v => {
        v.handleFile = baseDir + '/' + v.file;
        v.webFile = v.type + '/' + v.file;
        return v;
    });
}

function checkEmojiExist(arr) {
    arr.forEach(v => {
        if (!fs.existsSync(path.join(__dirname, 'EmojiAliasMap', v.webFile))) {
            console.error('文件不存在', v.webFile);
        }
    });
}
