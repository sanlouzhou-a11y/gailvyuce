const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // 从前端获取参数：closed (是否完结), limit (数量)
  const isClosed = req.query.closed === 'true';
  const fetchLimit = req.query.limit || 1000; // 默认拉取 1000 条以实现“全部”感

  try {
    console.log(`正在拉取数据: closed=${isClosed}, limit=${fetchLimit}`);

    const response = await axios.get('https://gamma-api.polymarket.com/markets', {
      params: {
        limit: fetchLimit,
        active: isClosed ? 'false' : 'true',
        closed: isClosed ? 'true' : 'false',
        order: 'volume24hr', 
        ascending: 'false'
      },
      timeout: 15000 // 延长超时时间以处理大数据量
    });

    if (!response.data || response.data.length === 0) {
      console.warn('Polymarket 返回了空列表');
    }

    res.status(200).json(response.data);
  } catch (error) {
    // 详细报错代码：让前端知道是网络问题还是 API 变动
    const errorInfo = {
      error: 'Backend Fetch Error',
      message: error.message,
      code: error.response ? error.response.status : 'ECONNABORTED'
    };
    console.error('Vercel 代理报错:', errorInfo);
    res.status(500).json(errorInfo);
  }
};
