const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const { getJSON } = require('../../utils/index');

const { down } = require('./downFile.js');
const { giveExt } = require('./type.js');
const decrypt_emoji = require('../decrypt/emoji/index.js');

const DOWN_FILES = getJSON(path.join(__dirname, '../../dist/DOWN_FILES.json'), []);
const ASSETS_FILES = getJSON(path.join(__dirname, '../../dist/ASSET_FILES.json'), null);
if (!ASSETS_FILES) {
    console.error('ASSETS_FILES 长度为0，请执行 npm run md5assets');
}
const DOWN_FILES_RUN = [];
const LOCAL_FILE = [].concat(require('../../dist/LOCAL_FILES.json'));

/**
 * @name:
 * @description: 不仅被 MatchFile 调用 还可以呗直接调用
 * @param {*} _url  如果直接调用一样还要处理数组的情况
 * @param {*} webDir
 * @param {*} fileDir
 * @param {*} md5s
 * @return {*} webUrl
 */
async function downFile(_url, webDir, fileDir, md5s = []) {
    const urls = (Array.isArray(_url) ? _url : [_url]).filter(v => v).map(v => v.trim());
    if (urls.length === 0) return null;

    let downRes;
    let url;
    for (let i = 0; i < urls.length; i++) {
        url = urls[i];
        try {
            downRes = await down(url, getDistDir(fileDir));
        } catch (err) {
            if (err?.response?.status === 404) {
                // 除了 404 其他报错抛出 throw new Error 中断程序 便于排查
                // console.log('下载 404', err.response.data.responseUrl);
            } else {
                console.log('❌', 'download error', url, err.message);
                // throw new Error(err);
            }
        }
        if (downRes) break;
    }
    // 如果一个都没下载到
    if (!downRes) return null;
    const { fileName, md5: fileMd5, ext } = downRes;
    const webUrl = getWebUrl(webDir, fileName);
    // 因为下载的可能没有原图URL, 是缩略图 那么此处文件的MD5无法对应JSON中的MD5
    // 所有文件的 MD5 和 JSON 的 MD5 都需要记录 下面做匹配

    // 下载文件 和 对象的 MD5 对应上 存入文件给下一(代码运行)匹配做准备
    const d = { fileMd5, ext, webUrl, url };

    // 自动找 MD5 相关字段,  精度太差 放弃. 改为人工手动传
    // const md5KeyCountInJson = strKeyCount(JSON.stringify(v), /"md5":"(?!")/gim);
    // if (md5KeyCountInJson !== 0) {
    //     const md5InJson = getKeyValue(v, 'md5');
    //     if (md5KeyCountInJson === 1 && md5InJson) {
    //         // 如果找到且 1 1 配对 则写入
    //         d.jsonMd5 = md5InJson;
    //     } else {
    //         // 如果有JSON中有多个 MD5  需要手动判断
    //         console.warn('⚠️', 'md5KeyCountInJson', md5KeyCountInJson);
    //         console.warn('⚠️', JSON.stringify(v, null, 4));
    //         throw new Error(`has md5 in json`);
    //     }
    // }

    d.jsonMd5s = _.union(md5s.filter(v => v));
    DOWN_FILES_RUN.push(d);

    fs.writeFileSync(path.join(__dirname, '../../dist/DOWN_FILES.json'), JSON.stringify(DOWN_FILES_RUN, null, 4));

    return webUrl;
}

/**
 * @name:
 * @description: 本地资源库无法和 Object 里面 MD5 匹配上就会来到这里
 * @param {*} v
 * @param {*} webDir 路径首尾不要有 /
 * @param {*} fileDir 路径首尾不要有 /
 * @param {*} urls url Array
 * @param {*} md5s Object 中出现的所有 MD5 按顺序匹配，只返回第一个匹配到的 所以 md5s 需要按照 ‘重要’ 顺序排列
 * @return {*}  返回的 URL 没有 encodeURI
 */
