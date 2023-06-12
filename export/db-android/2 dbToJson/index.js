const _ = require("lodash");
const fs = require("fs-extra");
const path = require("path");
const exec = require("child_process").execSync;

const { FILTER_USER } = require("./config.js");
const { un7z } = require("./utils/index.js");

(async () => {
    console.log("正在解密 Message");

    await un7z(
        "./lib/decodeMessageTable/Releases/jre-1.8.7z",
        "./input/jre-1.8"
    );
    fs.copyFileSync(
        "./lib/decodeMessageTable/Releases/decodeMessageTable.exe",
        "./input/decodeMessageTable.exe"
    );

    exec(`decodeMessageTable.exe ${FILTER_USER.join(" ")}`.trim(), {
        cwd: path.join(__dirname, "./input/"),
        encoding: "utf8",
    });
    fs.removeSync("./input/decodeMessageTable.exe");

    console.log("FILTER_USER", FILTER_USER);
    fs.mkdirpSync("./dist/BLOB/");

    const msg = require("./input/message.json")
        .filter((v) => {
            return FILTER_USER.length === 0
                ? true
                : FILTER_USER.includes(v.talker);
        })
        .sort((a, b) => a.createTime - b.createTime);

    const res = msg.map((v) => {
        const { msgId } = v;

        const lvbufferFile = `./input/BLOB/${msgId}-lvbuffer`;
        if (fs.existsSync(lvbufferFile)) {
            fs.moveSync(lvbufferFile, `./dist/BLOB/${msgId}-lvbuffer`, {
                overwrite: true,
            });
        }

        v.hasXml.forEach((k) => {
            const kv = Object.create(null);

            for (const key in v[k]) {
                if (Object.hasOwnProperty.call(v[k], key)) {
                    const value = v[k][key];
                    const _key = key.replace(/^\.msg/, "msg");
                    _.set(kv, _key, value);
                }
            }
            v[k] = kv;
        });

        return v;
    });
    console.log("msg length", res.length);
    fs.writeFileSync(
        "./dist/db-android_msg_res.json",
        JSON.stringify(res, null, 4)
    );

    require("./db/index.js");

    console.log("ok");

    // setTimeout(() => {}, 10000000);
})();
