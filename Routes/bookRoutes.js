var express = require('express')

routes = function (Book) {

    var bookRouter = express.Router() // define express router called book router

    var bookController = require('../Controllers/bookController')(Book)
    bookRouter.route('/')

        // get all the data in the Data base
        .get(bookController.get)


        // post a new book and save it to the Database
        .post(bookController.post)


    // Book Middleware to find a book by id
    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.status(500).send(err)
            else if (book) {
                req.book = book
                next()
            } else {
                res.status(404).send('no book found')
            }
        });
    });
    bookRouter.route('/:bookId')
        // get a book by it's id
        .get(function (req, res) {

            var returnBook = req.book.toJSON()

            returnBook.links = {};
            var newLink = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre
            returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20')
            res.json(returnBook)

        })
        // update a specific book
        .put(function (req, res) {
            req.book.title = req.body.title
            req.book.author = req.body.author
            req.book.genre = req.body.genre
            req.book.read = req.body.read
            req.book.save(function (err) {
                if (err)
                    res.status(500).send(err)
                else {
                    res.json(req.book)
                }
            })
        })
        // update a specific option or element  of the book data
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id

            for (var p in req.body) {
                req.book[p] = req.body[p]
            }

            req.book.save(function (err) {
                if (err)
                    res.status(500).send(err)
                else {
                    res.json(req.book)
                }
            })
        })
        // delete book from the DB
        .delete(function (req, res) {
            req.book.remove(function (err) {
                if (err)
                    res.status(500).send(err)
                else {
                    res.status(204).send('Removed')
                }
            });
        });

    return bookRouter;

}

module.exports = routes