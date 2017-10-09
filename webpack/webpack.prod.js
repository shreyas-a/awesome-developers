const webpack = require("webpack");
const clean = require("clean-webpack-plugin");

module.exports = {
  plugins: [
    new clean(["dist"], { root: process.cwd(), verbose: true }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
};
