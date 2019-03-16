const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const open = require('open')

const app = express()
const config = require('./webpack.dev.js')
const compiler = webpack(config)
const port = 8080

/** 配置开发环境 middleware */

const DevMiddlewareInstance = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
})
// 打包文件到内存中，并监听文件，当打包完成后自动打开浏览器
app.use(DevMiddlewareInstance)
DevMiddlewareInstance.waitUntilValid(() => {
  const pageUrl = `http://localhost:${port}`
  open(pageUrl)
})
// 浏览器的热加载和自动刷新
app.use(webpackHotMiddleware(compiler))

app.listen(port, function() {
  console.log(`Listening on port ${port}!\n`)
})
