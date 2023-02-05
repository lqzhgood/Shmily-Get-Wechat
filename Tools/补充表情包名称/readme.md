### 说明

这里是用来补充表情包名称的 <br/>
微信数据库可能表情包名称不全，那么会以 `stiker_` 的表情包 ID 作为表情包名称 <br/>
可以手动去微信中查询补全，表情包 ID 与 表情包名称的对应关系后，补全 msg.json 中的 表情包名称。

##### 使用

-   填写 config 中的相应字段
-   执行 `node getStikerDirList.js` 会生成 `_wechatEmojiPackageName.json`
-   修改 `_wechatEmojiPackageName.json` 为 `wechatEmojiPackageName.json` 并补全
-   执行 `node fixPkg.js`
    -   会修改 `config.EMOJI_DIR` 目录名称为 表情包名称
    -   会修改 `config.MSG_FILE` 中表情包 `$Wechat.webData.$packName` 及 html content 为表 s 情包名称
