const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    // 将 limit 改为 100，获取更多数据
    const response = await axios.get('https://gamma-api.polymarket.com/markets', {
      params: {
        limit: 100,          // <-- 这里改成了 100
        active: 'true',      // 只取进行中的
        closed: 'false',     // 排除已关闭的
        order: 'volume24hr', // 按成交量排序
        ascending: 'false'   // 降序（最火的在前）
      },
      timeout: 10000 
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('代理出错:', error.message);
    res.status(200).json([]); 
  }
};
