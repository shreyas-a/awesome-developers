const webpack = require("webpack");

module.exports = {
  devServer: {
    contentBase: "./dist",
    hot: true,
    historyApiFallback: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
