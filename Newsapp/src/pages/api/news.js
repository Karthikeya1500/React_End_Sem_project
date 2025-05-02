export default async function handler(req, res) {
  const { search } = req.query;
  const API_KEY = 'df82c53a843c192a170a260471b8bbe5';

  console.log('API Route called with search:', search);
  console.log('Using API Key:', API_KEY);

  try {
    const url = `https://newsapi.org/v2/everything?q=${search}&language=en&sortBy=publishedAt&pageSize=25&apiKey=${API_KEY}`;
    console.log('Fetching from URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

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
    console.error('Error in API route:', error);
    res.status(500).json({ 
      status: 'error',
      message: error.message || 'Failed to fetch news. Please try again later.' 
    });
  }
} 