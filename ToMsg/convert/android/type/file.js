const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const APP_ATTACH = require('../../../input/JSON/android/appattach.json');

const { FILE_WEB_PUBLIC_DIR, ASSETS_ROOT_DIR, FILE_DIR_OUT_DIR } = require('../../../config.js');
const { SOURCE_DICT_DB_ANDROID } = require('../../dictMap.js');

const FILE_DIR = path.join(FILE_DIR_OUT_DIR, SOURCE_DICT_DB_ANDROID);
const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${SOURCE_DICT_DB_ANDROID}`;

const { matchFile } = require('../../utils/matchFile.js');

const DIR_TYPE = 'file';

async function file(v) {
    const appmsg = _.get(v, 'content.msg.appmsg', {});
    const { title, md5 } = appmsg;

    const findInAppAttach = APP_ATTACH.find(a => v.msgId == a.msgInfoId);
    let webUrl;
    if (findInAppAttach) {
        v.findInAppAttach = findInAppAttach;
        const fileName = findInAppAttach.fileFullPath.split('/').slice(-1)[0];
        const sFile = path.join(ASSETS_ROOT_DIR, '_file', fileName);
        const hasFile = fs.existsSync(sFile);
        // 本地有这个文件
        if (hasFile) {
            fs.copySync(sFile, path.join(`${FILE_DIR}/${DIR_TYPE}`, fileName));
            webUrl = `${WEB_DIR}/${DIR_TYPE}/${fileName}`;
            return webUrl;
        }
    }

    webUrl = await matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, [], [title, md5]);
    if (!webUrl) {
        if (findInAppAttach) {
            console.warn(`未找到文件 ${findInAppAttach.fileFullPath}`, `请手动复制文件至 assets/_file 目录`);
        } else {
            console.warn(`没有找到文件 ${title}`);
        }
    }

    return webUrl;
}

module.exports = file;
