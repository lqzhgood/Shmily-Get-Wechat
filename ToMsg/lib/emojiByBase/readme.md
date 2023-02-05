## 本文件夹主要处理微信聊天中的 基础表情 及 emoji 的显示图片

主要为 基础表情 图片 提供 Alt, 当然不做也没关系, 只是会报警以及统计时无法计算表情出现次数

#### EmojiPathMap

文件夹为微信 Apk 中导出的表情关键词 `key` 和 图片文件 `path` 的 Map 表<br>
`key` 为魔法字符串 `path` 为对应图片文件路径。消息中如果包含 `key` 将被替换路径为 `path` 的图片，反之存储时将会把图片转为 `key` 后消息存储于

#### EmojiAliasMap

人工归档的表情描述 Map 表,主要是为 `key` 添加 `alias(Alt)` 描述<br/>
结合上面 `exportByApk` `key` 和 `path` 的 Map，最终生成 `key` `path` `alias（Alt）` 的关联 JSON <br/>
最终该目录会被复制到 ` /data/wechat/baseEmoji/`

##### dist

上述两者结合生成的产物

-   hasAltBaseEmojiMap.json
-   unAltBaseEmojiMap.json
