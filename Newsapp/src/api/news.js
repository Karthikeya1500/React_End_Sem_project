const API_KEY = '43c7bd4efad143be9de9f35313e3c3be';

export async function fetchNews(search) {
  try {
    console.log('Fetching news for:', search);
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(search)}&language=en&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`;
    console.log('API URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    console.log('Number of articles in response:', data.articles?.length);

    if (data.status === 'error') {
      throw new Error(data.message || 'NewsAPI error occurred');
    }

    if (!data.articles || data.articles.length === 0) {
      console.log('No articles found in response');
      // Try fallback search
      const fallbackUrl = `https://newsapi.org/v2/top-headlines?country=us&language=en&pageSize=100&apiKey=${API_KEY}`;
      const fallbackResponse = await fetch(fallbackUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      });

      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        return fallbackData;
      }
    }

    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
} 