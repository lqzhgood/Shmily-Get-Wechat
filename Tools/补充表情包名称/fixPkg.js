const fs = require('fs');
const path = require('path');
const { EMOJI_DIR, MSG_FILE } = require('./config.js');
const msgJSON = require(MSG_FILE);

const pkgArr = require('./wechatEmojiPackageName.json');

for (let i = 0; i < pkgArr.length; i++) {
    const { pId, pName } = pkgArr[i];

    if (fs.existsSync(path.join(EMOJI_DIR, pId))) {
        fs.renameSync(path.join(EMOJI_DIR, pId), path.join(EMOJI_DIR, pName));
    }

    const msgFind = msgJSON.filter(m => m.$Wechat?.webData?.$packName === pId);

    for (let j = 0; j < msgFind.length; j++) {
        const m = msgFind[j];
        m.$Wechat.webData.$packName = pName;
        m.$Wechat.webData.$url_emoji = m.$Wechat.webData.$url_emoji.replace(pId, pName);
        m.html = m.html.replace(pId, pName);
        m.content = m.content.replace(pId, pName);
    }
}

fs.writeFileSync(`./wechat.json`, JSON.stringify(msgJSON, null, 4));
