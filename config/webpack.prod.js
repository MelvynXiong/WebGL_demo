const merge = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  entry: '../drawLine/index.ts', // 入口文件
  mode: 'production',
})
