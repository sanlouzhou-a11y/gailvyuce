export default async function handler(req, res) {
  const url = `https://gamma-api.polymarket.com${req.url}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      res.status(response.status).send('Error fetching data');
      return;
    }
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error' });
  }
}
