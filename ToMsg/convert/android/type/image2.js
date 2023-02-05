const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const IMG_INFO2 = require('../../../input/JSON/android/ImgInfo2.json');
const { giveImageExt, thSrcHandle } = require('../../utils/type.js');
const { matchFile } = require('../../utils/matchFile.js');

const { SOURCE_DICT_DB_ANDROID } = require('../../dictMap');
const { FILE_WEB_PUBLIC_DIR, ASSETS_ROOT_DIR, ImgInfo2SelectIndex, FILE_DIR_OUT_DIR } = require('../../../config');
const FILE_DIR = path.join(FILE_DIR_OUT_DIR, SOURCE_DICT_DB_ANDROID);
const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${SOURCE_DICT_DB_ANDROID}`;

//  "${x}.temp.jpg"
//  "th_${x}"
//  "th_${x}hd"

// 全部是 THUMBNAIL_DIRPATH://th 开头
async function image2(v) {
    const DIR_TYPE = 'image2';

    const { imgPath, msgSvrId } = v;
    let res = [];

    // 先匹配数据库里面的
    const findInDbArr = IMG_INFO2.filter(d => d.msgSvrId == msgSvrId);
    const findInDbArrUniq = _.unionBy(
        findInDbArr,
        d => `${d.msgSvrId}_${d.bigImgPath}_${d.thumbImgPath}_${d.midImgPath}_${d.origImgMD5}`,
    );

    if (findInDbArrUniq.length > 0) {
        let index = 0;

        if (findInDbArrUniq.length >= 2) {
            const haveOrigImgMD5 = findInDbArrUniq.filter(s => s.origImgMD5);
            if (haveOrigImgMD5.length == 1) {
                // 如果仅有一条标注了 OrigImgMD5 那么自动选择这一条
                index = findInDbArrUniq.findIndex(s => s.origImgMD5);
            } else {
                // 否则查看手动赋值的里面有没有
                const manualSelect = ImgInfo2SelectIndex.find(s => s.msgSvrId == msgSvrId);

                if (!manualSelect) {
                    console.group('多条记录命中，需要手动选择');
                    console.warn(
                        '数据库 ImgInfo2 中找到多条符合的记录,请在 config.ImgInfo2SelectIndex 中按如下格式补充，序号是从0开始',
                    );
                    console.warn(`{ msgSvrId:${msgSvrId}, index: $index }`);
                    console.log('数据库符合的条目', JSON.stringify(findInDbArrUniq, null, 4));
                    console.groupEnd('多条记录命中，需要手动选择');
                    throw new Error(`find multi image in db `);
                } else {
                    index = manualSelect.index;
                }
            }
        }

        const findInDbUniq = findInDbArrUniq[index];
        const md5s = [
            findInDbUniq.bigImgPath,
            findInDbUniq.origImgMD5,
            findInDbUniq.midImgPath,
            _.get(v, 'contentXml.msg.img.md5'),
            thSrcHandle(imgPath),
            thSrcHandle(findInDbUniq.thumbImgPath),
        ];
        // const mRes = await matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, null, md5s, null, false);
        // 拿到全部有关的图片
        const matchAllMd5s = md5s.map(md5 =>
            matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, null, [md5], null, false),
        );
        const mRes = await Promise.all(matchAllMd5s);
        res = _.union(mRes.filter(src => src));
    }

    // 解码 imgPath THUMBNAIL_DIRPATH 里面的东西,拿到缩略图
    const name = thSrcHandle(imgPath);
    const p1 = name.substring(0, 2);
    const p2 = name.substring(2, 4);
    const dir = path.join(ASSETS_ROOT_DIR, DIR_TYPE, p1, p2);

    // 必须有字符 这样前端 img onerror 才会触发
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter(f => f.includes(name));

        const sortFiles = _.sortBy(files, a => {
            if (a.startsWith(name)) return 1;
            else if (a.includes(`${name}hd`)) return 2;
            else return 3;
        });

        for (let i = 0; i < sortFiles.length; i++) {
            const f = sortFiles[i];
            const fName = await giveImageExt(dir, f);

            const srcF = path.join(dir, f);
            const destF = path.join(FILE_DIR, DIR_TYPE, `${name}__${fName}`);
            // 前面加上同样的前缀 这样缩略图啥的都会在一起

            fs.copySync(srcF, destF);

            const url = `${WEB_DIR}/${DIR_TYPE}/${name}__${fName}`;
            res.push(url);
        }
    }

    return res;
}
module.exports = image2;
