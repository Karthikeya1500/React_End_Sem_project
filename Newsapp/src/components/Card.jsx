import React from 'react';

const Card = ({ data }) => {
  const handleReadMore = (e) => {
    e.preventDefault();
    if (data.url) {
      window.open(data.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="card">
      <img 
        src={data.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'} 
        alt={data.title} 
        className="card-image" 
      />
      <div className="card-content">
        <h2 className="card-title">{data.title}</h2>
        <p className="card-description">{data.description}</p>
        <div className="card-footer">
          <button 
            onClick={handleReadMore} 
            className="read-more-button"
            aria-label="Read more about this article"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
