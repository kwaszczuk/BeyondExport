const webpack = require('webpack');
const path = require('path');

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        ddb_monsters: {
            import: [
                './dndbeyond/content-script.ts'
            ]
        },
        roll20: {
            import: [
                './roll20/content-script.ts'
            ]
        },
        background: {
            import: [
                './extension/background.ts'
            ]
        },
    },
    output: { path: path.join(__dirname, "dist"), filename: "[name].js" },
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts"],
        alias: {
            '@common': path.resolve(__dirname, 'src/common/')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

module.exports = config;