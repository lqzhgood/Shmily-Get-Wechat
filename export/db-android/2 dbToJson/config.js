const path = require("path");

module.exports = {
    // 对方的微信号，获取详见 readme.md
    // 因为 微信支持修改微信号，所以可能存在多个
    // 此处为精确匹配 大小写空格敏感
    FILTER_USER: ["wechat name 1", "wechat name 2"],

    DB_FILE: path.join(__dirname, "./input/decrypted_database.db"),
};
