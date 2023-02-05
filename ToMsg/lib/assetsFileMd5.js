const fs = require('fs');

const { ASSETS_ROOT_DIR } = require('../config');
const { getDirMd5 } = require('../utils/index');

(async () => {
    const md5Json = await getDirMd5(ASSETS_ROOT_DIR);
    fs.writeFileSync('./dist/ASSET_FILES.json', JSON.stringify(md5Json, null, 4));
    console.log('ok', md5Json.length);
})();
