'use strict';

const { merge } = require('webpack-merge');
const createBaseConfig = require('./webpackDevServer.config');
const apiMocker = require('connect-api-mocker');

module.exports = function (proxy, allowedHost) {
    const webpackDevServerBaseConfig = createBaseConfig(proxy, allowedHost);
    const frontendConfig = {
        before(app, server) {
            app.use(
                '/v2.0',
                apiMocker({
                    target: 'mocks',
                    nextOnNotFound: true,
                }),
            );
        },
    };

    // frontendConfig must come first, otherwise the proxy middleware will execute
    // before connect-api-mocker.
    const webpackDevServerConfig = merge(frontendConfig, webpackDevServerBaseConfig);

    return webpackDevServerConfig;
};
