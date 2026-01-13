import HtmlInlineScriptPlugin from "html-inline-script-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Path from "path";

export default {
  mode: "development",

  entry: "./src/index.ts",
  output: {
    path: Path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  plugins: [
    new HtmlWebpackPlugin({ 
      template: "./src/index.html",
    }), 
    new HtmlInlineScriptPlugin()
  ],
};