const path = require('path');

module.exports = {
 // mode: 'development',
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  devServer: {
    port: 3000,
    contentBase: "./public",
    hot: true,
    inline:true,
    historyApiFallback: {
      index: "index.html",
    }
  }
}