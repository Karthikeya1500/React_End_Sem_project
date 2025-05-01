export default async function handler(req, res) {
  const { q } = req.query;
  const API_KEY = process.env.NEWS_API_KEY;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in news API route:', error);
    res.status(500).json({ error: 'Failed to fetch news data' });
  }
} 