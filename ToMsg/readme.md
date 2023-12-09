# 微信导出

根据不同来源导出为 `Msg`

-   android 安卓微信数据库


## 使用

```
建议安装 NIM(Node.js 调试管理工具) 获得更好的结果显示
https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj
```

1.  `input` 目录放入相应需要文件

    -   JSON (文件夹里面按数据来源(android) 放入预处理 json)
        -   android
            -   BLOB
            -   db-android_msg_res.json
            -   ImgInfo2.json
            -   emoji_key.txt
    -   assets
        -   复制手机上 /tencent/MicroMsg/${wechatID}/ 该目录
            > 2020 年 7 月 27 日更新：新版微信（V7.0.16 及以后版本）资源文件不再保存在“tencent/MicroMsg”文件夹中，
                因些如果是新版微信，可能在 `Android/data/com.tencent.mm`
    -   copyToData (可选)
        -   该文件夹用于手动补充静态文件
        -   所有将被复制到 `config.FILE_DIR_OUT_DIR`
        -   如 avatar chat 等需要手动补充文件的目录
    -   localFiles (可选)
        -   本地静态文件,此目录的文件将计算 MD5 用于未找到文件的补全

2.  修改 `config.js`
3.  执行 2 次

    -   npm run android

    > 由于 [表情] 字段有些是加密的 URL，无法破解，所以表情会自动匹配本地目录 `.\lib\face\` 下文件 MD5 直接进行匹配。 也会匹配已下载文件的 MD5 进行匹配。 <br/>
    > 由于至少需要全部下载完一次，才能匹配 MD5。 所以程序至少需要执行两次才能尽可能的匹配更多表情

4.  dist 目录下 data 放入 web ${public} 目录下, wechat.json 放入 `src\assets\data\msg\`

### 工具

##### 语音解码

使用 `.\Tool\armToMp3\` 转换 arm-->mp3 <br/>
感谢 `https://github.com/kn007/silk-v3-decoder`
