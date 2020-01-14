const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan'); // gives information about requests
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router(); // Conglomerates all routers to avoid repetition

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public'))); // Will look for all static files to serve
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// All routers related to book
bookRouter.route('/').get((req, res) => {
  res.send('Hello books');
});

bookRouter.route('/single').get((req, res) => {
  res.send('Hello single book!');
});

// Encapsulates all book router routes to a single route
app.use('/books', bookRouter);
app.get('/', (req, res) => {
  // res.send("Hello from my library app");
  // res.sendFile(path.join(__dirname, 'views', 'index.html'));
  res.render('index', {
    title: 'My Library',
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }
    ]
  });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
