import React from 'react';

const Card = ({ data }) => {
  const handleReadMore = () => {
    if (data.url) {
      window.open(data.url, '_blank');
    }
  };

  return (
    <div className="card">
      <img src={data.urlToImage} alt={data.title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{data.title}</h2>
        <p className="card-description">{data.description}</p>
        <button onClick={handleReadMore} className="read-more-button">
          Read More
        </button>
      </div>
    </div>
  );
};

export default Card;
