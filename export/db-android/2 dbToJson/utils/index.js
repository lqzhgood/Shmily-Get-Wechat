const _7z = require("7zip-min");

function decodeByUtf8Arr(arr) {
    return new TextDecoder().decode(new Uint8Array(arr));
}

function un7z(path, path_bz2) {
    return new Promise((res, rej) => {
        _7z.unpack(path, path_bz2, (err) => {
            if (err) {
                rej(err);
            } else {
                res(1);
            }
        });
    });
}

module.exports = {
    decodeByUtf8Arr,
    un7z,
};
