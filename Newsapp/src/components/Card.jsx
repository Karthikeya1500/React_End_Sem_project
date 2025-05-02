import React from 'react';

const Card = ({ data }) => {
  console.log('Card received data:', data);

  if (!data) {
    console.log('No data received in Card component');
    return null;
  }

  if (!data.urlToImage) {
    console.log('No image URL for article:', data.title);
    return null;
  }

  return (
    <div className="card">
      <img src={data.urlToImage} alt={data.title} />
      <div className="content">
        <a
          className="title"
          onClick={() => window.open(data.url)}
        >
          {data.title}
        </a>
        <p>{data.description}</p>
        <button onClick={() => window.open(data.url)}>
          Read More
        </button>
      </div>
    </div>
  );
};

export default Card;
