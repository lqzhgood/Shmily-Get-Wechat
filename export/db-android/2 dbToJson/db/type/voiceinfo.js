const Promise = require('bluebird');

function db(exporter) {
    Promise.using(exporter.tablePromise('voiceinfo'), json => json);
}

module.exports = db;
