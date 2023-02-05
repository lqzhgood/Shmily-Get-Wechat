const fs = require('fs-extra');
const path = require('path');

const { FILE_WEB_PUBLIC_DIR, ASSETS_ROOT_DIR, FILE_DIR_OUT_DIR } = require('../../../config');
const { SOURCE_DICT_DB_ANDROID } = require('../../dictMap');

const { matchFile } = require('../../utils/matchFile.js');

const FILE_DIR = path.join(FILE_DIR_OUT_DIR, SOURCE_DICT_DB_ANDROID);
const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${SOURCE_DICT_DB_ANDROID}`;

const DB_VIDE = require('../../../input/JSON/android/videoinfo2');

async function video(v) {
    const { imgPath, content } = v;
    const DIR_TYPE = 'video';

    const res = {
        mp4Url: undefined,
        thumbnail: undefined,
        time: -1, // s
    };

    const db = DB_VIDE.find(d => v.msgSvrId === d.msgsvrid);

    if (db && db.videolength > 0) {
        res.time = db.videolength;
    } else {
        res.time = content.split(':')[1];
    }

    const file_mp4 = `${imgPath}.mp4`;
    const file_mp4_th = `${imgPath}.jpg`;

    const assets_dir = path.join(ASSETS_ROOT_DIR, DIR_TYPE);

    const in_mp4 = path.join(assets_dir, file_mp4);
    if (fs.existsSync(in_mp4)) {
        const out_mp4 = path.join(FILE_DIR, DIR_TYPE, file_mp4);
        fs.copySync(in_mp4, out_mp4);
        res.mp4Url = `${WEB_DIR}/${DIR_TYPE}/${file_mp4}`;
    } else {
        const mRes = await matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, null, [imgPath]);
        res.mp4Url = mRes;
    }

    const in_mp4_th = path.join(assets_dir, file_mp4_th);
    if (fs.existsSync(in_mp4_th)) {
        const out_mp4_th = path.join(FILE_DIR, DIR_TYPE, file_mp4_th);
        fs.copySync(in_mp4_th, out_mp4_th);
        res.thumbnail = `${WEB_DIR}/${DIR_TYPE}/${file_mp4_th}`;
    }

    return res;
}
module.exports = video;
