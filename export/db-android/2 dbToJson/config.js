const path = require("path");

module.exports = {
    // 对方的微信号，获取详见 readme.md
    // 因为 微信支持修改微信号，所以可能存在多个
    // 此处为精确匹配 大小写空格敏感
    
    // 如果留空 []  则为导出所有数据库，注意内存占用。

    // 说点啥~
    // 强烈不建议全部导出, 全部导出 === 全部没导出
    // 系统消息 广告 通知 营销号 卖保险这类消息难道你需要吗?
    
    FILTER_USER: ["wechat name 1", "wechat name 2"],

    DB_FILE: path.join(__dirname, "./input/decrypted_database.db"),
};
