function system(v, ov) {
    //匹配第一个汉字是不是 '你' 此处使用 == 隐式转换
    // eslint-disable-next-line no-control-regex
    if (v.content.match(/[^\x00-\xff]/) == '你') {
        // 如果是你开头 代表自己发的 为 go 在右边
        v.isSend = 1;
    }
    return ov.content;
}

module.exports = system;
