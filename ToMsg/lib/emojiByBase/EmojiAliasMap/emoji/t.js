const fs = require('fs');

const list = require('./_list.js').list;

list.forEach(v => {
    fs.renameSync(`${v.alias}.png`, v.file);
});
