# 导出数据库

```
MIUI 可以看这个帖子 https://github.com/Heyxk/notes/issues/1
```

```
/data/data/com.tencent.mm/MicroMsg/[weixin_name]/EnMicroMsg.db
```

## 找到 key

根据前人的分析，微信数据库 EnMicroMsg.db 的密码是由 MD5(IMEI + uin).substring(0, 7).toLowerCase() 生成的。因此，我们需要找到 IMEI 和 uin 值

    >  MD5 中的字母必须为小写

### 自动解密

将 `/data/data/com.tencent.mm/MicroMsg/` 下的 `systemInfo.cfg` `CompatibleInfo.cfg` 拷贝到 `autoDecryption` 下执行 `autoDecryption.exe systemInfo.cfg CompatibleInfo.cfg`
将会解密出最后一次登录微信用户的秘钥

### 手动解密

#### IMEI

    > IMEI 中的字母必须为大写

-   手机输入 \*#06# 可得
-   我们也可以在 /data/data/com.tencent.mm/shared_prefs/DENGTA_META.xml 中查找名为 IMEI_DENGTA 的值。

默认 IMEI 为 `1234567890ABCDEF`, 当无法获取 IMEI 将使用这个默认值
https://github.com/WANZIzZ/WeChatRecord/issues/7#issuecomment-695331151

#### uin

-   我们可以在 /data/data/com.tencent.mm/shared_prefs/system_config_prefs.xml 找到 default_uin，后面的数字就是我们要找的 uin 了。

## 使用 key 解密数据库

折腾后已知最简单的平台是 `ubuntu 20`. 尝试过 `CentOs` / `Windows` 下 sqlcipher 的依赖太难搞了

```
sudo apt-get update
sudo apt-get install sqlcipher
```

    > ${yourkey} = MD5(IMEI + uin).substring(0, 7).toLowerCase()

```
sqlcipher EnMicroMsg.db 'PRAGMA key = "${yourkey}"; PRAGMA cipher_use_hmac = off; PRAGMA kdf_iter = 4000; ATTACH DATABASE "decrypted_database.db" AS decrypted_database KEY "";SELECT sqlcipher_export("decrypted_database");DETACH DATABASE decrypted_database;'
```

## 暴力破解

```
 https://github.com/chg-hou/EnMicroMsg.db-Password-Cracker
```

## Tools

ViewDB 可以查看解密后的数据库
