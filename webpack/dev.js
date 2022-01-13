const { join } = require('path')
const { merge } = require("webpack-merge");
const commonConfig = require("./common");

module.exports = (env) => merge(commonConfig(env), {
    mode: "development",
    entry: [
        "webpack-dev-server/client?http://localhost:8080",
        "./index.js",
    ],
    devServer: {
        hot: "only",
        historyApiFallback: true,
        static: join(__dirname, '../public')
    },
    devtool: "cheap-module-source-map",
    plugins: [],
});