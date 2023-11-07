const _ = require('lodash');
const path = require('path');
const { TYPE_DICT, SOURCE_DICT_DB_ANDROID } = require('../../dictMap.js');
const { matchFile } = require('../../utils/matchFile.js');
const { FILE_WEB_PUBLIC_DIR, FILE_DIR_OUT_DIR } = require('../../../config.js');

const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${SOURCE_DICT_DB_ANDROID}`;
const FILE_DIR = path.join(FILE_DIR_OUT_DIR, SOURCE_DICT_DB_ANDROID);

const DIR_TYPE = 'videoChannel';

async function videoChannel(v) {
    const appmsg = _.get(v, 'content.msg.appmsg', {});

    const avatar = await matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, [appmsg.finderFeed.avatar], [], TYPE_DICT.视频号, false);

    const desc = appmsg.finderFeed.desc;
    const nickname = appmsg.finderFeed.nickname;

    const coverUrl = await matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, [appmsg.finderFeed.mediaList.media.coverUrl, appmsg.finderFeed.mediaList.media.thumbUrl], [], TYPE_DICT.视频号, false);

    const o = {
        avatar,
        nickname,
        desc,
        media: {
            coverUrl,
            url: appmsg.finderFeed.mediaList.media.url,
            videoPlayDuration: appmsg.finderFeed.mediaList.media.videoPlayDuration,
        },
    };
    return o;
}

module.exports = videoChannel;
