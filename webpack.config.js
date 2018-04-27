var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    WebpackDevServer = require("webpack-dev-server");

module.exports = {
    mode: 'development', // 'development' | 'production' | none. 缺省状态下，没有配置的都默认关闭
    entry: {
        index: './src/editor/index.ts'
    },
    output: {
        path: path.join(__dirname, 'out/src/editor'), // 打包后的输出路径（绝对路径）
        publicPath: '.', // HTML 引用 Javascript 的目录路径，在这里是本地地址。
        filename: '[name].bundle.js' // 打包后的文件名模板：'[name].[hash].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
        alias: { // 解析模块别名为指定的文件
            'vue$': 'vue/dist/vue.esm.js',
            '@fortawesome/fontawesome-free-solid$': '@fortawesome/fontawesome-free-solid/shakable.es.js'
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader',
                options: { loaders: { ts: 'ts-loader' } }
            }]
        }, {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'ts-loader',
                options: {
                    configFile: path.join(__dirname, 'tsconfig.json'),
                    compilerOptions: { "module": "commonjs" },
                    appendTsSuffixTo: [/\.vue$/],
                    onlyCompileBundledFiles: true
                }
            }]
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }, {
            test: /\.(eot|svg|ttf)(\?\S*)?$/,
            use: 'file-loader'
        }, {
            test: /\.woff2?(\?\S*)?$/,
            use: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: { name: '[name].[ext]?[hash]' }
            }]
        }, {
            test: require.resolve('jsmind'),
            use: [{
                loader: 'expose-loader',
                options: 'jsMind'
            }]
        }]
    },
    // optimization: {
    //     splitChunks: {
    //     }
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/editor/index.html',
            chunks: ['index'],
            filename: 'index.html'
        }),
        new ExtractTextPlugin('styles.css')
    ],
    stats: { // 控制输出哪些统计信息
        cached: false, // 缓存了的（但没构建）模块的信息
        cachedAssets: false, // 缓存了的资源
        children: false, // 子级的信息
        chunks: false, // 包信息（设置为 `false` 能允许较少的冗长输出）
        chunkModules: false, // 将内置模块信息增加到包信息
        colors: true, // 使用颜色
        errorDetails: false, // 错误的详细信息（就像解析日志一样）
        hash: false, // 编译的哈希值
        modules: false, // 内置的模块信息
        reasons: false, // 模块被引入的原因
        source: false, // 模块的源码
        timings: true, // 每个文件生成时间
        version: false, // webpack 版本信息
        warnings: true, // 显示警告信息
    },
    watchOptions: {
        poll: 1000, // 检查文件是否更改的时间间隔(ms)
        aggregateTimeout: 750, // 允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里(ms)
        ignored: /node_modules/ // 排除一些无关的文件夹
    },
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, 'out/src/editor'),
        historyApiFallback: true,
        hot: true
    }
};
