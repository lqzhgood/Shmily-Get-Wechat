module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        commonjs: true,
        'shared-node-browser': true,
        worker: true,
        amd: true,
        mocha: true,
        jasmine: true,
        jest: true,
        phantomjs: true,
        jquery: true,
        qunit: true,
        prototypejs: true,
        shelljs: true,
        meteor: true,
        mongo: true,
        protractor: true,
        applescript: true,
        nashorn: true,
        serviceworker: true,
        atomtest: true,
        embertest: true,
        webextensions: true,
        es6: true,
        greasemonkey: true,
    },
    globals: {
        // "vue": true,
        // "dayjs": true,
        // "Vue": true,
        // "wx": true,
        // "_hmt": true, //百度
    },

    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    plugins: [],
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            globalReturn: true,
            impliedStrict: false,
            jsx: true,
        },
    },

    rules: {
        // 和 vscode 配置中需要一致
        'prettier/prettier': [
            'warn',
            {
                arrowParens: 'avoid',
                endOfLine: 'lf',
                htmlWhitespaceSensitivity: 'ignore',
                singleQuote: true,
                jsxSingleQuote: true,
                useTabs: false,
                tabWidth: 4,
                printWidth: 9999999,
            },
        ],
    },
};
