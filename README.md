# 说明

请先阅读 https://github.com/lqzhgood/Shmily

此工具是将 Wechat 导出的通讯录转换为 `Shmily-Msg` 格式的工具

## 使用

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

0. 安装 node 环境 [http://lqzhgood.github.io/Shmily/guide/setup-runtime/nodejs.html]
1. decode db 解密数据库
2. dbToJson 导出数据库为 json
3. ToMsg 转换为 `Shmily-Msg` 格式
4. Tools
    - 补充表情包名称

## 其他

由于迭代了很多次, 代码很乱.
特别是 `ToMsg` 里, 还想大家一起贡献 Emoji , 这样就可以补全腾讯不给下载的表情. 但是没做好

## 感谢

http://lqzhgood.github.io/Shmily/guide/other/thanks.html

## 捐赠

点击链接 http://lqzhgood.github.io/Shmily/guide/other/donation.html 看世界上最可爱的动物
