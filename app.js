const express = require('express');
const morgan = require('morgan');
const {join} = require('path');

const models = require('./models');


const PORT = 1562;
const app = express();


// logging middleware
app.use(morgan('dev'));

// static router
app.use(express.static(join(__dirname, 'public')));

// body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// main router
app.use(require('./routes'));


app.use((req, res) => {
  res.status(404).send(`Requested page '${req.url}'' does not exists`);
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({err});
});


const init = async () => {
  await models.init();

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

};


init();
