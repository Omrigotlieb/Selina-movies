// import path from 'path';

const path = require("path");
// const { InjectManifest } = require("workbox-webpack-plugin");

// plugins: [
//   new InjectManifest({
//     swSrc: "sw.js"
//   })
// ],
// export default {
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "app"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },

  devtool: "#eval-source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        query: {
          compact: false
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader"
      }
    ]
  }
};
