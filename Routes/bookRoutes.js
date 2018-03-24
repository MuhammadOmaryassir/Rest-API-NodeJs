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

    // Book Middleware to find a book by id
    bookRouter.use('/:bookId', function(req,res,next){
        Book.findById(req.params.bookId, function(err,book){
            if(err)
                res.status(500).send(err)
            else if(book)
            {
                req.book = book
                next()
            }
            else
            {
                res.status(404).send('no book found')
            }
        });
    });
    bookRouter.route('/:bookId')
    // get all the books in the DB
        .get(function(req,res){

            res.json(req.book)

        })
        // update a specific book
        .put(function(req,res){
            req.book.title = req.body.title
            req.book.author = req.body.author
            req.book.genre = req.body.genre
            req.book.read = req.body.read
            req.book.save(function(err){
                if(err)
                    res.status(500).send(err)
                else{
                    res.json(req.book)
                }
            })
        })
        // update a specific option or element  of the book data
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id

            for(var p in req.body)
            {
                req.book[p] = req.body[p]
            }

            req.book.save(function(err){
                if(err)
                    res.status(500).send(err)
                else{
                    res.json(req.book)
                }
            })
        })
        // delete book from the DB
        .delete(function(req,res){
            req.book.remove(function(err){
                if(err)
                    res.status(500).send(err)
                else{
                    res.status(204).send('Removed')
                }
            });
        });

    return bookRouter;

}

module.exports = routes