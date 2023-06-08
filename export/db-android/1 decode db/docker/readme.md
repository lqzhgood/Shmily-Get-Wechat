### use

-   安装 docker 环境 [http://lqzhgood.github.io/Shmily/guide/setup-runtime/docker.html]
-   确认 `D:/wxDb/EnMicroMsg.db` 存在
-   执行 `docker run -e DB_KEY=${yourkey} -v D:/wxDb:/app --rm lqzhgood/decode-wechat-db`

        > ! 注意 会删除 D:/wxDb/ 中以下文件

        - decrypted_database.db
        - decrypted_database.db-journal
        - EnMicroMsg.db-shm
        - EnMicroMsg.db-wal

-   解密后的数据库在 `D:/wxDb/decrypted_database.db`

### build

```shell
docker build -t decode-wechat-db .
```
