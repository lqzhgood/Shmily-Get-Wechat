const _ = require('lodash');
const path = require('path');
const { FILE_WEB_PUBLIC_DIR, FILE_DIR_OUT_DIR } = require('../../../config');

const { TYPE_DICT, SOURCE_DICT_DB_ANDROID } = require('../../dictMap');
const { matchFile, downFile } = require('../../utils/matchFile.js');

const source = SOURCE_DICT_DB_ANDROID;
const FILE_DIR = path.join(FILE_DIR_OUT_DIR, source);
const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${source}`;

const APP_INFO = require('../../../dist/_temp/appInfo.json');

const TYPE_TEXT = require('./text.js');
const TYPE_FILE = require('./file.js');
const TYPE_IMAGE2 = require('./image2.js');
const TYPE_VOICE2 = require('./voice2.js');
const TYPE_VIDEO = require('./video.js');
const TYPE_VOIP = require('./voip.js');
const TYPE_EMOJI_STORE = require('./emoji_store.js');
const TYPE_EMOJI_SELF = require('./emoji._self.js');
const TYPE_APP = require('./app.js');
const TYPE_SHARE = require('./share.js');
const TYPE_SYSTEM = require('./system.js');
const TYPE_USER_CARD = require('./userCard.js');
const TYPE_LOCATION = require('./location.js');

const TYPE_GROUP_SYSTEM = require('./group/system.js');

/**
 * @name:
 * @description:
 * @param {*} type typeMap中的类型
 * @param {*} v 深拷贝的 msg, 上面修改不会影响到 msg
 * @param {*} ov 原始 msg 避免上面的对 v 进行操作后影响 用于只读
 * @param {*} merger 合并到 $Wechat 的属性
 * @return {*}
 */
async function handleType(type, v, ov, merger) {
    const msg = _.get(v, 'content.msg', {});
    const appmsg = _.get(v, 'content.msg.appmsg', {});
    const { title, des, thumburl, md5 } = appmsg;

    // 如果 appinfo 有id 则补充 icon
    const { appid } = appmsg;
    if (appid) {
        const f = APP_INFO.find(a => a.appId === appid);
        if (f) {
            if (!_.get(v, 'content.msg.appinfo.appname')) {
                _.set(v, 'content.msg.appinfo.appname', f.appName);
            }
            const icons = [f.appIconUrl, f.appWatermarkUrl];
            const appIcon = await downFile(icons, `${WEB_DIR}/app`, `${FILE_DIR}/app`);
            if (appIcon) {
                _.set(v, 'content.msg.appinfo.$appicon', appIcon);
            }
        }
    }

    switch (type) {
        case TYPE_DICT.消息:
        case TYPE_DICT._消息_群聊_发起语音通话:
            return {
                html: TYPE_TEXT(v.content),
            };
        case TYPE_DICT.图片:
            merger.data.$imgUrl = await TYPE_IMAGE2(v, merger);
            return {
                html: `[图] ${v.imgPath}`,
            };
        case TYPE_DICT.语音: {
            // {
            //     mp3Url: undefined,
            //     time: -1,
            // };
            const mp3Info = await TYPE_VOICE2(v, merger);
            merger.data.$mp3Info = mp3Info;
            return {
                html: `${mp3Info.time / 1000}s ${mp3Info.mp3Url}`,
            };
        }
        case TYPE_DICT.撤回:
            // 未处理  没有这类消息的样本
            return {
                html: '撤回',
            };
        case TYPE_DICT.名片: {
            merger.data.$url_cover = await TYPE_USER_CARD(msg, v);
            merger.data.msg = msg;
            return {
                html: `<h4>${_.get(msg, 'nickname')}</h4><p>${_.get(msg, 'sign')}</p><p>${_.get(msg, 'alias')}</p>`,
            };
        }
        case TYPE_DICT.视频: {
            // {
            //     mp4Url: undefined,
            //     thumbnail: undefined,
            //     time: -1,
            // };
            const mp4Info = await TYPE_VIDEO(v, merger);
            merger.data.$mp4info = mp4Info;
            return {
                html: `[视频] ${v.imgPath}`,
            };
        }
        case TYPE_DICT._自定义表情_微信买的表情: {
            const { webUrl, desc, packName } = await TYPE_EMOJI_STORE(v, merger);
            merger.data.$packName = packName;
            merger.data.$desc = desc;
            merger.data.$url_emoji = webUrl;
            return {
                type: TYPE_DICT.自定义表情,
                html: `[${packName}-${desc}]`,
            };
        }
        case TYPE_DICT.位置: {
            const location = TYPE_LOCATION(msg);
            const { label, x, y } = location;
            merger.data.$location = location;
            return {
                html: `<h4>${label}</h4><p>${x} ${y}</p>`,
            };
        }
        case TYPE_DICT.视频通话: {
            const { voipText, voipDes } = await TYPE_VOIP(v, merger);
            merger.data.$text_voip = voipText;
            merger.data.$des_voip = voipDes;
            return {
                html: voipText,
            };
        }
        case TYPE_DICT.系统消息: {
            merger.data.content = v.content;
            const html = await TYPE_SYSTEM(v, ov);
            return {
                html,
            };
        }
        case TYPE_DICT._系统消息_群聊_入群消息: {
            const html = TYPE_GROUP_SYSTEM(v);
            return {
                type: TYPE_DICT.系统消息,
                html,
            };
        }

        // 49

        case TYPE_DICT._含链接消息:
            if (title !== des) throw new Error(`含链接消息 title des 不相同 ${title} ${des}`);
            return {
                type: TYPE_DICT.消息,
                html: title,
            };
        case TYPE_DICT.微信运动:
            merger.data.appmsg = appmsg;
            merger.data.appinfo = v.content.msg.appinfo;
            return {
                html: `<h4>${title}</h4><p>${des}</p>`,
            };
        case TYPE_DICT.分享: {
            merger.data.appmsg = appmsg;
            merger.data.appinfo = v.content.msg.appinfo;
            merger.data.$linkIcon = await TYPE_SHARE(v);
            return {
                html: `<h4>${title}</h4><p>${des}</p>`,
            };
        }
        case TYPE_DICT.文件: {
            merger.data.appmsg = appmsg;
            merger.data.appinfo = v.content.msg.appinfo;
            merger.data.$url_file = await TYPE_FILE(v, merger);
            return {
                html: title,
            };
        }
        case TYPE_DICT._自定义表情_非微信商店: {
            const { webUrl, desc, packName } = await TYPE_EMOJI_SELF(v, merger);
            merger.data.$packName = packName;
            merger.data.$desc = desc;
            merger.data.$url_emoji = webUrl;
            return {
                type: TYPE_DICT.自定义表情,
                html: `[${packName}-${desc}]`,
            };
        }
        case TYPE_DICT.位置共享:
            merger.data.appmsg = appmsg;
            return {
                html: title,
            };
        case TYPE_DICT.聊天记录:
            merger.data.appmsg = appmsg;
            merger.data.msgId = v.msgId;
            merger.data.$url_pre = WEB_DIR;
            return {
                html: ov.content,
            };

        case TYPE_DICT.小程序:
        case TYPE_DICT._小程序_群聊: {
            const { cover, link } = await TYPE_APP(v);
            merger.data.appmsg = appmsg;
            merger.data.appinfo = v.content.msg.appinfo;
            merger.data.$url_cover = cover;
            merger.data.$url_link = link;
            return {
                type: TYPE_DICT.小程序,
                html: `<p>${_.get(appmsg, 'sourcedisplayname') || _.get(v, 'content.msg.appinfo.appname')}</p><h4>${title}</h4><p>${des}</p>`,
            };
        }
        case TYPE_DICT.转账:
            merger.data.appmsg = appmsg;
            return {
                html: `<h4>${title}</h4><p>${des}</p>`,
            };

        case TYPE_DICT.红包: {
            merger.data.appmsg = appmsg;
            const paySenderTitle = _.get(appmsg, 'wcpayinfo.sendertitle');
            return {
                html: `<h4>${paySenderTitle}</h4>`,
            };
        }
        default:
            console.error('❌', '未知类型 处理方式', v);
            // throw new Error(`unknown Type ${JSON.stringify(v)}`);
            return {
                html: JSON.stringify(v, null, 4),
            };
    }
}

module.exports = handleType;
