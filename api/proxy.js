export default async function handler(req, res) {
  const url = `https://gamma-api.polymarket.com${req.url}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');  // 可选：缓存1分钟
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy fetch error:', error);  // 这会在 Vercel 日志里显示
    res.status(502).json({ 
      error: 'Failed to fetch from Polymarket', 
      details: error.message 
    });
  }
}
