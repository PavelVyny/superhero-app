const { createProxyMiddleware } = require('http-proxy-middleware');
 
//get /uploads folder from the server
module.exports = function(app) {
  app.use(createProxyMiddleware('/uploads', { target: 'http://localhost:4000/' }))
}