async function matchFile(v, webDir, fileDir, urls, _md5s, type, isEndSolution = true) {
    const md5s = _.union(_md5s.filter(md5 => md5));

    // 先看看有没有  URl  如果 URL 有效优先下载
    let matchUrl;
    if (urls) {
        matchUrl = await downFile(urls, webDir, fileDir, md5s);
        // 如果下载成功这里直接返回
        if (matchUrl) return matchUrl;
    }

    //  URL 无法下载
    // 则拿字段中的 MD5 匹配

    // 匹配下过的
    // 匹配下过的至少要执行两次 因为第一次执行中还在下载
    // const findDown = DOWN_FILES.find(d => isMatchByMd5Array([d.fileMd5].concat(d.jsonMd5s), md5s));
    const findDown = findMd5Match(md5s, DOWN_FILES, ['fileMd5', 'jsonMd5s']);
    if (findDown) return findDown.webUrl;

    // 匹配本地的 多半是表情
    // const findLocal = LOCAL_FILE.find(l => isMatchByMd5Array([l.md5], md5s));
    const findLocal = findMd5Match(md5s, LOCAL_FILE, ['md5']);

    if (findLocal) {
        fs.copyFileSync(findLocal.p, path.join(getDistDir(fileDir), findLocal.fileName));
        return getWebUrl(webDir, findLocal.fileName);
    }
    // 用来查表情
    // console.log('⚠️', new Date(v.createTime * 1000).toLocaleString(), v.m_nsFromUsr === config.rightUser ? 'R' : 'L', md5s);

    //  匹配本地资源库  匹配文件名 或者 md5
    // const findAssets = ASSETS_FILES.find(a => isMatchByMd5Array([a.md5, a.f], md5s));
    const findAssets = findMd5Match(md5s, ASSETS_FILES, ['md5', 'f']);

    if (findAssets) {
        // if (isEndSolution) console.log('✔️', '竟然匹配到本地资源库的文件了!', v, findAssets);
        const { dir, base } = path.parse(findAssets.f_p);
        if (type === 'emoji') {
            const md5 = findAssets.f;
            const { buff, ext } = await decrypt_emoji(findAssets.f_p, md5);
            if (buff) {
                const o_fName = `${md5}_decrypt_emoji${ext}`;
                const o_file = path.join(getDistDir(fileDir), o_fName);
                fs.writeFileSync(o_file, buff);
                return getWebUrl(webDir, o_fName);
            }
            console.warn('⚠️', '找到了 emoji 本地文件,但是无法解密', v, findAssets);
        } else {
            const fileName = await giveExt(dir, base);
            fs.copyFileSync(findAssets.f_p, path.join(getDistDir(fileDir), fileName));
            return getWebUrl(webDir, fileName);
        }
    }

    //  3 图片 43 视频 太容易丢了
    if (type === 'emoji') console.warn('⚠️', v.type, _.get(v, 'content.msg.appmsg.type'), 'emoji无法匹配', v);

    return undefined;
}

function findMd5Match(md5s, arr, fields) {
    const m = md5s
        .filter(v => v)
        .reduce((pre, md5) => {
            if (pre) return pre;
            const f = arr.find(a => {
                const arr_md5s = (Array.isArray(fields) ? fields : [fields]).reduce((f_pre, f_cV) => {
                    const arr_md5 = Array.isArray(a[f_cV]) ? a[f_cV] : [a[f_cV]];
                    return f_pre.concat(arr_md5);
                }, []);
                return arr_md5s.some(s => s.includes(md5));
            });
            return f;
        }, null);
    // console.log('m', m);
    return m;
}

function isMatchByMd5Array(_iMd5s, _oMd5s) {
    const iMd5s = _iMd5s.filter(v => v).map(v => v.toLowerCase());
    const oMd5s = _oMd5s.filter(v => v).map(v => v.toLowerCase());
    return _.intersection(iMd5s, oMd5s).length > 0;
}

function getDistDir(outDir) {
    fs.mkdirpSync(outDir);
    return path.join(outDir);
}

function getWebUrl(webDir, fileName) {
    return `${webDir}/${fileName}`;
    // return `${config.FILE_WEB_PUBLIC_DIR}/type/${typeDir}/${fileName}`;
}

module.exports = {
    matchFile,
    downFile,
};
