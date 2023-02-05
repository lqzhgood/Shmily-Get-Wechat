const { SOURCE_DICT_DB_ANDROID } = require('./dictMap.js');
const androidToMsg = require('./android/index.js');

const { rootPath } = require('../config.js');

async function ToMsg(type, message) {
    let res;
    switch (type) {
        case SOURCE_DICT_DB_ANDROID: {
            res = await androidToMsg(message);
            break;
        }

        default:
            console.log('type', type);
            throw new Error(`传入的类型错误或还未支持 ${type}`);
    }
    // 加上类型区分 android 和 ios
    res.forEach(v => {
        v.$Wechat.os = osType(type);
        v.$Wechat.rootPath = `${rootPath}/${type}`;
    });

    return res;
}

function osType(type) {
    switch (type) {
        case 'android':
            return 'Android';
        case 'ios':
            return 'iOS';
        default:
            throw new Error('unknown os type', type);
    }
}

module.exports = ToMsg;
