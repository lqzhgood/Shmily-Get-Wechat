// eslint-disable-next-line no-undef
BigInt.prototype.toJSON = function () {
    return this > Number.MIN_SAFE_INTEGER && this < Number.MAX_SAFE_INTEGER ? Number(this) : this.toString();
};

const Promise = require('bluebird');
const Database = require('better-sqlite3');
const fs = require('fs-extra');

const { DB_FILE } = require('../config');
const db = new Database(DB_FILE, { readonly: true });
db.defaultSafeIntegers(true);

db.jsonPromise = function (table) {
    return new Promise((resolve, reject) => {
        const res = db.prepare(`SELECT * FROM ${table}`).all();
        // cover BigInt in /index.js  slow is ok
        resolve(JSON.parse(JSON.stringify(res)));
    });
};

db.tablePromise = function (table) {
    return db.jsonPromise(table).disposer(json => {
        fs.writeFileSync(`./dist/${table}.json`, JSON.stringify(json, null, 4));
    });
};

// ###############################################
// 导出一些用到的表

require('./type/appattach')(db);
require('./type/emoji')(db);
require('./type/image2')(db);
require('./type/app')(db);
require('./type/videoinfo2')(db);
require('./type/voiceinfo')(db);
require('./type/rcontact')(db);
require('./type/chatroom')(db);
