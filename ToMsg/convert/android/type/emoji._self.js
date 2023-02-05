const _ = require('lodash');
const path = require('path');

const { downFile, matchFile } = require('../../utils/matchFile.js');
const { FILE_WEB_PUBLIC_DIR, FILE_DIR_OUT_DIR } = require('../../../config.js');
const { findArrInArr } = require('../../../utils/index.js');
const { SOURCE_DICT_DB_ANDROID } = require('../../dictMap.js');

const EMOJI_INFO = require('../../../dist/emojiFileJson.json');
const findEmojiByQQ = require('../../../lib/emojiByQQ/index.js');

const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${SOURCE_DICT_DB_ANDROID}`;
const FILE_DIR = path.join(FILE_DIR_OUT_DIR, SOURCE_DICT_DB_ANDROID);

const DIR_TYPE = 'emoji';

const { thSrcHandle } = require('../../utils/type.js');

async function emoji_self(v) {
    let webUrl;
    let desc = '未知';
    let packName = '其他';

    const appmsg = _.get(v, 'content.msg.appmsg', {});

    const urls = [_.get(appmsg, 'url')];
    const md5s = [
        _.get(appmsg, 'appattach.emoticonmd5'),
        _.get(appmsg, 'appattach.cdnthumbmd5'),
        thSrcHandle(_.get(v, 'imgPath')),
    ];

    // imgPath: 'THUMBNAIL_DIRPATH://th_8c63c984d52d5f08e77e0ff6f1fd4911',

    const f = findArrInArr(EMOJI_INFO, md5s, 'md5');

    if (f) {
        desc = f.desc || desc;
        packName = f.packName || packName;
    }
    const wD = `${WEB_DIR}/${DIR_TYPE}/${packName}`;
    const fD = `${FILE_DIR}/${DIR_TYPE}/${packName}`;

    webUrl = await matchFile(v, wD, fD, urls, md5s);

    if (!webUrl && f) {
        webUrl = await downFile([f.cdnUrl, f.thumbUrl], wD, fD);
    }

    const findByQQ = findEmojiByQQ(md5s);
    if (findByQQ) console.log('findByQQ 这都能匹配到!!! 赶紧去 Github 催作者补全这段代码吧', findByQQ);

    return { webUrl, desc, packName };
}

module.exports = emoji_self;
