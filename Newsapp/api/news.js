import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req, res) {
  const { search } = req.query;
  const API_KEY = 'df82c53a843c192a170a260471b8bbe5';

  try {
    const url = `https://newsapi.org/v2/everything?q=${search}&language=en&sortBy=publishedAt&pageSize=25&apiKey=${API_KEY}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

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