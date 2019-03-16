const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  output: {
    filename: 'index.js', // 编译后的文件名
    path: path.resolve(__dirname, '../dist'), // 编译后的文件存放路径
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'demo_01',
      template: path.resolve(__dirname, '../index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
