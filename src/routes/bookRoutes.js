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
    // IIFE for the query to get data
    (async function query() {
      const request = new sql.Request();
      const { recordset } = await request.query('select * from books').catch(err => {
        debug('Database connection error', err);
      });
      res.render('bookListView', {
        title: 'My Library',
        nav,
        books: recordset
      });
    })();
  });

  // Pass the book id to the single route
  bookRouter
    .route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request
          .input('id', sql.Int, id) // Use input to get request parameters
          .query('select * from books where id = @id')
          .catch(err => {
            debug('Single record error', err);
          });
        [req.book] = recordset;
        next();
      })();
    })
    .get((req, res) => {
      res.render('bookView', {
        title: 'My Library',
        nav,
        book: req.book
      });
    });
  return bookRouter;
}
module.exports = router;
