const md5File = require('md5-file');
const fs = require('fs');
const path = require('path');
const { giveExt } = require('../convert/utils/type.js');

const BASE_DIR = path.join(__dirname, '../input/localFiles/');

const files = fs.existsSync(BASE_DIR) ? fs.readdirSync(BASE_DIR) : [];

(async () => {
    const LOCAL_FILES_JSON = [];
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const { dir, base, ext } = path.parse(f);
        if (['.json', '.js'].includes(ext.toLowerCase())) {
            return;
        }

        const fileSource = path.join(BASE_DIR, f);

        const md5 = md5File.sync(fileSource);
        const realFileName = await giveExt(BASE_DIR, f);

        const fileName = `${md5}${path.parse(realFileName).ext}`;

        const fileOut = path.join(BASE_DIR, fileName);
        fs.renameSync(fileSource, fileOut);
        LOCAL_FILES_JSON.push({ md5, ext: ext.toLowerCase(), p: fileOut, fileName });
    }
    fs.writeFileSync(path.join(__dirname, '../dist/LOCAL_FILES.json'), JSON.stringify(LOCAL_FILES_JSON, null, 4));
})();
