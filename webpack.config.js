const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './quick_start/cube.js', // 入口文件
  output: {
    filename: 'index.js', // 编译后的文件名
    path: path.resolve(__dirname, 'quick_start'), // 编译后的文件存放路径
  },
  mode: 'development', // 开发环境
  devtool: 'inline-source-map', // source map 用来定位错误在源文件中的位置
  devServer: { // 用来配置webpack-dev-server
    contentBase: './quick_start', // 指定了服务器资源的根目录，默认值是该项目的根目录(配置文件所在的那一层)
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'demo_01',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
