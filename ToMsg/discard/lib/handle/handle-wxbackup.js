const _ = require('lodash');
const path = require('path');

const { SOURCE_DICT_WXBACKUP } = require('../../lib/dictMap');
const { FILE_WEB_PUBLIC_DIR, FILE_DIR_OUT_DIR } = require('../../config');

const { xmlToJSON } = require('./utils');
const HANDLE_WXBACKUP = require('./HANDLE_WXBACKUP');

const { downFile, matchFile } = require('./matchFile');

const source = SOURCE_DICT_WXBACKUP;
const FILE_DIR = path.join(FILE_DIR_OUT_DIR, source);
const WEB_DIR = `${FILE_WEB_PUBLIC_DIR}/${source}`;

const { TYPE_DICT } = require('../dictMap');
const { text } = require('./general');

async function handleType(type, v, ov) {
    const msg = _.get(v, 'content.msg', {});
    const appmsg = _.get(v, 'content.msg.appmsg', {});
    const { title, des, thumburl, md5 } = appmsg;

    switch (type) {
        case TYPE_DICT.消息:
            return {
                html: text(v.content),
            };
        case TYPE_DICT.图片:
            // 这里要做判断文件是否存在 不存在就用缩略图
            v.imgUrl = HANDLE_WXBACKUP.image2([v.content, v.m_nsThumbnail]);
            return {
                html: `[图] ${v.imgPath}`,
            };
        case TYPE_DICT.语音:
            v.mp3Info = HANDLE_WXBACKUP.voice2(v.content, v.m_uiVoiceTime);
            return {
                html: `${v.mp3Info.time}s ${v.mp3Info.mp3Url}`,
            };
        case TYPE_DICT.撤回:
            // 未处理  没有这类消息的样本
            return {
                html: '撤回',
            };
        case TYPE_DICT.名片: {
            const DIR_TYPE = 'userCard';
            const urls = [_.get(msg, 'brandIconUrl'), _.get(msg, 'bigheadimgurl'), _.get(msg, 'smallheadimgurl')];
            v.url_cover = await matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, urls, []);

            return {
                html: `<h4>${_.get(msg, 'nickname')}</h4><p>${_.get(msg, 'sign')}</p><p>${_.get(msg, 'alias')}</p>`,
            };
        }
        case TYPE_DICT.视频:
            v.mp4info = HANDLE_WXBACKUP.video(v.content);
            return {
                html: `[视频] ${v.imgPath}`,
            };
        case TYPE_DICT._自定义表情_微信买的表情:
            // 微信买的表情
            v.url_emoji = await HANDLE_WXBACKUP.emoji(v);
            return {
                type: TYPE_DICT.自定义表情,
                html: '[表情]',
            };
        case TYPE_DICT.位置:
            return {
                html: `<h4>${_.get(msg, 'location.label')}</h4>
                <p>${_.get(msg, 'location.x')} ${_.get(msg, 'location.y')}</p>`,
            };
        case TYPE_DICT.视频通话:
            v.url_voip = await HANDLE_WXBACKUP.voip(v);
            return {
                html: v.url_voip,
            };

        case TYPE_DICT.系统消息:
            return {
                html: ov.content,
            };

        //  49
        case TYPE_DICT.含链接消息:
            if (title !== des) throw new Error(`含链接消息 title des 不相同 ${title} ${des}`);
            v.content = title;
            return {
                type: TYPE_DICT.消息,
                html: v.content,
            };
        case TYPE_DICT.微信运动:
            return {
                html: `<h4>${title}</h4><p>${des}</p>`,
            };
        case TYPE_DICT.分享: {
            const DIR_TYPE = 'type49';
            if (thumburl) {
                appmsg.thumburl = await downFile(thumburl, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`);
            }

            return {
                html: `<h4>${title}</h4><p>${des}</p>`,
            };
        }
        case TYPE_DICT.文件: {
            const DIR_TYPE = 'file';
            v.url_file = await matchFile(v, `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`, [], [title, md5]);
            return {
                html: title,
            };
        }
        case TYPE_DICT._自定义表情_非微信商店: {
            const DIR_TYPE = 'emoji';
            v.url_emoji = await downFile(_.get(appmsg, 'url'), `${WEB_DIR}/${DIR_TYPE}`, `${FILE_DIR}/${DIR_TYPE}`);
            return {
                type: TYPE_DICT.自定义表情,
                html: '[表情]',
            };
        }
        case TYPE_DICT.位置共享:
            return {
                html: title,
            };
        case TYPE_DICT.聊天记录: {
            appmsg.recorditem = xmlToJSON(source, appmsg.recorditem || '');
            return {
                html: ov.content,
            };
        }
        case TYPE_DICT.小程序: {
            const DIR_TYPE = 'app';
            v.url_icon = await downFile(
                [_.get(appmsg, 'weappinfo.weappiconurl')],
                `${WEB_DIR}/${DIR_TYPE}`,
                `${FILE_DIR}/${DIR_TYPE}`,
            );
            return {
                html: `<p>${_.get(appmsg, 'sourcedisplayname')}</p><h4>${title}</h4><p>${des}</p>`,
            };
        }

        case TYPE_DICT.转账:
            return {
                html: `<h4>${title}</h4><p>${_.get(appmsg, 'wcpayinfo.feedesc')}</p>`,
            };
        case TYPE_DICT.红包:
            return {
                html: `<h4>${_.get(appmsg, 'wcpayinfo.sendertitle')}</h4>`,
            };

        default:
            throw new Error(`unknown Type ${JSON.stringify(v)}`);
    }
}

module.exports = handleType;
