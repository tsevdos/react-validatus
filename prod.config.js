const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve("./dist"),
    filename: "Validatus.js",
    library: "Validatus",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: [/\.js|.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./src"), "node_modules"],
    extensions: [".js", ".jsx", ".json"]
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    }
  }
};
