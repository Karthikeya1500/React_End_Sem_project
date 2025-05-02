const API_KEY = '43c7bd4efad143be9de9f35313e3c3be';

export default async function handler(req, res) {
  const { search } = req.query;

  try {
    console.log('Fetching news for:', search);
    const url = `https://newsapi.org/v2/everything?q=${search}&language=en&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`;
    console.log('API URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      return res.status(response.status).json({ 
        status: 'error',
        message: errorText 
      });
    }

    const data = await response.json();
    
    if (data.status === 'error') {
      return res.status(400).json({ 
        status: 'error',
        message: data.message 
      });
    }

    if (!data.articles || data.articles.length === 0) {
      // Try fallback search
      const fallbackUrl = `https://newsapi.org/v2/everything?q=news&language=en&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`;
      const fallbackResponse = await fetch(fallbackUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      });

      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        if (fallbackData.articles && fallbackData.articles.length > 0) {
          return res.status(200).json(fallbackData);
        }
      }
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      status: 'error',
      message: 'Failed to fetch news' 
    });
  }
} 