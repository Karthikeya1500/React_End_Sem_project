import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req, res) {
  const { search } = req.query;
  
  // Debug environment variables
  console.log('Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    NEWS_API_KEY: process.env.NEWS_API_KEY ? 'Present' : 'Missing'
  });

  const API_KEY = process.env.NEWS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ 
      status: 'error',
      message: 'API key is missing. Please check your environment variables in Vercel settings.' 
    });
  }

  try {
    const url = `https://newsapi.org/v2/everything?q=${search}&language=en&sortBy=publishedAt&pageSize=25&apiKey=${API_KEY}`;
    console.log('Fetching from URL:', url.replace(API_KEY, '***')); // Hide API key in logs

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    console.log('API Response status:', data.status);
    
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