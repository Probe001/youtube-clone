const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/client/js/main.js",
	mode: "development",
	watch: true,
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/styles.css",
		}),
	],
	output: {
		filename: "js/main.js",
		path: path.resolve(__dirname, "assets"),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [["@babel/preset-env", { targets: "defaults" }]],
					},
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
		],
	},
};
