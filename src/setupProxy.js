const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/v2.0',
        createProxyMiddleware({
            target: 'https://api.weatherbit.io',
            changeOrigin: true,
        }),
    );
};
