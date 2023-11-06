const Promise = require('bluebird');

function db(exporter) {
    Promise.using(exporter.tablePromise('rcontact'), json => json);
}

module.exports = db;
