import { createContext, useState, useEffect } from 'react';
import { newsData } from '../data/newsData';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Always use local data first
        setNews(newsData.articles);
        
        // Then try to fetch fresh data in production
        if (!import.meta.env.DEV) {
          const apiKey = import.meta.env.VITE_NEWS_API_KEY;
          if (!apiKey) {
            console.error('API key is missing');
            return;
          }

          try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.status === 'error') {
              console.error('News API Error:', data.message);
              return;
            }
            if (data.articles && data.articles.length > 0) {
              setNews(data.articles);
            }
          } catch (apiError) {
            console.error('API fetch failed:', apiError.message);
            // Continue using local data if API fails
          }
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch news');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading, error }}>
      {children}
    </NewsContext.Provider>
  );
}; 