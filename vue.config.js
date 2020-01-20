const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  outputDir: 'out/src/editor',
  productionSourceMap: false,

  configureWebpack: {
    devtool: 'source-map',
  },

  chainWebpack(config) {
    config.entryPoints
      .delete('app');
    config.entry('index')
      .add(resolve('./src/editor/main.ts'));

    config.resolve.alias
      .set('@$', resolve('src'));

    config.output
      .publicPath('./')
      .filename('[name].bundle.js');

    // 不进行分包
    config.optimization
      .splitChunks({})

    config.plugin('html')
      .tap(([options]) => {
        // 输出的 html 不移除不必要双引号
        (options.minify || {}).removeAttributeQuotes = false
        return [options]
      })

    config.when(process.env.NODE_ENV !== 'production', () => {
      ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(oneOfRules =>
        config.module
          .rule('css')
          .oneOf(oneOfRules)
          .use('vue-style-loader')
          .loader(MiniCssExtractPlugin.loader));

      config.plugin('extract-css')
        .use(new MiniCssExtractPlugin({ filename: 'css/styles.css' }))
    })

    config.when(process.env.NODE_ENV === 'production', () => {
      config.plugin('extract-css')
        .tap(([options]) => [{ filename: 'css/styles.css' }])
    })
  },

  devServer: {
    port: 3000,
  },
};
