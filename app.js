const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan'); // gives information about requests
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;
// DB configuration
const config = {
  user: 'ngondolibrary',
  password: 'Ng0nd0lib',
  server: 'ngondolibrary.database.windows.net',
  database: 'MyLibrary',
  // because of windows Azure
  options: {
    encrypt: true
  }
};

// Connect to the DB
sql.connect(config).catch(err => debug(err));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public'))); // Will look for all static files to serve
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Relative import and resources of filepath to locate routes
const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }
];
const bookRouter = require('./src/routes/bookRoutes')(nav); // Conglomerates all routers to avoid repetition

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
