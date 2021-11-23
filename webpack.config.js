const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fs = require("fs");

function generateHtmlPlugins(templateDir) {
	const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
	return templateFiles.map((item) => {
		const parts = item.split(".");
		const name = parts[0];
		const extension = parts[1];
		return new HtmlWebpackPlugin({
			filename: `${name}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
			minify: false,
			inject: "body",
			chunks: ["app", `${name}`],
		});
	});
}

const htmlPlugins = generateHtmlPlugins("./source/page");

module.exports = {
	entry: {
		app: ["./source/js/app.js", "./source/scss/main.scss"],
		index: "./source/js/index.js",
		company: "./source/js/company.js",
		cpc: "./source/js/cpc.js",
		"develop-site": "./source/js/develop-site.js",
		"support-site": "./source/js/support-site.js",
		optimization: "./source/js/optimization.js",
		"case-item": "./source/js/case-item.js",
	},

	mode: "development",

	resolve: {
		extensions: [".js", ".scss", ".css"],
		modules: ["./node_modules/"],
	},

	performance: {
		maxEntrypointSize: 5120000,
		maxAssetSize: 5120000,
	},

	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
						options: {
							url: false,
						},
					},
					{
						loader: "sass-loader",
					},
				],
			},

			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
						options: {
							url: false,
						},
					},
				],
			},

			{
				test: /\.ejs$/,
				use: {
					loader: "ejs-compiled-loader",
					options: {
						htmlmin: false,
					},
				},
			},
		],
	},

	devServer: {
		contentBase: path.join(__dirname, "build"),
		port: 7777,
	},

	output: {
		path: path.join(__dirname, "build"),
		publicPath: "",
		filename: "js/[name].js",
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/app.css",
			// chunkFilename: "[id].css",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "source/fonts"),
					to: path.resolve(__dirname, "build/fonts"),
				},
				{
					from: path.resolve(__dirname, "source/img"),
					to: path.resolve(__dirname, "build/img"),
				},
				{
					from: path.resolve(__dirname, "source/3d"),
					to: path.resolve(__dirname, "build/3d"),
				},
			],
		}),

		new CleanWebpackPlugin(),
	].concat(htmlPlugins),
};
