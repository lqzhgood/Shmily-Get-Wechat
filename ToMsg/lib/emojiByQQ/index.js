const fs = require('fs-extra');
const path = require('path');
const FACE_ARR = require('./emojiMapByQQ.json');

function findEmoji(md5s) {
    for (let m = 0; m < md5s.length; m++) {
        const md5 = md5s[m];

        for (let i = 0; i < FACE_ARR.length; i++) {
            const { type, alt, files } = FACE_ARR[i];

            for (let j = 0; j < files.length; j++) {
                const f = files[j];

                if (f.md5 === md5) {
                    return { type, alt, md5: f.md5, ext: f.ext };
                }

                if (f.alias) {
                    for (let k = 0; k < f.alias.length; k++) {
                        const alias = f.alias[k];

                        if (alias.md5 === md5) {
                            return { type, alt, md5: f.md5, ext: f.ext };
                        }
                    }
                }
            }
        }
    }
    return null;
}

module.exports = findEmoji;
