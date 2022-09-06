const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: false,
  entry: {
    app: "./main.tsx"
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader:  "css-loader",
            options: {
              modules: {
                localIdentName: '[path][name]__[local]'
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".js", ".ts", ".json", ".scss", ".css"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'sourcemaps/[file].map',
      publicPath: 'http://fakesourcemap.com/',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/template/index.html")
    })
  ]
}