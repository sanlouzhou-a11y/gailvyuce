const axios = require('axios');

module.exports = async (req, res) => {
  // 1. 设置跨域头，确保小程序能访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    // 2. 直接请求你刚才测试成功的官方地址
    const response = await axios.get('https://gamma-api.polymarket.com/markets', {
      params: {
        limit: 20,          // 取20条
        active: 'true',      // 必须是进行中的
        closed: 'false',     // 排除已关闭的
        order: 'volume24hr', // 按成交量排序
        ascending: 'false'   // 降序排列（最火的在前）
      },
      timeout: 10000 // 增加到 10 秒超时
    });

    // 3. 返回数据给小程序
    res.status(200).json(response.data);
  } catch (error) {
    console.error('代理访问官方接口失败:', error.message);
    // 如果报错，返回详细错误信息，方便我们排查
    res.status(500).json({ 
      error: 'Backend Error', 
      msg: error.message,
      tip: '请检查 Vercel 网络是否能访问 Polymarket' 
    });
  }
};
