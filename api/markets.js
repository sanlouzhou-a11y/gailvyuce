const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    // 转发请求到 Polymarket
    const response = await axios.get('https://gamma-api.polymarket.com/markets', {
      params: req.query,
      timeout: 9000 // 增加到9秒，给 Vercel 留出反应时间
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('代理出错:', error.message);
    // 即使失败也返回空数组，防止前端报错 500
    res.status(200).json([]);
  }
};
