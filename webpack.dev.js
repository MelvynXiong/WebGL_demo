const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
module.exports = merge(common, {
  entry: ['webpack-hot-middleware/client?reload=true', './quick_start/cube.ts'],
  output: {
    publicPath: '/',
  },
  mode: 'development', // 开发环境
  devtool: 'inline-source-map', // source map 用来定位错误在源文件中的位置
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
