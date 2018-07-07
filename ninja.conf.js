var path = require('path')

module.exports = {
	template: "swig", // whatever template engine you like
	mock: "/mock/mock.json", // dir for mock data
	webpack: true, // flag for using webpack or not
	webpackConfigPath: path.join(__dirname, "./build/webpack.dev.conf.js"),
	proxy: {
		route: "/",
		origin: "112.74.88.136:5488"
	},
	staticDir: "/static",
	templateDir: "/template",
}