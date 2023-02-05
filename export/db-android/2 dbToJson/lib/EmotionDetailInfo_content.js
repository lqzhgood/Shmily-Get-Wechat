const { decodeByUtf8Arr } = require('../utils/index.js');
const { VALUE_title } = require('../decode/decode_EmotionDetailInfo_content');

function getEmojiProductName(buffArr) {
    const arr = VALUE_title(buffArr);
    return decodeByUtf8Arr(arr);
}

module.exports = {
    getEmojiProductName,
};
