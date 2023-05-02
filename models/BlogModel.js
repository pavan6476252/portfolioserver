const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for the blog site
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: [String]
  },
  comments: [{
    author: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }]
});

// Create a model for the schema

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;
