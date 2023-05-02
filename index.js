const express = require('express');
const mongoose = require('mongoose');

const BlogModel = require('./models/BlogModel');
const { MongoClient } = require('mongodb');
var bodyParser = require('body-parser')
require('dotenv').config()


const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));


const uri =process.env.MONGO_URL


const client = new MongoClient(uri);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error(err));

// Create a new blog post
app.post('/blogs', async (req, res) => {
  try {
    const blog = new BlogModel({
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      tags: req.body.tags
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all blog posts
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await BlogModel.find({});
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get a specific blog post by ID
app.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
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
app.post('/blogs/:id/comments', async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
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

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
