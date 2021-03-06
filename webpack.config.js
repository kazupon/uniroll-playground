const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const MonacoEditorPlugin = require("monaco-editor-webpack-plugin");
const WorkerPlugin = require("worker-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.worker.ts$/,
        use: [
          {
            loader: "comlink-loader",
            options: {
              singleton: true,
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },

      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".mjs", ".wasm"],
  },
  plugins: [
    new MonacoEditorPlugin(),
    new HTMLPlugin({
      template: path.join(__dirname, "src/index.html"),
    }),
    new WorkerPlugin({ globalObject: "self" }),
  ],
};
