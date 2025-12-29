const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    // 转发请求。我们直接请求 Polymarket 最热门的 20 条数据
    const response = await axios.get('https://gamma-api.polymarket.com/markets', {
      params: {
        limit: 20,
        active: 'true',
        closed: 'false',
        sort: 'volume24hr', // 按成交量排序确保有数据
        order: 'desc'
      },
      timeout: 9000
    });

    // 打印一下数据长度，方便你在 Vercel 日志里看
    console.log('Fetched data length:', response.data.length);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('代理出错:', error.message);
    res.status(200).json([]); // 出错返回空数组
  }
};
