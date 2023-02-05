const _ = require('lodash');
const path = require('path');
const { TYPE_DICT, SOURCE_DICT_DB_ANDROID } = require('../../dictMap');
const { matchFile } = require('../../utils/matchFile.js');
const { FILE_WEB_PUBLIC_DIR, FILE_DIR_OUT_DIR } = require('../../../config.js');

const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${SOURCE_DICT_DB_ANDROID}`;
const FILE_DIR = path.join(FILE_DIR_OUT_DIR, SOURCE_DICT_DB_ANDROID);

const DIR_TYPE = 'type49';
const { thSrcHandle } = require('../../utils/type.js');

async function share(v) {
    const appmsg = _.get(v, 'content.msg.appmsg', {});

    const urls = [appmsg.thumburl];
    const md5s = [thSrcHandle(v.imgPath)];
    const linkIcon = await matchFile(
        v,
        `${WEB_DIR}/${DIR_TYPE}`,
        `${FILE_DIR}/${DIR_TYPE}`,
        urls,
        md5s,
        TYPE_DICT.分享,
        false,
    );

    return linkIcon;
}

module.exports = share;
