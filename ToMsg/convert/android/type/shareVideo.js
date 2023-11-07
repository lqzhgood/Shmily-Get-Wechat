const _ = require('lodash');
const path = require('path');
const { TYPE_DICT, SOURCE_DICT_DB_ANDROID } = require('../../dictMap.js');
const { matchFile } = require('../../utils/matchFile.js');
const { FILE_WEB_PUBLIC_DIR, FILE_DIR_OUT_DIR } = require('../../../config.js');

const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${SOURCE_DICT_DB_ANDROID}`;
const FILE_DIR = path.join(FILE_DIR_OUT_DIR, SOURCE_DICT_DB_ANDROID);

const DIR_TYPE = 'shareVideo';

async function shareVideo(v) {
    const appmsg = _.get(v, 'content.msg.appmsg', {});

    const sourcedisplayname = appmsg.sourcedisplayname;
    const title = appmsg.title;

    const thumburl = await matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, [appmsg.thumburl], [], TYPE_DICT.视频号, false);

    const o = {
        sourcedisplayname,
        thumburl,
        title,
        video: {
            duration: appmsg.mmbrandmpvideo.duration,
            articleurl: appmsg.mmbrandmpvideo.mpurl,
            videourl: appmsg.mmbrandmpvideo.videourl,
        },
    };
    return o;
}

module.exports = shareVideo;