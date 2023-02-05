const fs = require('fs');
const { uniq } = require('lodash');
const path = require('path');

const list = [
    {
        key: ['👅', '\ud83d\udc45', '\ue409'],
        file: 'e409.png',
        alias: '吐舌头',
        type: 'emoji',
    },
    {
        key: ['😂', '\ud83d\ude02', '\ue412'],
        file: 'e412.png',
        alias: '笑哭',
        type: 'emoji',
    },
    {
        key: ['💍', '\ud83d\udc8d', '\ue034'],
        file: 'e034.png',
        alias: '戒指',
        type: 'emoji',
    },
    {
        key: ['👈', '\ud83d\udc48', '\ue230'],
        file: 'e230.png',
        alias: '左边',
        type: 'emoji',
    },
    {
        key: ['👉', '\ud83d\udc49', '\ue231'],
        file: 'e231.png',
        alias: '右边',
        type: 'emoji',
    },
    {
        key: ['🔑', '\ud83d\udd11', '\ue03f'],
        file: 'e03f.png',
        alias: '钥匙',
        type: 'emoji',
    },
    {
        key: ['🐳', '\ud83d\udc33', '\ue054'],
        file: 'e054.png',
        alias: '鲸鱼',
        type: 'emoji',
    },
    {
        key: ['😭', '\ud83d\ude2d', '\ue411'],
        file: 'e411.png',
        alias: '放声大哭',
        type: 'emoji',
    },
    {
        key: ['☺️', '\u263a\ufe0f', '\u263a', '\ue414'],
        file: 'e414.png',
        alias: '微笑',
        type: 'emoji',
    },
    {
        key: ['😚', '\ud83d\ude1a', '\ue417'],
        file: 'e417.png',
        alias: '羞涩亲亲',
        type: 'emoji',
    },
    {
        key: ['😘', '\ud83d\ude18', '\ue418'],
        file: 'e418.png',
        alias: '飞吻',
        type: 'emoji',
    },
    {
        key: ['✨', '\u2728', '\ue32e'],
        file: 'e32e.png',
        alias: '闪亮',
        type: 'emoji',
    },
    {
        key: ['🐔', '\ud83d\udc14', '\ue52e'],
        file: 'e52e.png',
        alias: '鸡',
        type: 'emoji',
    },
    {
        key: ['🐱', '\ud83d\udc31', '\ue04f'],
        file: 'e04f.png',
        alias: '猫脸',
        type: 'emoji',
    },
    {
        key: ['😷', '\ud83d\ude37', '\ue40c'],
        file: 'e40c.png',
        alias: '口罩',
        type: 'emoji',
    },
    {
        key: ['🎤', '\ud83c\udfa4', '\ue03c'],
        file: 'e03c.png',
        alias: '麦克风',
        type: 'emoji',
    },
    {
        key: ['😜', '\ud83d\ude1c', '\ue105'],
        file: 'e105.png',
        alias: '单眼吐舌',
        type: 'emoji',
    },
    {
        key: ['🎉', '\ud83c\udf89', '\ue312'],
        file: 'e312.png',
        alias: '庆祝', //'拉炮彩带'
        type: 'emoji',
    },
    {
        key: ['😊', '\ud83d\ude0a', '\ue056'],
        file: 'e056.png',
        alias: '羞涩微笑',
        type: 'emoji',
    },
    {
        key: ['😱', '\ud83d\ude31', '\ue107'],
        file: 'e107.png',
        alias: '吓死了',
        type: 'emoji',
    },
    {
        key: ['😒', '\ud83d\ude12', '\ue40e'],
        file: 'e40e.png',
        alias: '不高兴',
        type: 'emoji',
    },
    {
        // 源文件 猫脸 Unicode 是错的
        key: ['😔', '\ud83d\ude14', '\uee403'],
        file: 'e403.png',
        alias: '忧郁',
        type: 'emoji',
    },
    {
        key: ['🎂', '\ud83c\udf82', '\ue34b'],
        file: 'e34b.png',
        alias: '生日蛋糕',
        type: 'emoji',
    },
    {
        key: ['😲', '\ud83d\ude32', '\ue410'],
        file: 'e410.png',
        alias: '震惊',
        type: 'emoji',
    },
    {
        key: ['😳', '\ud83d\ude33', '\ue40d'],
        file: 'e40d.png',
        alias: '傻呆',
        type: 'emoji',
    },
    {
        key: ['🍣', '\ud83c\udf63', '\ue344'],
        file: 'e344.png',
        alias: '寿司',
        type: 'emoji',
    },
    {
        key: ['🐷', '\uD83D\uDC37', '\ue10b'],
        file: 'e10b.png',
        alias: '猪头',
        type: 'emoji',
    },
    {
        key: ['🎁', '\ud83c\udf81', '\ue112'],
        file: 'e112.png',
        alias: '礼物',
        type: 'emoji',
    },
];

// check
list.forEach(v => {
    if (v.key[0] != v.key[1]) console.log('emoji 不匹配', v);
    v.key = uniq(v.key);
});

module.exports = {
    baseDir: 'smileys',
    list,
};
