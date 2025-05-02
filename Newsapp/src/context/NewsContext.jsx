import { createContext, useState } from 'react';
import { newsData } from '../data/newsData';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news] = useState(newsData.articles);
  const [loading] = useState(false);
  const [error] = useState(null);

  return (
    <NewsContext.Provider value={{ news, loading, error }}>
      {children}
    </NewsContext.Provider>
  );
}; 