const Promise = require('bluebird');

// function appattach(exporter) {
//     exporter.json('select * FROM appattach', (err, json) => {
//         if (err) console.log('err', err);
//         fs.writeFileSync('./dist/appattach.json', json);
//     });
// }
function appattach(exporter) {
    Promise.using(exporter.tablePromise('appattach'), json => json);
}

module.exports = appattach;
