const _ = require('lodash');
const path = require('path');

const { FILE_WEB_PUBLIC_DIR, ASSETS_ROOT_DIR, FILE_DIR_OUT_DIR } = require('../../../config');
const { SOURCE_DICT_DB_ANDROID } = require('../../dictMap');

const { matchFile } = require('../../utils/matchFile.js');

const FILE_DIR = path.join(FILE_DIR_OUT_DIR, SOURCE_DICT_DB_ANDROID);
const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${SOURCE_DICT_DB_ANDROID}`;

const DIR_TYPE = 'userCard';

async function userCard(msg, v) {
    const urls = [_.get(msg, 'brandIconUrl'), _.get(msg, 'bigheadimgurl'), _.get(msg, 'smallheadimgurl')];
    const res = await matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, urls, []);
    return res;
}
module.exports = userCard;
