export default async function handler(req, res) {
  const { search } = req.query;
  const API_KEY = process.env.NEWS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ 
      status: 'error',
      message: 'API key is missing. Please check your environment variables.' 
    });
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&language=en&sortBy=publishedAt&pageSize=25&apiKey=${API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    const data = await response.json();
    
    if (data.status === 'error') {
      return res.status(400).json({
        status: 'error',
        message: data.message || 'NewsAPI error occurred'
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to fetch news. Please try again later.' 
    });
  }
} 