const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const mm = require('music-metadata');

const slkToMp3 = require('slk-to-mp3');

const { FILE_WEB_PUBLIC_DIR, ASSETS_ROOT_DIR, FILE_DIR_OUT_DIR } = require('../../../config');
const { SOURCE_DICT_DB_ANDROID } = require('../../dictMap');

const { matchFile } = require('../../utils/matchFile.js');

const FILE_DIR = path.join(FILE_DIR_OUT_DIR, SOURCE_DICT_DB_ANDROID);
const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${SOURCE_DICT_DB_ANDROID}`;

const DB_VOICE = require('../../../input/JSON/android/voiceinfo.json');

const DIR_TYPE = 'voice2';

async function voice2(v, merger) {
    const { imgPath, content } = v;

    const code = imgPath;
    const p1 = code.substring(0, 2);
    const p2 = code.substring(2, 4);
    const assets_dir = path.join(ASSETS_ROOT_DIR, DIR_TYPE, p1, p2);

    // 目标文件名
    const fileName = `msg_${imgPath}.amr`;
    const baseName = path.parse(fileName).name;
    const srcF = path.join(assets_dir, fileName);

    const res = {
        mp3Url: undefined,
        time: -1, // ms
    };

    // 语音长度
    const db = DB_VOICE.find(d => v.msgSvrId === d.MsgId);
    if (db) merger.key.db = db;
    if (db && db.VoiceLength > 0) {
        res.time = db.VoiceLength;
    } else {
        res.time = content.split(':')[1];
    }

    // 最后计算 mp3 时长使用
    let mp3FileName;

    // 判断本地是否存在文件
    if (fs.existsSync(srcF)) {
        const destF = path.join(FILE_DIR, DIR_TYPE, fileName);
        fs.copySync(srcF, destF);
        if (path.extname(destF).toLowerCase() !== '.mp3') {
            await slkToMp3(destF, path.join(FILE_DIR, DIR_TYPE), baseName);
        }
        // 目标文件写 mp3
        mp3FileName = `${baseName}.mp3`;
        res.mp3Url = `${WEB_DIR}/${DIR_TYPE}/${mp3FileName}`;
    } else {
        // 如果不存在则去本地资源库查找 md5 一样的文件
        const mRes = await matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, null, [imgPath, code]);

        if (mRes) {
            const { base, name, ext } = path.parse(mRes);
            if (ext.toLowerCase() === 'mp3') {
                res.mp3Url = mRes;
            } else {
                const destF = path.join(FILE_DIR, DIR_TYPE, base);
                await slkToMp3(destF, path.join(FILE_DIR, DIR_TYPE), name);
                res.mp3Url = mRes.replace(new RegExp(`${ext}$`, 'i'), '.mp3');
            }
            mp3FileName = `${name}.mp3`;
        }
    }

    // mp3FileName 有赋值 说明找到了文件
    if (mp3FileName) {
        const mp3Dir = path.join(FILE_DIR, DIR_TYPE, mp3FileName);
        if (fs.existsSync(mp3Dir)) {
            const mp3Info = await mm.parseFile(mp3Dir);

            const l = _.get(mp3Info, 'format.duration');
            if (l) {
                res.time = l * 1000;
            }
        } else {
            // 这里说明有 mp3 文件,但是格式转换失败 读不到时长
            console.error('⚠️', '需要手动转语音格式后重新编译');
        }
    }
    return res;
}

module.exports = voice2;
