const { createProxyMiddleware } = require('http-proxy-middleware');
const apiMocker = require('connect-api-mocker');

module.exports = function (app) {
    const mode = process.argv.slice(2)[0];

    if (mode === 'FAKE') {
        app.use(
            '/v2.0',
            apiMocker({
                target: 'mocks',
                nextOnNotFound: true,
            }),
        );
    }

    app.use(
        '/v2.0',
        createProxyMiddleware({
            target: 'https://api.weatherbit.io',
            changeOrigin: true,
        }),
    );
};
