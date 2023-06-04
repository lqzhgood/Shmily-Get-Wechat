# 导出数据库

## 整体流程

1 获取数据库

2 获取数据库密钥 key

3 解密数据库

```
MIUI 可以看这个帖子 https://github.com/Heyxk/notes/issues/1
```

## 0. 前期准备

本次需要获取 `/data/data/com.tencent.mm` 下的数据，此目录为系统保护目录

-   如果手机已 root ，直接访问并复制到电脑

-   没有 root,

    -   MIUI 通过备份实现， 参考 https://github.com/Heyxk/notes/issues/1
    -   华为 通过备份实现， 参考 https://1248.ink/?p=8

    -   通过微信自带的数据迁移功能把本机数据迁移到带 `root` 的 Android 系统内微信

        -   在手机上安装安卓虚拟机

            -   安卓虚拟机有 vmos 光速虚拟机 等

        -   电脑上安装 安卓模拟器

## 1. 获取数据库

微信数据库位于 `/data/data/com.tencent.mm/MicroMsg/[weixin_name]/EnMicroMsg.db`

## 2. 获取数据库密钥 key

根据前人的分析，微信数据库 EnMicroMsg.db 的密码是由 MD5(IMEI + uin).substring(0, 7).toLowerCase() 生成的。因此，我们需要找到 IMEI 和 uin 值

### 2.1 自动获取 key

将 `/data/data/com.tencent.mm/MicroMsg/` 下的 `systemInfo.cfg` `CompatibleInfo.cfg` 拷贝到 `autoDecryption` 下执行 `autoDecryption.exe systemInfo.cfg CompatibleInfo.cfg`
将会解密出最后一次登录微信用户的秘钥

### 2.2 手动获取 key

#### 2.2.1 获取 IMEI

有以下几种方式获取

-   我们也可以在 /data/data/com.tencent.mm/shared_prefs/DENGTA_META.xml 中查找名为 IMEI_DENGTA 的值。
-   手机输入 \*#06# 可得， 如果双卡手机，两个都可以尝试
-   如果微信迁移过，也可以试试以前旧手机的 IMEI, 获取如上一条
-   默认值 `1234567890ABCDEF`, 当无法获取 IMEI 将使用这个[默认值](https://github.com/WANZIzZ/WeChatRecord/issues/7#issuecomment-695331151)

> 将 IMEI 中的字母转为大写

#### 2.2.2 获取 uin

-   我们可以在 /data/data/com.tencent.mm/shared_prefs/system_config_prefs.xml 找到 default_uin，后面的数字就是我们要找的 uin 了。

#### 2.2.3 生成 key

> ${key} = MD5(IMEI + uin).substring(0, 7).toLowerCase()

-   搜索任意 `md5计算` 网站，如 `http://www.metools.info/code/c26.html`
-   填入 `${MD5}${uni}` 点击加密得到 $FULL
-   打开 Chrome/Edge 按 F12 呼出开发者工具，选择 `控制台/console`，执行 `"$FULL".substring(0, 7).toLowerCase()` 即可获取 key

## 3. 解密数据库

### 3.1 使用 key 解密数据库

折腾后已知最简单的平台是 `ubuntu 20`. 尝试过 `CentOs` / `Windows` 下 sqlcipher 的依赖太难搞了

```
sudo apt-get update
sudo apt-get install sqlcipher
```

替换以下命令中 `${yourkey}` 为 **2** 中获取的 key

```
sqlcipher EnMicroMsg.db 'PRAGMA key = "${yourkey}"; PRAGMA cipher_use_hmac = off; PRAGMA kdf_iter = 4000; ATTACH DATABASE "decrypted_database.db" AS decrypted_database KEY "";SELECT sqlcipher_export("decrypted_database");DETACH DATABASE decrypted_database;'
```

### 3.2 暴力破解数据库

```
 https://github.com/chg-hou/EnMicroMsg.db-Password-Cracker
```

## Tools

ViewDB 可以查看解密后的数据库
