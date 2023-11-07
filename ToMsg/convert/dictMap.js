/* eslint-disable */
module.exports = {
    SOURCE_DICT_DB_ANDROID: 'android',
    EXT_IMAGE: ['.jpg', '.jpeg', '.gif', '.png', '.webp'],
    // _开头是需要处理合并为上面类型的
    TYPE_DICT: [
        '消息',
        '_含链接消息',
        '_消息_群聊_发起语音通话',

        '图片',
        '语音',
        '撤回',
        '名片',
        '视频',
        '位置',
        '视频通话',
        '系统消息',
        '_系统消息_群聊_入群消息',
        '微信运动',
        '分享',
        '_分享_视频',
        '视频号',
        '_视频号_群聊',
        '文件',
        '位置共享',
        '聊天记录',
        '小程序',
        '_小程序_群聊',
        '转账',
        '红包',
        '收藏',

        '自定义表情',
        '_自定义表情_微信买的表情',
        '_自定义表情_非微信商店',

        '未知类型',
    ].reduce((pre, cV) => {
        pre[cV] = cV;
        return pre;
    }, {}),
};
