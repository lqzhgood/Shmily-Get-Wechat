# 说明

请先阅读 https://github.com/lqzhgood/Shmily

此工具是将 Wechat 导出的聊天记录转换为 `Shmily-Msg` 格式的工具

> 开发使用的版本 Android/8.0.2 iOS/8.0.29

 
## 使用

```
🎞️ 视频集打包
https://space.bilibili.com/3493106888476968/channel/seriesdetail?sid=3820186
```



0. 🎞️ 安装 node 环境 [http://lqzhgood.github.io/Shmily/guide/setup-runtime/nodejs.html]
1. 🏞️ 下载本项目并解压 [http://lqzhgood.github.io/Shmily/guide/setup-runtime/github-down-repo.html]
2. 🎞️ 安装依赖 [http://lqzhgood.github.io/Shmily/guide/setup-runtime/nodejs-dependencies.html]
3. 🎞️ [decode db 解密数据库](https://github.com/lqzhgood/Shmily-Get-Wechat/tree/main/export/db-android/1%20decode%20db)
4. 🎞️ [dbToJson 从数据库导出数据](https://github.com/lqzhgood/Shmily-Get-Wechat/tree/main/export/db-android/2%20dbToJson)
5. 🎞️ [ToMsg 将数据转换为 `Shmily-Msg` 格式](https://github.com/lqzhgood/Shmily-Get-Wechat/tree/main/ToMsg)
6. [ 可选 ] Tools
    - 补充表情包名称
7. 结束
```
                           是  ---> Get   http://lqzhgood.github.io/Shmily/guide/use/get.html
                          /  
还需要导出其他类型的数据吗 ? 
                          \  
                           否  ---> Show  http://lqzhgood.github.io/Shmily/guide/use/show.html
```


## 目录结构

```
- Wechat
    - export
        -   db-android
            -   1 decode db
                解密数据库为可读的数据库, 参考 `./readme.md`
            -   2 dbToJson
                将解密的数据库导出为 json 数据 参考 `./readme.md`
        -   db-iOS 待补充
    - ToMsg 转换为 `Shmily-Msg` 格式
    - Tools
        一些工具
```

## 其他

由于迭代了很多次, 代码很乱.
特别是 `ToMsg` 里, 还想大家一起贡献 Emoji , 这样就可以补全腾讯不给下载的表情. 但是没做好

## 感谢

http://lqzhgood.github.io/Shmily/guide/other/thanks.html

## 捐赠

点击链接 http://lqzhgood.github.io/Shmily/guide/other/donation.html 看世界上最可爱的动物
