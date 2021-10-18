const express = require('express');
const ejs = require('ejs');
const articlesEntity = require('../database-entities/articles');

const router = express.Router();

const getArticles = async (req, res) => {
  try {
    const articles = await articlesEntity.getArticles();
    const displayArticles = await ejs.renderFile('./src/views/articles.ejs', { articles });
    res.send(displayArticles);
  } catch (e) {
    res.status(500).json({ e });
  }
};

router.get('/articles', getArticles);

module.exports = router;
