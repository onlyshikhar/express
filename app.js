var express=require('express')
var app=express()
var path=require('path')
var bodyParser=require('body-parser')
var router=require('./route/route')
let student = require('./route/student')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',router)
app.use('/student',student)

app.listen(3000)
console.log("port started")

module.exports=app;