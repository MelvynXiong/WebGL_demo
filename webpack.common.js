const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  output: {
    filename: 'index.js', // 编译后的文件名
    path: path.resolve(__dirname, 'quick_start'), // 编译后的文件存放路径
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
