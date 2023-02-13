module.exports = {
    SOURCE_DICT_DB_ANDROID: 'android',
    EXT_IMAGE: ['.jpg', '.jpeg', '.gif', '.png', '.webp'],
    // _开头是需要处理合并为上面类型的
    TYPE_DICT: [
        '消息',
        '_含链接消息',

        '图片',
        '语音',
        '撤回',
        '名片',
        '视频',
        '位置',
        '视频通话',
        '系统消息',
        '微信运动',
        '分享',
        '文件',
        '位置共享',
        '聊天记录',
        '小程序',
        '转账',
        '红包',

        '自定义表情',
        '_自定义表情_微信买的表情',
        '_自定义表情_非微信商店',
    ].reduce((pre, cV) => {
        pre[cV] = cV;
        return pre;
    }, {}),
};
