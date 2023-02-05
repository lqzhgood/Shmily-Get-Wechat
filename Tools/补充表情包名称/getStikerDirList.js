const fs = require('fs');
const { EMOJI_DIR } = require('./config');

const dir = fs
    .readdirSync(EMOJI_DIR)
    .filter(v => v.startsWith('stiker_'))
    .map(d => ({ pId: d, pName: '' }));

fs.writeFileSync('./_wechatEmojiPackageName.json', JSON.stringify(dir, null, 4));
