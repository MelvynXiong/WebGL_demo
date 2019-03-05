const path = require('path')
module.exports = {
  entry: './quick_start/cube.js',
  output: { 
    filename: 'index.js',
    path: path.resolve(__dirname, 'quick_start'),
  }
}
