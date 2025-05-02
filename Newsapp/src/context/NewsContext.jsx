import { createContext, useState, useEffect } from 'react';
import { newsData } from '../data/newsData';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      // Always use local data
      setNews(newsData.articles);
      setError(null);
    } catch (err) {
      setError('Failed to load news');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading, error }}>
      {children}
    </NewsContext.Provider>
  );
}; 