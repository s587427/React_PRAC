const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
module.exports = {
    //模式
    mode: process.env.NODE_ENV,
    //進入點
    entry: {
        bundle: './src/index.js',
    },
    //輸出設定
    output: {
        filename: '[name].[hash].js',
        //path 因為要兼容不同的系統環境，欄位需填寫絕對路徑，__dirname 為 Node 的環境下附屬的，可以取得當下資料夾的絕對路徑，path.resolve 則是把資料夾的絕對路徑和產出的 dist 資料夾合併起來
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', //配置此選項解決css lost in react neasted router v6         
    },
    plugins: [
        //js檔抽離css
        new MiniCssExtractPlugin({
            filename: 'css/[name].css', // 為一般列在 entry 檔內打包出來的檔案。
            chunkFilename: 'css/[id].css', // 為未被列在 entry 檔內但也需要打包的檔案。
        }),
        //每次編譯前，都要先刪掉舊檔案。
        new CleanWebpackPlugin(),
        //動態塞入不同的內容進入一隻 HTML
        new HtmlWebpackPlugin({
            template: './src/index.html', //要使用的模板，通常會使用動態資料傳入一隻 HTML。
            filename: 'index.html', //匯出檔案的名稱。
            title: 'React-demo',
            hello: '是在 hello ?',
        }),
    ],
    //load配置
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/, // 排除ckcss文件
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                    'css-loader',
                    'postcss-loader' //會自己去尋找設定檔postcss.config.js
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'image',
                    name: '[name].[ext]',
                    exclude: [
                        /\.(js|mjs|jsx|ts|tsx)$/,
                        /\.html$/,
                        /\.json$/,
                        /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/, // 排除ck文件
                        /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/ // 排除ck文件
                    ]
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    //如果 options 配置太雜的話可以拉到根目錄創一支 babel.config.js。
                    // options: {
                    //     presets: ["@babel/preset-env", "@babel/preset-react"]
                    // }
                }
            },
            /* ck 配置設定 */
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                use: ['raw-loader']
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true
                            }
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: styles.getPostCssConfig({
                                themeImporter: {
                                    themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                                },
                                minify: true
                            })
                        }
                    }
                ]
            },
        ]
    },
    //配置webpack-dev-server webpack5 自帶熱更新
    devServer: {
        // 代理
        proxy: {
            '/api/': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' },
            },
        },
        static: path.join(__dirname, 'dist'),
        port: 9000,
        compress: false,
        open: true,
        historyApiFallback: true, //单页应用(SPA)一般只有一个index.html, 导航的跳转都是基于HTML5 History API，当用户在越过index.html 页面直接访问这个地址或是通过浏览器的刷新按钮重新获取时，就会出现404问题；配置此選項解決
    },
    resolve: {
        fallback: {
            "fs": false
        },
    }
}