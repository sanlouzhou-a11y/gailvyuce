const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { closed = 'false', limit = 100 } = req.query;

  try {
    // 构建请求参数：Polymarket 官方使用 order 和 ascending 控制排序
    const response = await axios.get('https://gamma-api.polymarket.com/markets', {
      params: {
        limit: limit,
        active: closed === 'true' ? 'false' : 'true', // 进行中为 true，完结为 false
        closed: closed, // 是否完结
        order: 'id',    // 按 ID 排序通常能拿到最及时的更新
        ascending: 'false'
      },
      timeout: 10000 
    });

    if (!response.data || response.data.length === 0) {
      console.warn('后端警告：Polymarket 接口返回空数据');
    }

    res.status(200).json(response.data);
  } catch (error) {
    // 报错相关代码：将详细错误通过 JSON 返回，方便前端调试
    console.error('Vercel 代理崩溃:', error.message);
    res.status(500).json({ 
      error: 'Backend Failure', 
      message: error.message,
      status: error.response ? error.response.status : 'No Response'
    });
  }
};
