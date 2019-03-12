const merge = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  output: {
    publicPath: '/',
  },
  mode: 'development', // 开发环境
  devtool: 'inline-source-map', // source map 用来定位错误在源文件中的位置
  devServer: { // 用来配置webpack-dev-server
    contentBase: './quick_start', // 指定了服务器资源的根目录，默认值是该项目的根目录(配置文件所在的那一层)
  },
})
