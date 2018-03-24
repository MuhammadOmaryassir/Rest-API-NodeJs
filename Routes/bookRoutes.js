var express = require('express')

routes = function (Book) {

    var bookRouter = express.Router() // define express router called book router

    // get and post  the books from and to  the db  with filtering option
    bookRouter.route('/')
        .get(function (req, res) {

            var query = {};

            if (req.query.genre) {
                query.genre = req.query.genre
            }
            Book.find(query, function (err, books) {
                if (err)
                    res.status(500).send(err)
                else
                    res.json(books)
            })
        })
        // post a new book and save it to the Database
        .post(function (req, res) {
            var book = new Book(req.body);


            book.save();
            res.status(201).send(book);

        })

    // get one book using the book id 
    bookRouter.route('/:bookId')
        .get(function (req, res) {


            Book.findById(req.params.bookId, function (err, book) {
                if (err)
                    res.status(500).send(err)
                else
                    res.json(book)
            });
        });

    return bookRouter;

}

module.exports = routes