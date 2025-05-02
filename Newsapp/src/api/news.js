export default async function handler(req, res) {
  const { search } = req.query;
  const API_KEY = process.env.VITE_NEWS_API_KEY;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
} 