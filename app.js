var express = require('express'),
    mongoose = require('mongoose')
    bodyParser = require('body-parser')

// connect to the Database
var db = mongoose.connect('mongodb://localhost/bookAPI')
var Book = require('./models/bookModel') // import the Book Schema
var app = express()


var port = process.env.PORT  // port number

// using body parser middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


bookRouter = require('./Routes/bookRoutes')(Book);


app.use('/api/Books', bookRouter) // express middleware to handle Book Router


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