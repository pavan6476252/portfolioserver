const mongoose = require('mongoose');

const BlogModel = require('../models/BlogModel');
 

const express = require('express')
const router = express.Router();


// Create a new blog post
router.post('/blogs', async (req, res) => {
    try {
      const blog = new BlogModel({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        markdown:req.body.markdown,
        tags: req.body.tags
      });
  
      await blog.save();
      res.redirect(`/blogs/${blog.slug}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
  // Get all blog posts
  router.get('/blogs', async (req, res) => {
    try {
      const blogs = await BlogModel.findOne({});
      res.json(blogs);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
  // Get a specific blog post by ID
  router.get('/blogs/:slug', async (req, res) => {
    try {
      const blog = await BlogModel.find({slug :req.params.slug});
      if (!blog) {
        return res.status(404).send('Blog post not found');
      }
      res.json(blog);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
  // Add a comment to a blog post
  router.post('/blogs/:slug/comments', async (req, res) => {
    try {
      const blog = await BlogModel.findById(req.params.slug);
      if (!blog) {
        return res.status(404).send('Blog post not found');
      }
      const comment = {
        author: req.body.author,
        content: req.body.content
      };
      blog.comments.push(comment);
      await blog.save();
      res.status(201).json(blog);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });


  //Delete a post 

  router.delete('/blogs/:id',async (req,res)=>{
    await BlogModel.findByIdAndDelete(req.params.id);
    res.redirect('/blogs');
  })
  
 


module.exports = router;