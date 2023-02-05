const path = require('path');

const config = {
    rightNum: '', // 自己的微信id
    rightName: '', // 自己的微信名字
    leftNum: '', // 对方的微信id
    leftName: '', // 对方的微信名字

    rootPath: 'wechat', // 导出资源URL前缀
    isFromOtherAccount: true, // 是否由对方账号导出的数据

    ASSETS_ROOT_DIR: path.join(__dirname, './input/assets/'), // 需处理的资源目录

    // 若消息存在多个图片资源 手动指定最高权重的图片列表
    ImgInfo2SelectIndex: [],
};

config.FILE_WEB_PUBLIC_DIR = `./data/${config.rootPath}`;
config.FILE_DIR_OUT_DIR = path.join(__dirname, './dist/', config.FILE_WEB_PUBLIC_DIR);

module.exports = config;
