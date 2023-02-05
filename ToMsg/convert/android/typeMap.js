/* cSpell:ignore appmsg recorditem */

const _ = require('lodash');
const { SOURCE_DICT_DB_ANDROID } = require('../dictMap');

const { xmlToJSON } = require('../utils');
const { TYPE_DICT } = require('../dictMap');

const source = SOURCE_DICT_DB_ANDROID;

function typeMap(v) {
    switch (v.type + '') {
        case '1':
            return {
                type: TYPE_DICT.消息,
            };
        case '3':
            v.content = xmlToJSON(source, v.content || '');
            return {
                type: TYPE_DICT.图片,
            };
        case '34':
            return {
                type: TYPE_DICT.语音,
            };
        // case "38":
        //     // 未处理  没有这类消息的样本
        //     return {
        //         type: TYPE_DICT.撤回,
        //     };
        case '42':
            v.content = xmlToJSON(source, v.content || '');
            return {
                type: TYPE_DICT.名片,
            };
        case '43':
        case '62':
            return {
                type: TYPE_DICT.视频,
            };
        case '47':
            return {
                type: TYPE_DICT._自定义表情_微信买的表情,
            };
        case '48':
            v.content = xmlToJSON(source, v.content || '');
            return {
                type: TYPE_DICT.位置,
            };
        case '49': {
            v.content = xmlToJSON(source, v.content || '');
            return linkTypeMap(v);
        }
        case '50':
            return {
                type: TYPE_DICT.视频通话,
            };
        case '10000':
            return {
                type: TYPE_DICT.系统消息,
            };

        case '419430449':
            v.content = xmlToJSON(source, v.content || '');
            return {
                type: TYPE_DICT.转账,
            };
        case '1048625':
            v.content = xmlToJSON(source, v.content || '');
            return {
                type: TYPE_DICT._自定义表情_非微信商店,
            };
        case '16777265':
            v.content = xmlToJSON(source, v.content || '');
            return {
                type: TYPE_DICT._含链接消息,
            };
        case '268435505':
            v.content = xmlToJSON(source, v.content || '');
            return {
                type: TYPE_DICT.微信运动,
            };
        case '436207665':
        case '469762097':
            v.content = xmlToJSON(source, v.content || '');
            return {
                type: TYPE_DICT.红包,
            };
        case '-1879048186':
            v.content = xmlToJSON(source, v.content || '');
            return {
                type: TYPE_DICT.位置共享,
            };

        default:
            console.warn(`unknown Type`, v.type, v);
            throw new Error(`unknown Type`);
    }
}

function linkTypeMap(v) {
    const appmsg = _.get(v, 'content.msg.appmsg', {});
    const { type: linkType } = appmsg;

    switch (linkType + '') {
        // case "1":
        //     return {
        //         type: TYPE_DICT._含链接消息,
        //     };
        // case "2":
        //     return {
        //         type: TYPE_DICT.微信运动,

        //     };
        // case "3":
        case '4':
        case '5':
            return {
                type: TYPE_DICT.分享,
            };
        case '6':
            return {
                type: TYPE_DICT.文件,
            };
        // case "8":
        //     return {
        //         type: TYPE_DICT._自定义表情_非微信商店,
        //     };
        // case "17":
        //     return {
        //         type: TYPE_DICT.位置共享,
        //     };
        case '19':
            appmsg.recorditem = xmlToJSON(source, appmsg.recorditem || '');
            return {
                type: TYPE_DICT.聊天记录,
            };
        case '7':
        case '33':
        case '36':
            return {
                type: TYPE_DICT.小程序,
            };

        // case "2000":
        //     return {
        //         type: TYPE_DICT.转账,

        //     };
        // case "2001":
        //     return {
        //         type: TYPE_DICT.红包,
        //     };
        default:
            console.warn(`unknown Type By 49`, linkType, v);
            throw new Error(`unknown Type By 49`);
    }
}

module.exports = typeMap;
