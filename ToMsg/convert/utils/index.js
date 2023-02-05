const _ = require('lodash');
const xml2json = require('xml2json');
const fs = require('fs-extra');
const path = require('path');

const { SOURCE_DICT_WXBACKUP, SOURCE_DICT_DB_ANDROID } = require('../dictMap.js');
const { emptyObjectToString } = require('../../utils/index.js');

function xmlToJSON(source, _xml = '') {
    if (_.isPlainObject(_xml)) return _xml;
    let xml;
    if (source == SOURCE_DICT_WXBACKUP) {
        xml = _xml.replace(/[\n\t]/g, '');
        // let xml = _xml;
        if (xml.indexOf('<voipinvitemsg>') === 0) {
            xml += '</msg>';
            xml = '<msg>' + xml;
        }
    }

    if (!xml) xml = _xml;
    const json = xml2json.toJson(xml, {
        object: true,
        trim: false,
    });
    return emptyObjectToString(json);
}

function getMsgJson(type) {
    if (type === SOURCE_DICT_WXBACKUP) {
        const txt = fs.readFileSync(path.join(__dirname, '../../input/JSON/wxbackup/js/message.js'), 'utf-8');
        eval(txt); // 暴露 data 到全局变量
        // eslint-disable-next-line no-undef
        const message = data.message;
        return message;
    } else if (type === SOURCE_DICT_DB_ANDROID) {
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
