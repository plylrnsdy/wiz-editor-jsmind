var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: './src/editor/index.ts'
    },
    output: {
        path: path.join(__dirname, 'out/src/editor'), // 打包后的输出路径（绝对路径）
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
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/editor/index.html',
            chunks: ['index'],
            filename: 'index.html'
        }),
        new ExtractTextPlugin('styles.css')
    ]
};
