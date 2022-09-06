const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    app: "./main.tsx"
    // app: "./src/reducer/index.tsx" // useReducer专用
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    port: 8000
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".js", ".ts", ".d.ts", ".json", ".scss", ".css"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/template/index.html")
    })
  ]
}