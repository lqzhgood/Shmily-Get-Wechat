const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const crypto = require('crypto');

function emptyObjectToString(obj) {
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const item = obj[key];

            if (isObj(item)) {
                if (_.isEqual(item, {})) {
                    obj[key] = '';
                } else {
                    emptyObjectToString(item);
                }
            } else if (Array.isArray(item)) {
                // 数组的嵌套数组处理是有bug的  这里没遇到 所以不处理了
                item.forEach(v => {
                    emptyObjectToString(v);
                });
                // throw new Error('Array bug');
            } else {
                continue;
            }
        }
    }
    return obj;
}

function isObj(arg) {
    return arg && typeof arg === 'object' && !Array.isArray(arg);
}

function sleep(t = 1000) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, t);
    });
}

function getKeyValue(obj, key) {
    for (const k in obj) {
        if (Object.hasOwnProperty.call(obj, k)) {
            const v = obj[k];
            if (_.isPlainObject(v)) {
                const vv = getKeyValue(v, key);
                if (vv) return vv;
            } else if (k === key) {
                if (_.isString(v)) {
                    return v;
                }
            }
        }
    }
    return undefined;
}

function strKeyCount(s, key) {
    let re = _.isRegExp(key) ? key : new RegExp(key, 'gi');
    let arr = s.match(re);
    return arr ? arr.length : 0;
}

function getJSON(p, defaultValue = []) {
    if (fs.existsSync(p)) {
        const t = fs.readFileSync(p, 'utf-8');
        return JSON.parse(t);
    } else {
        return defaultValue;
    }
}

function arrHaveValue(arr) {
    return arr.filter(v => v);
}

function replaceField(v, ak, dk) {
    v[ak] = v[dk];
    delete v[dk];
}

function showAllField(arr = []) {
    return arr.length == 0
        ? []
        : arr.reduce((pre, cV) => {
              if (!cV) return pre;
              for (const k in cV) {
                  if (Object.hasOwnProperty.call(cV, k)) {
                      const v = cV[k];
                      if (v && v > pre[k]) pre[k] = v;
                  }
              }
              return pre;
          });
}

function getMD5(filePath) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath);
        const fsHash = crypto.createHash('md5');

        stream.on('data', d => {
            fsHash.update(d);
        });
        stream.on('error', err => {
            reject(err);
        });
        stream.on('end', () => {
            const md5 = fsHash.digest('hex');
            resolve(md5);
        });
    });
}

async function getDirMd5(p) {
    let arr = [];
    const files = fs.readdirSync(p);
    for (let i = 0; i < files.length; i++) {
        const f = files[i];

        if (f === '.nomedia') continue;
        const f_p = path.join(p, f);
        if (fs.statSync(f_p).isDirectory()) {
            const arr_c = await getDirMd5(f_p);
            arr = arr.concat(arr_c);
        } else {
            const md5 = await getMD5(f_p);
            const obj = {
                f,
                f_p,
                md5,
            };
            arr.push(obj);
        }
    }
    return arr;
}

// 转为unicode 编码
function encodeUnicode(str) {
    const res = [];
    for (let i = 0; i < str.length; i++) {
        res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return '\\u' + res.join('\\u');
}

// 解码
// !! unescape 已弃用
function decodeUnicode(str) {
    str = str.replace(/\\/g, '%');
    return unescape(str);
}

function md5Hex(data) {
    const hash = crypto.createHash('md5');

    const update = buffer => {
        const inputEncoding = typeof buffer === 'string' ? 'utf8' : undefined;
        hash.update(buffer, inputEncoding);
    };

    if (Array.isArray(data)) {
        for (const element of data) {
            update(element);
        }
    } else {
        update(data);
    }

    return hash.digest('hex');
}

function findArrInArr(_target, _md5s, filed) {
    const target = _target.filter(v => v);
    const md5s = _md5s.filter(v => v);
    return target.find(v => md5s.includes(v[filed]));
}

/**
 * Deep diff between two object-likes
 * @param  {Object} fromObject the original object
 * @param  {Object} toObject   the updated object
 * @return {Object}            a new object which represents the diff
 */
function deepDiff(fromObject, toObject) {
    const changes = {};

    function buildPath(p, obj, key) {
        return _.isUndefined(p) ? key : `${p}.${key}`;
    }

    function walk(f, t, p) {
        for (const key of _.keys(f)) {
            const currentPath = buildPath(p, f, key);
            if (!_.has(t, key)) {
                changes[currentPath] = { from: _.get(f, key) };
            }
        }

        for (const [key, to] of _.entries(t)) {
            const currentPath = buildPath(p, t, key);
            if (!_.has(f, key)) {
                changes[currentPath] = { to };
            } else {
                const from = _.get(f, key);
                if (!_.isEqual(from, to)) {
                    if (_.isObjectLike(to) && _.isObjectLike(from)) {
                        walk(from, to, currentPath);
                    } else {
                        changes[currentPath] = { from, to };
                    }
                }
            }
        }
    }

    walk(fromObject, toObject);

    return changes;
}

module.exports = {
    emptyObjectToString,
    sleep,
    getKeyValue,
    strKeyCount,
    getJSON,
    arrHaveValue,
    replaceField,
    showAllField,
    getDirMd5,
    encodeUnicode,
    decodeUnicode,
    md5Hex,
    findArrInArr,
    deepDiff,
};
