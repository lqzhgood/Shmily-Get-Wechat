const _ = require('lodash');
const path = require('path');

const { downFile, matchFile } = require('../../utils/matchFile.js');
const { FILE_WEB_PUBLIC_DIR, FILE_DIR_OUT_DIR } = require('../../../config.js');
const { SOURCE_DICT_DB_ANDROID } = require('../../dictMap.js');
const { thSrcHandle } = require('../../utils/type.js');

const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${SOURCE_DICT_DB_ANDROID}`;
const FILE_DIR = path.join(FILE_DIR_OUT_DIR, SOURCE_DICT_DB_ANDROID);

const DIR_TYPE = 'app';

async function app(v) {
    const appmsg = _.get(v, 'content.msg.appmsg', {});

    const cover = await matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, null, [
        thSrcHandle(_.get(v, 'imgPath')),
    ]);

    const appIcon = [_.get(appmsg, 'weappinfo.weappiconurl')];
    const appIconUrl = await downFile(appIcon, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`);
    if (appIconUrl) {
        _.set(v, 'content.msg.appinfo.$appicon', appIconUrl);
    }

    let link = _.get(v, 'content.msg.appmsg.url') || _.get(v, 'content.msg.appmsg.extinfo');

    link = appSchemaToWebUrl(link);

    return { cover, link };
}

function appSchemaToWebUrl(link) {
    // url -> dianping://shopinfo?shopid=10347348&utm=wechatraise
    if (link.startsWith('dianping://')) {
        const id = new URL(link).searchParams.get('shopid');
        if (id) link = `https://www.dianping.com/shop/${id}`;
    }

    // extinfo -> sinaweibo://detail?mblogid=3940954983933277&luicode=10000359
    if (link.startsWith('sinaweibo://')) {
        const mblogid = new URL(link).searchParams.get('mblogid');
        if (mblogid) link = `https://weibo.com/0/${mblogid}`;
    }
    return link;
}

module.exports = app;
