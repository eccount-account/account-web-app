// commonJS 방식, 설정 내보내기
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "none", // none, development, product(ion?)
    devServer: {
        // 어떤 폴더의 파일을 띄울 것인가?
        static: "./dist",
        port: 3000,
        open: true,
    },
    devtool: "source-map",

    entry: {
        // 최초 진입점
        main: "./src/ts/index.ts", // 청크네임
        income: "./src/ts/income.ts",
        statistical: "./src/ts/statistical.ts",
        utile: "./src/ts/utile.ts",
    },
    output: {
        // 출력
        filename: "[name].[contenthash].bundle.js",
        path: path.join(__dirname, "dist"),
        clean: true, // 지웠다가 다시 만들기
    },

    // 웹팩에 로더 명시
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, //       /정규식 구역/
                use: ["style-loader", "css-loader"], // 오른쪽부터 돌기
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: "asset/resource", // 기본 내장됨
            },
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["main"],
        }),
        new HtmlWebpackPlugin({
            filename: "income.html",
            template: "./src/income.html",
            chunks: ["income"],
        }),
        new HtmlWebpackPlugin({
            filename: "statistical.html",
            template: "./src/statistical.html",
            chunks: ["statistical"],
        }),
    ],
    resolve: {
        extensions: [".ts", ".js", ".tsx"],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[/\\]node_modules[/\\]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
    // devServer: {
    //     proxy: {
    //         "/api": "http://localhost:3000",
    //     },
    // },
};
