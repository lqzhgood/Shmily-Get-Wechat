const fs = require('fs-extra');
const path = require('path');
const Promise = require('bluebird');

const { getEmojiProductName } = require('../../lib/EmotionDetailInfo_content.js');

function emoji(exporter) {
    //  emoji key
    // 大概率等于  md5(imei)

    try {
        const emojiKeyArr = exporter.prepare('SELECT md5 FROM EmojiInfo where catalog == 153').all();
        const key = emojiKeyArr[0].md5.slice(0, 16);
        fs.writeFileSync('./dist/emoji_key.txt', key);
    } catch (error) {
        console.warn('无法找到 Emoji key 可以尝试手动计算 md5Hex(IMEI).slice(0, 16) 写入 ./dist/emoji_key.txt 文件');
    }

    Promise.using(exporter.tablePromise('EmojiInfoDesc'), json => json);
    Promise.using(exporter.tablePromise('EmojiGroupInfo'), json => json);
    Promise.using(exporter.tablePromise('EmojiInfo'), json => json);

    Promise.using(exporter.tablePromise('EmotionDetailInfo'), json => {
        const dir = './dist/EmotionDetailInfo/';
        fs.mkdirpSync(dir);
        for (let i = 0; i < json.length; i++) {
            const j = json[i];
            j.packName = getEmojiProductName(j.content.data);
            fs.writeFileSync(path.join(dir, `${j.productID}`), Buffer.from(j.content.data));
            j.content.data = '';
        }
        return json;
    });

    // exporter.json('select * FROM EmotionDetailInfo', (err, _json) => {
    //     if (err) console.log('err', err);

    //     const json = JSON.parse(_json);

    //     fs.writeFileSync('./dist/EmotionDetailInfo.json', JSON.stringify(json, null, 4));
    // });
}

module.exports = emoji;
