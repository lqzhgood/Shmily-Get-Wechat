const fs = require("fs-extra");
const path = require("path");
const _ = require("lodash");

const {
    FILE_WEB_PUBLIC_DIR,
    ASSETS_ROOT_DIR,
    FILE_DIR_OUT_DIR,
} = require("../../../config");
const { SOURCE_DICT_DB_ANDROID } = require("../../dictMap");

const { findArrInArr } = require("../../../utils/index.js");
const { xmlToJSON } = require("../../utils/index.js");
const { matchFile, downFile } = require("../../utils/matchFile.js");
const decrypt_emoji = require("../../decrypt/emoji/index.js");

const EMOJI_INFO = require("../../../dist/_temp/emojiFileJson.json");

const findEmojiByQQ = require("../../../lib/emojiByQQ/index.js");

const FILE_DIR = path.join(FILE_DIR_OUT_DIR, SOURCE_DICT_DB_ANDROID);
const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${SOURCE_DICT_DB_ANDROID}`;

const DIR_TYPE = "emoji";

async function emoji(v, merger) {
    const { imgPath } = v;

    const assets_dir = path.join(ASSETS_ROOT_DIR, DIR_TYPE);

    // 分割解析 XML
    const contentArr = v.content.split(":");
    v.contentXml = _(contentArr).drop(4).dropRight(1).value().join(":");

    if (v.contentXml) {
        contentArr[contentArr.length - 2] = "$XML$";
        v.contentXml = xmlToJSON(
            SOURCE_DICT_DB_ANDROID,
            v.contentXml.replace(/\*#\*/g, ":")
        );
    }
    v.content = contentArr.join(":");

    const msg = _.get(v, "contentXml.msg", {});
    // console.log('msg', msg);
    const {
        productid,
        cdnurl,
        thumburl,
        md5,
        externmd5,
        androidmd5,
        s60v3md5,
        s60v5md5,
    } = msg.emoji || {};

    let webUrl;
    let desc = "未知";
    let packName = "其他";

    const md5s = [md5, androidmd5, s60v3md5, s60v5md5, externmd5, imgPath];

    const f = findArrInArr(EMOJI_INFO, md5s, "md5");
    if (f) {
        merger.key.db_wx = f;

        desc = f.desc || desc;
        packName = f.packName || packName;
    }
    const wD = `${WEB_DIR}/${DIR_TYPE}/${packName}`;
    const fD = `${FILE_DIR}/${DIR_TYPE}/${packName}`;

    // 本地好多损坏的 优先从线上下载还好些
    if (productid && md5) {
        const ln_dir = path.join(assets_dir, productid);
        const in_file = path.join(ln_dir, md5);
        if (fs.existsSync(in_file)) {
            // 本地有的
            const { buff, ext } = await decrypt_emoji(in_file, md5);

            if (buff) {
                const o_fName = `${md5}_decrypt_emoji${ext}`;
                const o_file = path.join(fD, o_fName);
                fs.mkdirpSync(path.join(fD));
                fs.writeFileSync(o_file, buff);

                webUrl = `${wD}/${o_fName}`;
                return { webUrl, desc, packName };
            }
        }
    }

    const urls = [cdnurl, thumburl];
    webUrl = await matchFile(v, `${wD}`, `${fD}`, urls, md5s, "emoji");

    if (!webUrl) {
        webUrl = await downFile([f.cdnUrl, f.thumbUrl], wD, fD);
        // if (f.cdnUrl && f.thumbUrl) console.log('f', f);
    }

    if (!webUrl) {
        console.warn(
            "没有匹配到表情 请手动下载",
            new Date(v.createTime * 1).toLocaleString(),
            md5s.filter((m) => m),
            urls.filter((u) => u)
        );
    }

    const findByQQ = findEmojiByQQ(md5s);
    if (findByQQ) {
        merger.key.db_qq = f;
        console.log(
            "findByQQ 这都能匹配到!!! 赶紧去 Github 催作者补全这段代码吧",
            findByQQ
        );
    }

    return { webUrl, desc, packName };
}

module.exports = emoji;
