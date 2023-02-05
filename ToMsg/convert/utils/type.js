const path = require('path');
const cheerio = require('cheerio');
const FileType = require('file-type');

const { EXT_IMAGE } = require('../dictMap');

function htmlToText(html) {
    const $ = cheerio.load(html, { decodeEntities: false }, false);
    $('img').replaceWith((i, elm) => {
        const alt = elm.attribs.alt || '图';
        return `<span>[${alt}]</span>`;
    });
    return $.text();
}

function thSrcHandle(str) {
    return (str || '').replace(/^THUMBNAIL_DIRPATH:\/\/th_/, '');
}

/**
 * @name:
 * @description: 如果图片没有扩展 则加上扩展 有的话直接返回
 * @param {*} dir
 * @param {*} f
 * @return {*}
 */
async function giveImageExt(dir, f) {
    const { ext, name } = path.parse(path.join(dir, f));
    if (EXT_IMAGE.includes(ext.toLowerCase())) return f;

    // eslint-disable-next-line
    const { ext: _ext_l } = (await FileType.fromFile(path.join(dir, f))) || {};

    if (_ext_l) {
        const ext_l = _ext_l.toLowerCase();
        if (!EXT_IMAGE.includes(`.${ext_l}`)) {
            console.warn('⚠️', '解析非图片', path.join(dir, f));
        }
        return `${name}.${ext_l}`;
    } else {
        console.warn('⚠️', '图片文件无法识别', path.join(dir, f));
        return undefined;
    }
}

async function giveExt(dir, f) {
    const fullDir = f ? path.join(dir, f) : dir;
    const { ext, name } = path.parse(fullDir);

    // 部分后缀不处理
    if (['.doc'].includes(ext.toLowerCase())) return f;

    // eslint-disable-next-line
    let { ext: _ext_l } = (await FileType.fromFile(fullDir)) || {};

    if (_ext_l) {
        let ext_l = '.' + _ext_l.toLowerCase();

        if (ext.toLowerCase() !== ext_l) {
            if (ext) console.warn('⚠️', `后缀和源文件不同 已修改 ${ext} => ${ext_l}`, fullDir);
        }
        return `${name}${ext_l}`;
    } else {
        console.warn('⚠️', '文件无法识别', fullDir);
        return f;
    }
}

/**
 * @name:
 * @description:
 * @param {*} buffer
 * @param {*} f 文件路径 仅用来追溯问题附件
 * @param {*} showNoTips 未识别时是否提示， 目前仅用来尝试 emoji 是否加密
 * @return {*}
 */
async function giveExtByBuffer(buffer, f, showNoTips = true) {
    // eslint-disable-next-line
    const res = (await FileType.fromBuffer(buffer)) || {};
    const { ext } = res;
    if (!ext) {
        if (showNoTips) console.warn('⚠️', '文件无法识别', f);
        return null;
    } else {
        return `.${ext.toLowerCase()}`;
    }
}

module.exports = {
    thSrcHandle,
    htmlToText,
    giveImageExt,
    giveExt,
    giveExtByBuffer,
};
