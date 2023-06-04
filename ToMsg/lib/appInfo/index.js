const path = require("path");
const fs = require("fs-extra");

const { getJSON } = require("../../utils/index.js");
const appInfo = getJSON("../../input/JSON/android/AppInfo.json ", []);
const repoJson = fs
    .readdirSync(path.join(__dirname, "./repo/"))
    .filter((v) => path.extname(v) === ".json")
    .reduce(
        (pre, f) =>
            [].concat(
                pre,
                fs.readJsonSync(path.join(__dirname, `./repo/${f}`))
            ),
        []
    );

fs.writeFileSync(
    path.join(__dirname, "../../dist/_temp/appInfo.json"),
    JSON.stringify([].concat(appInfo, repoJson), null, 4)
);
