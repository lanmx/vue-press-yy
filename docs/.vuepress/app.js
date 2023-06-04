const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = ({ command }) => {
  const proxies = [
    createProxyMiddleware('/api', {
      target: 'http://39.108.60.145:3001/', // 要代理的目标地址
      changeOrigin: true, // 是否改变“Host”头的原点为目标URL
      rewrite: path => path.replace(/^\/api/, ''), // 去除路径中的/api前缀
    })
  ];

  return {
    server: {
      middleware: proxies
    }
  };
};