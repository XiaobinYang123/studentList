var fs=require('fs')
var express=require('express')
var router=require('./router')
var bodyParser = require('body-parser')



var app=express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// make sure the request page can access to these directory
app.use('/public/',express.static('./public/'))     //app.use(express.static('public'))
app.use('/node_modules/',express.static('./node_modules/'))
app.engine('html',require('express-art-template'))
app.use(router)

app.listen(9090,function(err){

	console.log('Running at port 9090')
})