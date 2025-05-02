import React from 'react';

const Card = ({ data }) => {
  const handleReadMore = (e) => {
    e.preventDefault();
    if (data.url) {
      window.open(data.url, '_blank', 'noopener,noreferrer');
    }
  };

  const defaultImage = 'https://via.placeholder.com/300x200?text=No+Image';
  const imageUrl = data.urlToImage || defaultImage;

  return (
    <div className="card">
      <img 
        src={imageUrl} 
        alt={data.title} 
        className="card-image"
        onError={(e) => {
          e.target.src = defaultImage;
        }}
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
