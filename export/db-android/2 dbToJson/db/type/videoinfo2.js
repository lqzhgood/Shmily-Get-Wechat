const Promise = require('bluebird');

function db(exporter) {
    Promise.using(exporter.tablePromise('videoinfo2'), json => json);
}

module.exports = db;
