const express = require('express');
const bookRouter = express.Router(); // Conglomerates all routers to avoid repetition

// Books example data to render
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
  res.render('books', {
    title: 'My Library',
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }
    ],
    books
  });
});

bookRouter.route('/single').get((req, res) => {
  res.send('Hello single book!');
});

module.exports = bookRouter;
