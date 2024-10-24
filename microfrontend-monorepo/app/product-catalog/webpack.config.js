const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
});

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Ensure the correct entry point
  output: {
    publicPath: 'auto', // Ensures correct loading even on different hosts
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    allowedHosts: 'all',
    port: process.env.PORT || 3000, // Allows dynamic port assignment
    historyApiFallback: true, // Supports SPA routing
    open: true, // Automatically opens the browser on start
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource', // Support for static assets
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    htmlPlugin,
    new ModuleFederationPlugin({
      name: "ProductCatalog", // Unique name for this microfrontend
      filename: "remoteEntry.js", // Entry file exposed by Module Federation
      exposes: {
        './ProductList': './src/ProductList', // Correctly expose the ProductList component
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        "react-dom": { singleton: true, eager: true, requiredVersion: false },
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure React files are properly resolved
  },
};