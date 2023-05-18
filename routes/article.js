const express = require('express');
const router = express.Router();
const passport = require('passport');
const articleController = require('../controllers/articleController');

// Create a new article
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    articleController.createArticle
  );
  
  // Get all articles
  router.get('/', articleController.getAllArticles);
  
  // Get a specific article
  router.get('/:id', articleController.getArticle);
  
  // Update an article
  router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    articleController.updateArticle
  );
  

  // Delete an article
  router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    articleController.deleteArticle
  );
  
  module.exports = router;
