var express = require('express'),
    mongoose = require('mongoose')

// connect to the Database
var db = mongoose.connect('mongodb://localhost/bookAPI')
var Book = require('./models/bookModel') // import the Book Schema
var app = express()

var port = process.env.PORT || 3000 // port number


var bookRouter = express.Router() // define express router called book router

// get the books from the db  with filtering option
bookRouter.route('/Books')
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
        });
    });

// get one book using the book id 
bookRouter.route('/Books/:bookId')
    .get(function (req, res) {


        Book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.status(500).send(err)
            else
                res.json(book)
        });
    });


app.use('/api', bookRouter) // express middle ware to handle Book Router
// home page
app.get('/', function (req, res) {
    res.send('Welcome to our API')
})


app.listen(port, function (err) {
    if (err) {
        console.log(err)
    }
    console.log('running on port: ' + port)

})