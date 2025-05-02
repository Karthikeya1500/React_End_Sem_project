import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.VITE_NEWS_API_KEY;
const API_URL = 'https://newsapi.org/v2/top-headlines?country=us';

async function fetchNews() {
  try {
    const response = await fetch(`${API_URL}&apiKey=${API_KEY}`);
    const data = await response.json();
    
    const newsData = {
      articles: data.articles
    };

    const outputPath = path.join(__dirname, '../src/data/newsData.js');
    const content = `export const newsData = ${JSON.stringify(newsData, null, 2)};`;
    
    fs.writeFileSync(outputPath, content);
    console.log('News data saved successfully!');
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

fetchNews(); 