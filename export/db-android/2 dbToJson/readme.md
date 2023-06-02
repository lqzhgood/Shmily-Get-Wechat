## 说明

此目录是从数据库导出并解密下一步需要的 JSON 。 <br />
除若干字段使用 wechat 源码里面的方法解码外基本无处理 <br />

### 使用

-   从 `1 decode db` 导出 `decrypted_database.db` 复制到 `input` 下
-   修改 `config.js` 并填入需要导出的对方 `微信id`
-   执行 `node run build`
-   剪切生成的 `db-android_msg_res.json` `BLOB(原input目录)` `ImgInfo2.json` `emoji_key.txt` 复制到 `Wechat/${ToMsg}/input/JSON/db-android`

### 解密

#### Message

`.\lib\decodeMessageTable` <br/>
由于本人不懂 `java` ，所以是让别人写的 @tzh，需求也没提太多，就是导出 `message` 整表并解密某些字段 <br/>
会输出 `message.json`, BLOB 文件夹里面是不知道如何解析的文件,通过 Utf-8 编码写入文本. 应该需要从 buffer 16 进制去分析解码 <br/>

-   `lvbuff` 字段不知道怎么解码,仅已知下列情况可用
    -   语音通话, utf-8 解码出描述文字(通话 xx 秒)
