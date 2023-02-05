const Promise = require('bluebird');

function image2(exporter) {
    Promise.using(exporter.tablePromise('ImgInfo2'), json => json);
}

module.exports = image2;
