const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: {
        ddb_monsters: {
            import: [
                './src/dndbeyond/content-script.ts'
            ]
        },
        roll20: {
            import: [
                './src/roll20/content-script.ts'
            ]
        },
        'roll20-script': {
            import: [
                './src/roll20/page/page-script.ts'
            ]
        },
        background: {
            import: [
                './src/extension/background.ts'
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
            '@common': path.resolve(__dirname, 'src/common/'),
            '@typings': path.resolve(__dirname, 'src/typings/')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Backbone: 'backbone'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public' }
            ]
        })
    ]
};

module.exports = config;