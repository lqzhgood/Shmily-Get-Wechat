const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

const { getMsgJson } = require("./convert/utils/index.js");
const { clearTmp } = require("./convert/utils/downFile");

const { FILE_DIR_OUT_DIR, rootPath } = require("./config.js");

const db_type = process.argv[2];
console.log(`${db_type}`);

const globalVar = require("./utils/globalVar.js");
globalVar.currSource = db_type;

(async () => {
    fs.mkdirpSync("./dist");
    fs.mkdirpSync("./dist/_temp");

    // 生成基础表情
    {
        const res = execSync("npm run emojiByBase");
        console.log("npm run emojiByBase", res.toString());
        fs.copySync(
            "./lib/emojiByBase/EmojiAliasMap",
            path.join(FILE_DIR_OUT_DIR, "baseEmoji")
        );
    }
    // 生成自定义表情
    {
        const res = execSync("npm run emojiByWx");
        console.log("npm run emojiByWx", res.toString());
    }
    // 生成自定义表情
    {
        const res = execSync("npm run emojiByQQ");
        console.log("npm run emojiByQQ", res.toString());
    }
    // 生成小程序信息
    {
        const res = execSync("npm run appInfo");
        console.log("npm run appInfo", res.toString());
    }
    // 生成 assets 所有文件的 md5 map
    if (!fs.existsSync("./dist/_temp/ASSET_FILES.json")) {
        const res = execSync("npm run md5assets");
        console.log("npm run md5assets", res.toString());
    }

    // 复制额外的静态文件
    if (fs.existsSync("./input/copyToData")) {
        fs.copySync("./input/copyToData", path.join(FILE_DIR_OUT_DIR, db_type));
    }

    // 生成本地文件的 md5
    {
        const res = execSync("npm run md5local");
        console.log("npm run md5local", res.toString());
    }

    // android;
    const message = getMsgJson(db_type);

    const ToMsg = require(`./convert/index.js`);
    const msgArr = await ToMsg(db_type, message);

    fs.writeFileSync(
        `./dist/${rootPath}.json`,
        JSON.stringify(msgArr, null, 4)
    );

    clearTmp();

    console.log("✔️", "ok", msgArr.length);
})();

// setTimeout(() => {}, 1000000);
