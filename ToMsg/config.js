const path = require("path");

const config = {
    // Shimly 显示所用到的信息 不参与数据匹配 
    rightNum: "", // 自己的微信id
    rightName: "", // 自己的微信昵称
    leftNum: "", // 对方的微信id  
    leftName: "", // 对方的微信昵称

    Device: "Phone",

    // 此次资源的标识符 会作为以下用途
    // [数据文件].json
    // [资源文件] 夹名称   /data/${rootPath}/**.*
    // 建议按以下规则修改
    rootPath: "Wechat-wxId-20230101",

    // 是否由对方数据库导出
    // 设为 false，则是由自己数据库导出的数据
    // 如果设为 true，则由对方数据库导出的数据， 并将反转消息发送的方向
    isFromOtherAccount: false,

    ASSETS_ROOT_DIR: path.join(__dirname, "./input/assets/"), // 需处理的资源目录

    // 若消息存在多个图片资源 手动指定最高权重的图片列表
    ImgInfo2SelectIndex: [
        // { msgSvrId:${msgSvrId}, index: $index }
    ],
};

config.FILE_WEB_PUBLIC_DIR = `./data/${config.rootPath}`;
config.FILE_DIR_OUT_DIR = path.join(
    __dirname,
    "./dist/",
    config.FILE_WEB_PUBLIC_DIR
);

module.exports = config;
