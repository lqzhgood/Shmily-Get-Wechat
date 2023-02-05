const Promise = require('bluebird');

function app(exporter) {
    Promise.using(exporter.tablePromise('AppInfo'), json => json);
}

module.exports = app;
