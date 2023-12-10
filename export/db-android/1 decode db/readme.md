# 导出数据库
 
## 前期准备 

本次需要获取 `/data/data/com.tencent.mm` 下的数据，此目录为系统保护目录

-   如果手机已 root ，直接访问并复制到电脑

-   没有 root,

    -   MIUI 通过备份实现， 参考 https://github.com/Heyxk/notes/issues/1
    -   华为 通过备份实现， 参考 https://1248.ink/?p=8

    -   通过微信自带的数据迁移功能把本机数据迁移到带 `root` 的 Android 系统内微信

        -   在手机上安装安卓虚拟机

            -   安卓虚拟机有 vmos 光速虚拟机 等

        -   电脑上安装 安卓模拟器


> 更多从 Android 复制文件到电脑可以参考 http://lqzhgood.github.io/Shmily/guide/setup-runtime/Android-copy.html


 
## 使用

1. 微信数据库位于 `/data/data/com.tencent.mm/MicroMsg/[weixin_name]/EnMicroMsg.db`, 将此文件复制到电脑上
2. 获取数据库密钥 `key`
   
    > 提供以下几种方式, 按需选择, 如果失败, 可以尝试其他方式
   
   <details> <summary>[ 推荐 ] 手动计算 <code>key</code> </summary>
       
      1. 获取 `IMEI` 
  
         <details> 
         
            -   我们也可以在 `/data/data/com.tencent.mm/shared_prefs/DENGTA_META.xml` 中查找名为 `IMEI_DENGTA` 的值。
            -   手机输入 `*#06#` 可得， 如果双卡手机，两个都可以尝试
            -   如果微信迁移过，也可以试试以前旧手机的 `IMEI`, 获取如上一条
            -   当微信无法获取 `IMEI`, 将使用默认值 `1234567890ABCDEF` | [来源](https://github.com/WANZIzZ/WeChatRecord/issues/7#issuecomment-695331151)
              
         </details>


      2. 获取 `uni`
  
         - 我们可以在 `/data/data/com.tencent.mm/shared_prefs/system_config_prefs.xml` 找到 `default_uin`，后面的数字就是我们要找的 `uin` 了。

      3. 通过 `IMEI` 和 `uni`计算出 `key`
         <br/>

         > 微信数据库 EnMicroMsg.db 的密码算法为 `key = MD5(IMEI + uin).substring(0, 7).toLowerCase()`

         打开 [计算工具](http://lqzhgood.github.io/Shmily/guide/tools/Wechat/calc-wechat-key.html) , 填入 `IMEI` 和 `uni` 计算出 `key`

     </details>

     <details> <summary>自动获取最后一次登录微信用户的 <code>key</code> </summary>
          
      1. 复制 `/data/data/com.tencent.mm/MicroMsg/` 下的 `systemInfo.cfg` 和 `CompatibleInfo.cfg` 文件
      2. 拷贝到 `autoDecryption` 目录下
      3. 执行 `autoDecryption.exe systemInfo.cfg CompatibleInfo.cfg`
      4. 得到最后一次登录微信用户的 `key`
         
    </details>

3. 使用 `key` 解密数据库

   > 提供以下几种方式, 按需选择, 如果失败, 可以尝试其他方式 
   
   <details> 
     <summary>[ 推荐 ] 🎞️ 使用 <code>docker</code> 自动解密</summary>
  
     文档位于 [\export\db-android\1 decode db\docker\readme.md](https://github.com/lqzhgood/Shmily-Get-Wechat/tree/main/export/db-android/1%20decode%20db/docker)

   </details>
       
   <details> <summary>手动解密</summary>
 
    折腾后已知最简单的平台是 `ubuntu 20`. 尝试过 `CentOs` / `Windows` 下 sqlcipher 的依赖太难搞了
    
    ```
    sudo apt-get update
    sudo apt-get install sqlcipher
    ```
    
    替换以下命令中 `${yourkey}` 为 **2** 中获取的 key
    
    ```
    sqlcipher EnMicroMsg.db 'PRAGMA key = "${yourkey}"; PRAGMA cipher_use_hmac = off; PRAGMA kdf_iter = 4000; ATTACH DATABASE "decrypted_database.db" AS decrypted_database KEY "";SELECT sqlcipher_export("decrypted_database");DETACH DATABASE decrypted_database;'
    ```
   </details>
   
   <details> 
     <summary>暴力破解</summary>

     [https://github.com/chg-hou/EnMicroMsg.db-Password-Cracker](https://github.com/chg-hou/EnMicroMsg.db-Password-Cracker)

   </details>

## Tools

ViewDB 可以查看解密后的数据库


## 参考

本文代码及过程有参考 `https://github.com/Heyxk/notes/issues/1`

