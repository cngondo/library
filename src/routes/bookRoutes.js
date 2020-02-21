const express = require('express');
const bookRouter = express.Router(); // Conglomerates all routers to avoid repetition
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
  const books = [
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Nev Nikolayovich',
      read: false
    },
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Nev Nikolayovich',
      read: false
    },
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Nev Nikolayovich',
      read: false
    },
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Nev Nikolayovich',
      read: false
    },
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Nev Nikolayovich',
      read: false
    }
  ];

  // All routers related to book
  bookRouter.route('/').get((req, res) => {
    const request = new sql.Request();
    request
      .query('select * from books')
      .then(results => {
        debug(results);
        res.render('bookListView', {
          title: 'My Library',
          nav,
          books: results.recordset
        });
      })
      .catch(err => {
        debug(err);
      });
  });

  // Pass the book id to the single route
  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    res.render('bookView', {
      title: 'My Library',
      nav,
      book: books[id]
    });

    res.send('Hello Single book');
  });
  return bookRouter;
}
module.exports = router;
