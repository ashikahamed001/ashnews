import { NEWS_API_KEY } from "./config";

const pool = require('./db');


export const insertArticle = async (topic, timestamp) => {
  const query = `INSERT INTO articles (title, timestamp) VALUES (?, ?)`;
  const values = [topic, timestamp];
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const getArticles = async topic => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
};