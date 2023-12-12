const fs = require('fs-extra');
const path = require('path');
const { md5Hex } = require('../../../utils/index.js');
const aesjs = require('aes-js');
const { giveExtByBuffer } = require('../../utils/type');

const EMOJI_ENCRYPTION_KEY = fs.readFileSync(
    path.join(__dirname, '../../../input/JSON/android/emoji_key.txt'),
    'utf-8',
);

const { SOURCE_DICT_DB_ANDROID } = require('../../dictMap.js');
const globalVar = require('../../../utils/globalVar');

function android(buff, _key) {
    // execute("SELECT md5 FROM EmojiInfo where catalog == 153")
    // this also equals to md5(imei)[:16]

    const buffArr = Array.from(buff);
    if (buffArr.length < 1024) {
        if (!buff.toString().startsWith('wxgf')) {
            const f = `./emoji_special_${Date.now()}`;
            console.log('❌', `能提交这个特例 ${f} 给我吗? 找了很久了~ 你就是那个天选之人`);
            fs.writeFileSync(f, buff);
        }

        return buff;
    }
    const header = Buffer.from(buffArr.splice(0, 1024));
    const body = Buffer.from(buffArr);

    const key = _key || EMOJI_ENCRYPTION_KEY;
    // const key = md5Hex(IMEI).slice(0, 16);
    const keyBytes = aesjs.utils.utf8.toBytes(key);

    const aesEcb = new aesjs.ModeOfOperation.ecb(keyBytes);
    const decryptedBytes = aesEcb.decrypt(header);
    const data = Buffer.concat([decryptedBytes, body]);
    return data;
}

async function decrypt_emoji(f, md5) {
    const buff = fs.readFileSync(f);

    // 看看文件是否没加密，没加密直接返回
    let o_ext = await giveExtByBuffer(buff, f, false);
    if (o_ext && o_ext.toLowerCase() === '.gif') {
        return { buff, ext: o_ext };
    }

    let data = '';
    switch (globalVar.currSource) {
        case SOURCE_DICT_DB_ANDROID:
            data = android(buff);
            break;
        default:
            throw new Error('unknown type');
    }

    // 校验
    const data_md5 = md5Hex(data);

    if (data_md5 !== md5) {
        if (data.toString().startsWith('wxgf')) {
            //  console.warn('⚠️', 'Unsupported mysterious image format: wxgf', f);
            //  其实可以先复制一份到输出目录存档,万一以后解密了呢
        }
        // console.warn('⚠️', 'Decrypted data mismatch md5!');
    }
    const ext = await giveExtByBuffer(data, f);

    if (!ext) {
        return { buff: '', ext: '' };
    }

    return { buff: data, ext };
}

// only use test
decrypt_emoji.android = android;

module.exports = decrypt_emoji;
