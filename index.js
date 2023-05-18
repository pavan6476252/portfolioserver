const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');


const articles = require('./routes/articles');
const auth = require('./routes/auth')

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db = process.env.MONGO_URL

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use(passport.initialize());
require('./config/passport')(passport);

app.use('./api/auth', auth);
app.use('/api/articles', articles);


app.listen(port, () => console.log(`Server running on port ${port}`));
