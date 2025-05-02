import React, { useState } from 'react';
import Card from './Card.jsx';
import { newsData } from '../data/newsData';

const News = () => {
  const [search, setSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Filter news based on search term and category
  const filteredNews = newsData.articles.filter(article => {
    const matchesSearch = search === "" || 
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = search === "" || article.category === search;
    
    return matchesSearch && matchesCategory;
  });

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    // Trigger search when button is clicked
    setSearch(search);
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="cardContainer">
      {[...Array(6)].map((_, index) => (
        <div className="card loading-skeleton" key={index}>
          <div className="skeleton-image"></div>
          <div className="content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <nav className="navbar">
        <h1 className="navbar-title">DailyDrop</h1>
        <div className="navbar-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search News"
              value={search}
              onChange={handleInput}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
          </div>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </nav>
      
      <div className="categoryBtn">
        <div className="buttonWrapper">
          <button onClick={() => setSearch('sports')} className="category-button sports-button">Sports</button>
          <button onClick={() => setSearch('politics')} className="category-button politics-button">Politics</button>
          <button onClick={() => setSearch('entertainment')} className="category-button entertainment-button">Entertainment</button>
          <button onClick={() => setSearch('health')} className="category-button health-button">Health</button>
          <button onClick={() => setSearch('fitness')} className="category-button fitness-button">Fitness</button>
          <button onClick={() => setSearch('technology')} className="category-button technology-button">Technology</button>
          <button onClick={() => setSearch('business')} className="category-button business-button">Business</button>
          <button onClick={() => setSearch('science')} className="category-button science-button">Science</button>
          <button onClick={() => setSearch('world')} className="category-button world-button">World</button>
          <button onClick={() => setSearch('india')} className="category-button india-button">India</button>
          {/* Duplicate buttons for seamless scrolling */}
          <button onClick={() => setSearch('sports')} className="category-button sports-button">Sports</button>
          <button onClick={() => setSearch('politics')} className="category-button politics-button">Politics</button>
          <button onClick={() => setSearch('entertainment')} className="category-button entertainment-button">Entertainment</button>
          <button onClick={() => setSearch('health')} className="category-button health-button">Health</button>
          <button onClick={() => setSearch('fitness')} className="category-button fitness-button">Fitness</button>
          <button onClick={() => setSearch('technology')} className="category-button technology-button">Technology</button>
          <button onClick={() => setSearch('business')} className="category-button business-button">Business</button>
          <button onClick={() => setSearch('science')} className="category-button science-button">Science</button>
          <button onClick={() => setSearch('world')} className="category-button world-button">World</button>
          <button onClick={() => setSearch('india')} className="category-button india-button">India</button>
        </div>
      </div>
      
      <div className="news-container">
        {filteredNews.length > 0 ? (
          <div className="cardContainer">
            {filteredNews.map((article, index) => (
              <Card key={index} data={article} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No news articles found. Try a different search term.</p>
          </div>
        )}
      </div>
      <div className="footer">
        <p>© 2025 DailyDrop. All rights reserved.</p>
      </div>
    </div>
  );
};

export default News;
