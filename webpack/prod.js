const { merge } = require("webpack-merge");
const { resolve, join, relative } = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require("./common");
const CopyPlugin = require("copy-webpack-plugin");
const fs = require("fs");
const assetsPath = resolve(join(__dirname, "../public/playground_assets"));

const plugins = [];
try {
    const files = fs.readdirSync(assetsPath).length;
    if (files > 0) {
        plugins.push(
            new CopyPlugin({
                patterns: [
                {
                    from: "../public/playground_assets",
                    to() {
                    return join(__dirname, "../build", "playground_assets");
                    },
                },
                ],
            })
        );
    }
} catch (e) {
    console.error(e);
}

module.exports = (env) =>
merge(commonConfig(env), {
    mode: "production",
    entry: resolve(__dirname, "../src/index.js"),
    output: {
        filename: "js/bundle.[contenthash].min.js",
        path: resolve(__dirname, "../build"),
        publicPath: "/",
        assetModuleFilename: "images/[hash][ext][query]",
    },
    plugins,
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        nodeEnv: "production",
        sideEffects: true,
        concatenateModules: true,
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            maxInitialRequests: 10,
            minSize: 0,
        },
    },
});