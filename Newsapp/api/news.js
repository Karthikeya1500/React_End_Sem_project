export default async function handler(req, res) {
  const { search } = req.query;
  const API_KEY = process.env.NEWS_API_KEY;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
} 