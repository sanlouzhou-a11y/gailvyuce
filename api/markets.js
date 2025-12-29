const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { closed = 'false' } = req.query;

  try {
    const response = await axios.get('https://gamma-api.polymarket.com/markets', {
      params: {
        limit: 1000,           // 极大限度抓取
        active: closed === 'true' ? 'false' : 'true', 
        closed: closed,
        order: 'volume24hr',   // 热门优先
        ascending: 'false'
      },
      timeout: 15000
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
