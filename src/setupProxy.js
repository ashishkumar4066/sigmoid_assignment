const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/sigmoid",
		createProxyMiddleware({
			target: "https://sigviewauth.sigmoid.io",
			changeOrigin: true,
			pathRewrite: { "^/sigmoid": "" },
		})
	);
};
