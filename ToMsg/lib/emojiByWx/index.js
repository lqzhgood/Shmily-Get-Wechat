const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');

const { getJSON } = require(path.join(__dirname, '../../utils/index.js'));

// android
const EmojiGroupInfo = getJSON(path.join(__dirname, '../../input/JSON/android/EmojiGroupInfo.json'), []);
const EmotionDetailInfo = getJSON(path.join(__dirname, '../../input/JSON/android/EmotionDetailInfo.json'), []);
const EmojiInfo = getJSON(path.join(__dirname, '../../input/JSON/android/EmojiInfo.json'), []);
const EmojiInfoDesc = getJSON(path.join(__dirname, '../../input/JSON/android/EmojiInfoDesc.json'), []);

const parkGroup = []
    .concat(
        EmojiGroupInfo.map(v => _.pick(v, ['productID', 'packName'])),
        EmotionDetailInfo.map(v => _.pick(v, ['productID', 'packName']))
    )
<<<<<<< HEAD
    .filter(v => v.packName)
    .map(v => {
        v.packName = v.packName.replaceAll('\b', '').trim();
        return v;
    });
=======
    .filter((v) => v.packName);
    .map((v) => {
        v.packName = v.packName.replaceAll("\b", "").trim();
        return v;
    })
>>>>>>> 877d1fff48601ffa5b786267ee3e63c99ab18e82

const emojiParkGroup = _(parkGroup).uniqBy('productID').value();

const emojiDesWeight = ['zh_cn', 'default', 'zh_hk', 'zh_tw', 'en'];

const emojiDesGroup = EmojiInfoDesc.map(v => {
    const _v = _.pick(v, ['md5', 'groupId', 'lang', 'desc']);
    _v.desc = _v.desc.trim();
    return _v;
})
    .filter(v => v.desc)
    .reduce((pre, cV) => {
        let f = pre.find(v => v.md5 === cV.md5);

        if (!f) {
            pre.push(cV);
        } else {
            const fW = emojiDesWeight.indexOf(f.lang);
            const cW = emojiDesWeight.indexOf(cV.lang);
            if (fW === -1 || cW === -1) {
                console.log('表情描述权重未知', f.lang, cV.lang);
            } else {
                if (fW < cW) {
                    f.desc = cV.desc;
                }
            }
        }

        return pre;
    }, []);

const emojiFileGroup = EmojiInfo.map(v => _.pick(v, ['md5', 'groupId', 'cdnUrl', 'thumbUrl'])).map(v => {
    const f = emojiDesGroup.find(v2 => v2.md5 === v.md5);
    if (!f) {
        // console.log('表情描述未知', v.md5);
    } else {
        if (!v.groupId) {
            v.groupId = f.groupId;
        } else if (!f.groupId) {
            f.groupId = v.groupId;
        }

        if (v.groupId !== f.groupId) {
            console.log('表情描述 groundId 不匹配', v, f);
        } else {
            v.desc = f.desc;
            _.pull(emojiDesGroup, f);
        }
    }
    return v;
});

const emojiJson = emojiFileGroup.map(v => {
    if (!v.groupId) return v;

    const f = emojiParkGroup.find(v2 => v2.productID === v.groupId);

    if (f) {
        v.packName = f.packName;
    } else {
        if (v.groupId.startsWith('com.tencent')) {
            v.packName = v.groupId.split('.').slice(-1)[0];
        } else {
            v.packName = v.groupId;
        }
    }
    return v;
});

const repoJson = fs
    .readdirSync(path.join(__dirname, './repo/'))
    .filter(v => path.extname(v) === '.json')
    .reduce((pre, f) => [].concat(pre, fs.readJsonSync(path.join(__dirname, `./repo/${f}`))), []);

fs.writeFileSync(path.join(__dirname, '../../dist/_temp/emojiFileJson.json'), JSON.stringify([].concat(emojiJson, repoJson), null, 4));
