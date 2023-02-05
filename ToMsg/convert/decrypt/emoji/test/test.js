const fs = require('fs');
const decrypt_emoji = require('../index');

const { giveExtByBuffer } = require('../../../utils/type.js');
(async () => {
    const fn = decrypt_emoji.android;
    console.dir(decrypt_emoji.fn);
    const data = await fn('./en.jpg', 'da0ac4b134bcc8dd');
    if (data.toString().startsWith('wxgf')) {
        console.warn('⚠️', 'Unsupported mysterious image format: wxgf');
    }

    const ext = await giveExtByBuffer(data, './en.jpg');
    console.log('ext', ext);
    fs.writeFileSync('./de.jpg', data);
})();
