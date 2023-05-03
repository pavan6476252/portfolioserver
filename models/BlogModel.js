const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const {marked} = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window)



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
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  tags: {
    type: [String]
  },
  sanatizedHtml: {
    type: String,
    required: true
  },
  comments: [{
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }]
});


BlogSchema.pre('validate', function (next) {
  if (this.title) {

    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  if (this.markdown) {
    this.sanatizedHtml = dompurify.sanitize(marked.parse(this.markdown));
  }

  next();

});

// Create a model for the schema

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;
