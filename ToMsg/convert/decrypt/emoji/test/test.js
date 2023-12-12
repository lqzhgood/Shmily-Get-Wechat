const fs = require('fs');
const path = require('path');
const decrypt_emoji = require('../index');

const { giveExtByBuffer } = require('../../../utils/type.js');
(async () => {
    await decode('./1k', 'ae95877a41dc1b0b');
    await decode('./can_decode', 'da0ac4b134bcc8dd');
    await decode('./en.jpg', 'da0ac4b134bcc8dd');
})();

async function decode(f, key) {
    console.log('file', f);
    const fn = decrypt_emoji.android;
    const data = fn(fs.readFileSync(f), key);
    if (data.toString().startsWith('wxgf')) {
        console.warn('⚠️', 'Unsupported mysterious image format: wxgf');
    }

    const ext = await giveExtByBuffer(data, f);
    console.log('ext', ext);

    const { name } = path.parse(f);

    fs.writeFileSync(`${name}_de.${ext || 'jpg'}`, data);
    console.log('');
}
