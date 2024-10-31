const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Proxy API requests to another server
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:5001', // 目标服务器地址
  changeOrigin: true,
  pathRewrite: {
    '^/': '/api/', // 保持路径不变
  },
  onProxyReq: (proxyReq, req, res) => {
    // 打印转发的请求信息
    console.log(`转发接口: ${req.originalUrl}`);
    console.log(`请求方法: ${req.method}`);
  },
}));

// Handle all other requests by sending the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
