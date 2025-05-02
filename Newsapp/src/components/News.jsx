import React, { useEffect, useState } from 'react';
import Card from './Card.jsx';

const News = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const getData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch news data');
      }
      const jsonData = await response.json();
      console.log(jsonData.articles);
      let dt = jsonData.articles.slice(0, 25);
      setNewsData(dt);
    } catch (error) {
      console.error('Error fetching news:', error);
      // You might want to show an error message to the user here
    }
  };

  useEffect(() => {
    getData();
  }, [search]); 

  const handleInput = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const userInput = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <nav className="navbar">
        <div>
          <h1 className="navbar-title">DailyDrop</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
              </svg>
            )}
          </button>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search News"
              value={search}
              onChange={handleInput}
              className="search-input"
            />
            <button 
              onClick={getData}
              className="search-button"
            >
              Search
            </button>
          </div>
        </div>
      </nav>
      
      <div className="categoryBtn">
        <div className="buttonWrapper">
          <button 
            onClick={() => setSearch('sports')}
            className="category-button sports-button"
          >
            Sports
          </button>
          <button 
            onClick={() => setSearch('politics')}
            className="category-button politics-button"
          >
            Politics
          </button>
          <button 
            onClick={() => setSearch('entertainment')}
            className="category-button entertainment-button"
          >
            Entertainment
          </button>
          <button 
            onClick={() => setSearch('health')}
            className="category-button health-button"
          >
            Health
          </button>
          <button 
            onClick={() => setSearch('fitness')}
            className="category-button fitness-button"
          >
            Fitness
          </button>
          <button 
            onClick={() => setSearch('technology')}
            className="category-button technology-button"
          >
            Technology
          </button>
          <button 
            onClick={() => setSearch('business')}
            className="category-button business-button"
          >
            Business
          </button>
          <button 
            onClick={() => setSearch('science')}
            className="category-button science-button"
          >
            Science
          </button>
          <button 
            onClick={() => setSearch('world')}
            className="category-button world-button"
          >
            World
          </button>
          <button 
            onClick={() => setSearch('india')}
            className="category-button india-button"
          >
            India
          </button>
          {/* Duplicate buttons for seamless scrolling */}
          <button 
            onClick={() => setSearch('sports')}
            className="category-button sports-button"
          >
            Sports
          </button>
          <button 
            onClick={() => setSearch('politics')}
            className="category-button politics-button"
          >
            Politics
          </button>
          <button 
            onClick={() => setSearch('entertainment')}
            className="category-button entertainment-button"
          >
            Entertainment
          </button>
          <button 
            onClick={() => setSearch('health')}
            className="category-button health-button"
          >
            Health
          </button>
          <button 
            onClick={() => setSearch('fitness')}
            className="category-button fitness-button"
          >
            Fitness
          </button>
          <button 
            onClick={() => setSearch('technology')}
            className="category-button technology-button"
          >
            Technology
          </button>
          <button 
            onClick={() => setSearch('business')}
            className="category-button business-button"
          >
            Business
          </button>
          <button 
            onClick={() => setSearch('science')}
            className="category-button science-button"
          >
            Science
          </button>
          <button 
            onClick={() => setSearch('world')}
            className="category-button world-button"
          >
            World
          </button>
          <button 
            onClick={() => setSearch('india')}
            className="category-button india-button"
          >
            India
          </button>
        </div>
      </div>
      
      <div>{newsData ? <Card data={newsData} /> : null}</div>
      <div className="footer">
        <p>© 2025 DailyDrop. All rights reserved.</p>
      </div>
    </div>
  );
};

export default News;
