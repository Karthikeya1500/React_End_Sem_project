import React, { useEffect, useState } from 'react';
import Card from './Card.jsx';

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const API_KEY = 'e3ccd713f29343afb68f17e5d555e61a';

  const getData = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
    );
    const jsonData = await response.json();
    console.log(jsonData.articles);
    let dt = jsonData.articles.slice(0, 25);
    setNewsData(dt);
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
      <nav>
        <div>
          <h1 style={{fontSize: "25px",color: "white"}}>DailyDrop</h1>
        </div>
        <ul style={{ display: 'flex', gap: '11px' }}>
          
          
        </ul>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInput}
          />
          <button onClick={getData}>Search</button>
        </div>
      </nav>
      
      <div className="categoryBtn">
  <div className="buttonWrapper">
    <button onClick={() => setSearch('sports')}>Sports</button>
    <button onClick={() => setSearch('politics')}>Politics</button>
    <button onClick={() => setSearch('entertainment')}>Entertainment</button>
    <button onClick={() => setSearch('health')}>Health</button>
    <button onClick={() => setSearch('fitness')}>Fitness</button>
    <button onClick={() => setSearch('technology')}>Technology</button>
    <button onClick={() => setSearch('business')}>Business</button>
    <button onClick={() => setSearch('science')}>Science</button>
    <button onClick={() => setSearch('world')}>World</button>
    <button onClick={() => setSearch('india')}>India</button>

    {/* Duplicate buttons for seamless scrolling */}
    <button onClick={() => setSearch('sports')}>Sports</button>
    <button onClick={() => setSearch('politics')}>Politics</button>
    <button onClick={() => setSearch('entertainment')}>Entertainment</button>
    <button onClick={() => setSearch('health')}>Health</button>
    <button onClick={() => setSearch('fitness')}>Fitness</button>
    <button onClick={() => setSearch('technology')}>Technology</button>
    <button onClick={() => setSearch('business')}>Business</button>
    <button onClick={() => setSearch('science')}>Science</button>
    <button onClick={() => setSearch('world')}>World</button>
    <button onClick={() => setSearch('india')}>India</button>
  </div>
</div>
      
      <div>{newsData ? <Card data={newsData} /> : null}</div>
      <div className="footer">
        <p style={{color:"white"}}>© 2025 DailyDrop. All rights reserved.</p>
        
        
        </div>
    </div>
    
    
  );
};

export default Newsapp;
