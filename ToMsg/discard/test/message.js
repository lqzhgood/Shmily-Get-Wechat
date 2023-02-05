const { getMessage } = require('../utils/index');

// m_nsContent: "187188"   内容
// m_nsFromUsr: "q*****"  人
// m_nsToUsr: ""
// m_nsRealChatUsr: ""  // 空
// m_uiCreateTime: 1507183969 时间
// m_uiMesLocalID: 1           本地ID
// m_uiMesSvrID: 6426323460797677000
// m_uiMessageType: 1          类型

const message = getMessage();

const Fuser = checkFromUsr(message);
console.log('Fuser', Fuser);

const Tuser = checkToUsr(message);
console.log('Tuser', Tuser);

const RealChatUsr = checkRealChatUsr(message);
console.log('RealChatUsr', RealChatUsr);

checkCreateTime(message);
checkMesLocalID(message);
checkMesSvrID(message);

const MessageType = checkMessageType(message);
console.log('MessageType', MessageType);

const type = getMessageTypeTpl(message);
console.log('type', type);

// 获取所有用户
function checkFromUsr(arr) {
    return Array.from(
        new Set(
            arr.map(v => {
                return v.m_nsFromUsr;
            }),
        ),
    );
}

// 获取所有用户
function checkToUsr(arr) {
    return Array.from(
        new Set(
            arr.map(v => {
                return v.m_nsToUsr;
            }),
        ),
    );
}

// 获取所有用户
function checkRealChatUsr(arr) {
    return Array.from(
        new Set(
            arr.map(v => {
                return v.m_nsRealChatUsr;
            }),
        ),
    );
}

// 测试时间后面的是否比前面的大
function checkCreateTime(arr) {
    for (let i = 1; i < arr.length; i++) {
        const lmsg = arr[i - 1];
        const cmsg = arr[i];
        if (cmsg.m_uiCreateTime < lmsg.m_uiCreateTime) console.log('后面时间比前面小', lmsg, cmsg);
    }
}

// 测试是否是递增
function checkMesLocalID(arr) {
    for (let i = 1; i < arr.length; i++) {
        const lmsg = arr[i - 1];
        const cmsg = arr[i];
        if (lmsg.m_uiMesLocalID + 1 != cmsg.m_uiMesLocalID) console.log('非递增');
    }
}

// 测试是否有重复
function checkMesSvrID(arr) {
    const ids = Array.from(new Set(arr.map(v => v.m_uiMesSvrID)));
    if (ids.length !== arr.length) throw new Error('m_uiMesSvrID 有重复');
}

// 获取所有 MessageType
function checkMessageType(arr) {
    return Array.from(new Set(arr.map(v => v.m_uiMessageType)));
}

// 按类型分类
function getMessageTypeTpl(arr) {
    return arr.reduce((pre, cV) => {
        if (!pre[cV.m_uiMessageType]) pre[cV.m_uiMessageType] = [];
        pre[cV.m_uiMessageType].push(cV);
        return pre;
    }, {});
}

setTimeout(() => {}, 1000000);
