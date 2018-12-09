const path = require("path");

module.exports = {
  entry: "./examples/examples.js",
  output: {
    path: path.resolve("./examples"),
    filename: "examples-bundle.js"
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
  devServer: {
    overlay: true,
    contentBase: "./examples"
  }
};
