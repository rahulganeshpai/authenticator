const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const path_dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",
  entry: "./index.ts",
  target: "node",
  externals: [nodeExternals()],
  output: {
    filename: "bundle.js",
    path: path_dist,
  },
  devtool: false,

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new CleanWebpackPlugin(), new CaseSensitivePathsPlugin()],
};
