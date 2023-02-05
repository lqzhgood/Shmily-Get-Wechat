const fs = require('fs-extra');
const path = require('path');

const { SOURCE_DICT_WXBACKUP } = require('../dictMap');
const ASSETS_ROOT_DIR = path.join(__dirname, '../../input/JSON/wxbackup');
const { FILE_WEB_PUBLIC_DIR, FILE_DIR_OUT_DIR } = require('../../config');
const { xmlToJSON } = require('./utils');
const { matchFile } = require('./matchFile');

const FILE_DIR = path.join(FILE_DIR_OUT_DIR, SOURCE_DICT_WXBACKUP);
const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${SOURCE_DICT_WXBACKUP}`;

function image2(names) {
    return names.filter(n => fs.existsSync(path.join(ASSETS_ROOT_DIR, 'image', n))).map(n => `${WEB_DIR}/${n}`);
}

function voice2(file, time) {
    return {
        mp3Url: `${WEB_DIR}/${file}`,
        time,
    };
}

function video(file) {
    return {
        mp4Url: `${WEB_DIR}/${file}`,
        thumbnail: undefined,
    };
}

async function emoji(v) {
    const DIR_TYPE = 'emoji';

    v.content = xmlToJSON(SOURCE_DICT_WXBACKUP, v.content || '');
    const msg = _.get(v, 'content.msg', {});
    const urls = [_.get(msg, 'emoji.cdnurl'), _.get(msg, 'emoji.thumburl')];

    const md5s = []; // TODO

    const url_emoji = await matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, urls, md5s);

    return url_emoji;
}

function voip(v) {
    v.content = xmlToJSON(SOURCE_DICT_WXBACKUP, v.content || '');
    const msg = _.get(v, 'content.msg', {});
    return _.get(msg, 'voipinvitemsg')
        ? '视频发起'
        : _.get(msg, 'voiplocalinfo.duration') == 0
        ? '视频取消'
        : '视频接通';
}

function pay(v) {}

module.exports = {
    image2,
    voice2,
    video,
    emoji,
    voip,
    pay,
};
