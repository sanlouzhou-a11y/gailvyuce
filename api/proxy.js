// api/markets.js
const axios = require('axios');

module.exports = async (req, res) => {
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // 转发请求给 Polymarket Gamma API
    const response = await axios.get('https://gamma-api.polymarket.com/markets', {
      params: req.query,
      timeout: 8000 // 设置 8 秒超时，防止 Vercel 强制断开
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('代理请求失败:', error.message);
    
    // 如果 Polymarket 返回了错误，我们也把错误返回给小程序
    if (error.response) {
      res.status(error.response.status).json({ error: 'Polymarket API 报错' });
    } else {
      res.status(500).json({ error: '无法连接到预测市场服务器' });
    }
  }
};
