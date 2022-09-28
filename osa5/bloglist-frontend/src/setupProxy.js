/* eslint-disable no-undef */
// A fix for setting the proxy from:
//https://stackoverflow.com/questions/70374005/invalid-options-object-dev-server-has-been-initialized-using-an-options-object
//The createProxyMiddleware function doesnt work if it is declared as ES module, don't know why
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3003',
      secure: false,
      changeOrigin: true,
    })
  )
}
