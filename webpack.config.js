const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const pkg = require("./package.json");

const environment = process.env.NODE_ENV;

let config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    library: {
      name: "FakeAgoraRTCWrapper",
      type: "umd",
      umdNamedDefine: true,
    },
    filename: `${pkg.name}_${pkg.version}.js`,
    globalObject: "this",
    environment: {
      arrowFunction: false,
    },
  },
  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
        },
        exclude: /node_modules|\.d\.ts$/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|mp4)$/i,
        loader: "file-loader",
      },
    ],
  },

  plugins: [new CleanWebpackPlugin()],
  devServer: {
    static: path.resolve(__dirname, "./src"),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  },
};
if (environment !== "production") {
  config.devtool = "inline-source-map";
} else {
  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          toplevel: true,
          ie8: false,
          safari10: true,
        },
      }),
    ],
  };
}

module.exports = config;
