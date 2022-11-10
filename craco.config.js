const fs = require("fs")

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
}
