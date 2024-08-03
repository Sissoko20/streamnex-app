const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://tntv-samsung-fr.amagi.tv',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
