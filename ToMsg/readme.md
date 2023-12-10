# ToMsg

将不同来源数据转换为 `Shmily-Msg` 格式

-   android 安卓微信数据库


## 使用

```
建议安装 NIM(Node.js 调试管理工具) 获得更好的结果显示
https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj
https://microsoftedge.microsoft.com/addons/detail/nimnodejs-%E8%B0%83%E8%AF%95%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7/injfmegnapmoakbmnmnecjabigpdjeme
```

1.  `input` 目录放入相应需要文件

    -   JSON 
        -   android
              > 上一步在 `\export\db-android\2 dbToJson\dist` 中生成的文件
    -   asset 
          > 复制手机上 `/tencent/MicroMsg/${wechatID}/` 文件夹到此目录. [如何复制?](http://lqzhgood.github.io/Shmily/guide/setup-runtime/Android-copy.html)
          > 
          > 2020 年 7 月 27 日更新：新版微信（V7.0.16 及以后版本）资源文件不再保存在 `tencent/MicroMsg` 文件夹中，
          >
          > 因此如果上述目录不存在, 请复制 `Android/data/com.tencent.mm`文件夹
        - image2
        - emoji
        - ...
    -   [ 可选 ] copyToData 
        >   本文件夹将在完成后完整复制到 `config.FILE_DIR_OUT_DIR`
        > 
        >   所以可以用于手动补充静态文件
        > 
        >   如 avatar chat 等需要手动补充文件的目录
    -   [ 可选 ] localFiles 
        > 本地静态文件,此目录的文件将计算 MD5 用于未找到文件的补全
        >
        > 你可以把认为存在于聊天记录中, 但被丢失或删除的文件放在此目录

2.  修改 `config.js`
3.  执行 2 次 `npm run android`
   
    > 由于 [表情] 字段有些是加密的 URL，无法破解，所以表情会自动匹配本地目录 `.\lib\face\` 下文件 MD5 直接进行匹配。 也会匹配已下载文件的 MD5 进行匹配。 <br/>
    > 由于至少需要全部下载完一次，才能匹配 MD5。 所以程序至少需要执行两次才能尽可能的匹配更多表情

5. 在 `dist` 文件夹获取 `数据文件( Wechat-xxxxx-20230101.json )` 和 `资源文件( data文件夹 )`

### 工具

##### 语音解码

使用 `.\Tool\armToMp3\` 转换 arm-->mp3 <br/>
感谢 `https://github.com/kn007/silk-v3-decoder`
