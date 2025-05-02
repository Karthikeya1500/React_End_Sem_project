const API_KEY = '43c7bd4efad143be9de9f35313e3c3be';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { search } = req.query;
    
    if (!search) {
      return res.status(400).json({ error: 'Search parameter is required' });
    }

    console.log('Fetching news for:', search);
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(search)}&language=en&sortBy=publishedAt&pageSize=100`;
    console.log('API URL:', url);

    const response = await fetch(url, {
      headers: {
        'X-Api-Key': API_KEY
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NewsAPI Error:', errorText);
      return res.status(response.status).json({ error: 'Failed to fetch news' });
    }

    const data = await response.json();
    
    // If no articles found, try a fallback search
    if (!data.articles || data.articles.length === 0) {
      const fallbackUrl = `https://newsapi.org/v2/top-headlines?country=us&language=en&pageSize=100`;
      const fallbackResponse = await fetch(fallbackUrl, {
        headers: {
          'X-Api-Key': API_KEY
        }
      });
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        return res.status(200).json(fallbackData);
      }
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 