const _ = require('lodash');

function location(msg) {
    const label = _.get(msg, 'location.label');
    const x = _.get(msg, 'location.x');
    const y = _.get(msg, 'location.y');

    return { label, x, y };
}

module.exports = location;
