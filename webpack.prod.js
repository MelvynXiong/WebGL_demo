const merge = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  entry: './quick_start/cube.js', // 入口文件
  mode: 'production',
})