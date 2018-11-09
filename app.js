const express = require('express');
const morgan = require('morgan');
const {join} = require('path');

const PORT = 1562;

const app = express();

// logging middleware
app.use(morgan('dev'));

// static router
app.use(express.static(join(__dirname, 'public')));

// body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use(require('./routes'));


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({err});
});

app.listen(PORT, 'localhost');
console.log(`Listening on port ${PORT}`);
