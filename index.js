const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config()
const methodOverride = require('method-override');
const blogsRouter = require('./routes/blogsRoute');


const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));


app.use(blogsRouter);
app.use(methodOverride('_method'))

const uri = process.env.MONGO_URL

mongoose.connect(uri, {
  useNewUrlParser: true, useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error(err));

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
