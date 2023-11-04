const _ = require('lodash');
const xml2json = require('xml2json');
const fs = require('fs-extra');
const path = require('path');

const { SOURCE_DICT_DB_ANDROID } = require('../dictMap.js');
const { emptyObjectToString } = require('../../utils/index.js');

function xmlToJSON(source, _xml = '') {
    if (_.isPlainObject(_xml)) return _xml;
    let xml;

    if (!xml) xml = _xml;

    if (xml.startsWith('wxid_')) {
        // 会有  wxid_1234567890:\n<?xml version="1.0"?> 开头的情况
        xml = xml.replace(/^wxid_.+\n/, '');
    }

    const json = xml2json.toJson(xml, {
        object: true,
        trim: false,
    });
    return emptyObjectToString(json);
}

function getMsgJson(type) {
    if (type === SOURCE_DICT_DB_ANDROID) {
        const json = fs.readJsonSync(path.join(__dirname, '../../input/JSON/android/db-android_msg_res.json'));
        return json;
    } else {
        throw new Error(`error input type ${type}`);
    }
}
function getLvBuffer(id) {
    const buff = fs.readFileSync(path.join(__dirname, `../../input/JSON/android/BLOB/${id}-lvbuffer`));
    const arr = Array.from(buff);
    const fBit = arr.splice(0, 1)[0];
    const eBit = arr.splice(-1, 1)[0];
    if (fBit !== 0x7b || eBit !== 0x7d) {
        throw new Error(`not lvBuffer format ${id}`);
    }
    return arr;
}
module.exports = {
    xmlToJSON,
    getMsgJson,
    getLvBuffer,
};
