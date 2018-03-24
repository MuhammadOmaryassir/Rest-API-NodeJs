var express = require('express')
var app = express()


var port = process.env.PORT || 3000

app.get('/', function(req,res){
    res.send('Welcome to our first API')
})


app.listen(port,function(err){
    if (err) {
        console.log(err)
    }
    console.log('running on port: '+ port)
    
})