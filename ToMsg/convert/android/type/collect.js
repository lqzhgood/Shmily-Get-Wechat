const _ = require('lodash');
const path = require('path');
const { TYPE_DICT, SOURCE_DICT_DB_ANDROID } = require('../../dictMap.js');
const { matchFile } = require('../../utils/matchFile.js');
const { FILE_WEB_PUBLIC_DIR, FILE_DIR_OUT_DIR } = require('../../../config.js');

const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${SOURCE_DICT_DB_ANDROID}`;
const FILE_DIR = path.join(FILE_DIR_OUT_DIR, SOURCE_DICT_DB_ANDROID);

const DIR_TYPE = 'collect';

async function collect(v) {
    const appmsg = _.get(v, 'content.msg.appmsg', {});

    const record = appmsg.recorditem.recordinfo;
    const info = record.info;
    const desc = record.desc;

    const items = record.datalist.dataitem;
    const list = [];

    for (let i = 0; i < items.length; i++) {
        const d = items[i];

        switch (d.datatype) {
            case '1':
                list.push({
                    type: 'html',
                    value: d.datadesc,
                });
                break;
            case '2':
            case '4':
            case '8': {
                const { datafmt, fullmd5, head256md5, thumbfullmd5, thumbhead256md5 } = d;

                const file = await matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, [], [fullmd5, head256md5, thumbfullmd5, thumbhead256md5], TYPE_DICT.收藏, false);

                list.push({
                    type: 'file',
                    value: file,
                    fileParse: file ? path.parse(file) : undefined,
                });
                break;
            }

            default:
                console.error('❌', '收藏 未知的类型', d);
                break;
        }
    }

    const o = {
        info,
        desc,
        list,
    };
    return o;
}

module.exports = collect;
