const fs = require("fs")
const webpack = require("webpack")

module.exports = {
	reactScriptsVersion: "react-scripts",
	style: {
		css: {
			loaderOptions: () => {
				return {
					url: false,
				}
			},
		},
	},
	devServer: {
		https: {
			key: fs.readFileSync("./key.pem"),
			cert: fs.readFileSync("./cert.pem"),
		},
	},
	prettier: "^2.7.1",
	webpack: {
		configure: {
			plugins: [
				new webpack.ProvidePlugin({
					process: "process/browser",
					Buffer: ["buffer", "Buffer"],
					ethereum: ["ethereum", "ethereum"]
				}),
			],
			resolve: {
				fallback: {
					crypto: require.resolve("crypto-browserify"),
					crypto: require.resolve("stream-browserify")
				}
			}
		}
	},
}
