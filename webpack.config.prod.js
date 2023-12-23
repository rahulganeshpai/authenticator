const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const path_dist = path.resolve(__dirname, "dist");
const path_src = path.resolve(__dirname, "src");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  target: "node",
  externals: [nodeExternals()],
  output: {
    filename: "bundle.js",
    path: path_dist,
  },
  devtool: "none",

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path_src,
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
