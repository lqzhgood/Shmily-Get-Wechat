const Promise = require('bluebird');

function db(exporter) {
    Promise.using(exporter.tablePromise('chatroom'), json => json);
}

module.exports = db;
