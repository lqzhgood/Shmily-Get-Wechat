const fs = require('fs-extra');
const path = require('path');
const axiosBase = require('axios');
const FileType = require('file-type');
const md5File = require('md5-file');

const CACHE_ARR = require('../../lib/cacheFile/cache.js');

const axios = axiosBase.create({
    headers: {
        'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/82.0.4075.0 Safari/537.36',
    },
});

const TMP_PATH = './dist/tmp';

function down(url, filepath, outName) {
    const c = CACHE_ARR.find(_c => _c.url === url);
    if (c) {
        fs.copyFileSync(path.join(__dirname, '../../lib/cacheFile/repo/', c.file), path.resolve(filepath, c.file));
        const { base, name, ext } = path.parse(c.file);
        return { fileName: base, md5: name, ext };
    }

    const _filename = outName || new URL(url).pathname.split('/').slice(-1)[0];

    fs.mkdirpSync(TMP_PATH);
    const tmpFile = path.resolve(TMP_PATH, `${Date.now()}_${Math.random().toString(36).substring(2)}`);

    const writer = fs.createWriteStream(tmpFile);
    return axios({
        url,
        method: 'GET',
        responseType: 'stream',
    })
        .then(response => {
            return new Promise((resolve, reject) => {
                response.data.pipe(writer);
                let error = null;

                writer.on('error', err => {
                    error = err;
                    writer.close();
                    reject(error);
                });
                writer.on('close', () => {
                    if (!error) {
                        resolve(true);
                    } else {
                        reject(error);
                    }
                });
            });
        })
        .then(() => {
            return !path.extname(_filename) ? getExt(tmpFile) : Promise.resolve(path.extname(_filename));
        })
        .then(ext => {
            fs.mkdirpSync(filepath);
            const md5 = md5File.sync(tmpFile);

            const fileName = `${md5}${ext}`;
            const myFile = path.resolve(filepath, fileName);
            fs.copyFileSync(tmpFile, myFile);

            return { fileName, md5, ext };
        });
}

async function getExt(p) {
    const stream = fs.createReadStream(p);
    const res = await FileType.fromStream(stream);
    if (!res.ext) throw new Error(`unknown ext ${p} `);
    return '.' + res.ext;
}

function cleanEmptyFoldersRecursively(folder) {
    if (!fs.existsSync(folder)) return;
    const isDir = fs.statSync(folder).isDirectory();
    if (!isDir) {
        return;
    }
    let files = fs.readdirSync(folder);
    if (files.length > 0) {
        files.forEach(file => {
            const fullPath = path.join(folder, file);
            cleanEmptyFoldersRecursively(fullPath);
        });
        files = fs.readdirSync(folder);
    }

    if (files.length === 0) {
        fs.rmdirSync(folder);
        return;
    }
}

function clearTmp() {
    try {
        fs.removeSync(path.join(__dirname, '../../dist/tmp'));
    } catch (error) {
        console.log('clear error', error.message);
    }
}

module.exports = {
    down,
    cleanEmptyFoldersRecursively,
    clearTmp,
};
