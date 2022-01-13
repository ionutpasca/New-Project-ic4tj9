const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssNormalize = require('postcss-normalize');
const config = require('../teleport.config.json')

module.exports = () => {
return {
    resolve: {
        modules: ['node_modules', 'app'],
        mainFields: ['browser', 'jsnext:main', 'main'],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    target: 'web',
    context: resolve(__dirname, "../src"),
    experiments: {
    buildHttp: {
        frozen: false,
        upgrade: true,
        cacheLocation: join(__dirname, '../webpack/webpack.lock'),
        allowedUris: ["https://jspm.dev", "https://ga.jspm.io", "https://cdn.skypack.dev", "https://esm.sh/", ...(config?.allowedUris || [])]
    }
    },
    module: {
    rules: [
        {
            test: [/.jsx?$/, /.tsx?$/],
            use: ["babel-loader"],
            exclude: /node_modules/,
        },
        {
            test: /.module.css$/,
            use: ["style-loader", "css-loader", {
                    loader: require.resolve('postcss-loader'),
                    options: {
                    postcssOptions: {
                        plugins: [
                            require('postcss-flexbugs-fixes'),
                            require('postcss-preset-env')({
                                autoprefixer: {
                                    flexbox: 'no-2009',
                                },
                                stage: 3,
                            }),
                            postcssNormalize(),
                            ],
                        },
                        sourceMap: false,
                    },
                },
            ],
            sideEffects: true
        },
        {
            test: /.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /.svg$/i,
            type: 'asset/inline'
        },
    ],
    },
    plugins: [new HtmlWebpackPlugin({
        template: '../public/index.html',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
        inject: true,
    })],
    performance: {
    hints: false,
    },
}
};