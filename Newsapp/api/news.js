import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req, res) {
  const { search } = req.query;
  
  // Try different environment variable names
  const API_KEY = process.env.NEWS_API_KEY || 
                 process.env.VITE_NEWS_API_KEY || 
                 process.env.REACT_APP_NEWS_API_KEY;

  console.log('Environment variables:', {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    VITE_NEWS_API_KEY: process.env.VITE_NEWS_API_KEY,
    REACT_APP_NEWS_API_KEY: process.env.REACT_APP_NEWS_API_KEY
  });

  // Debug logs
  console.log('Request received:', { search, hasApiKey: !!API_KEY });

  if (!API_KEY) {
    return res.status(500).json({ 
      status: 'error',
      message: 'API key is missing. Please check your environment variables in Vercel settings.' 
    });
  }

  try {
    const url = `https://newsapi.org/v2/everything?q=${search}&language=en&sortBy=publishedAt&pageSize=25&apiKey=${API_KEY}`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    console.log('API Response:', data);
    
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