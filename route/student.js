let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let mongoose = require ('mongoose')

let Student=require('../model/stu');


let db ='mongodb://localhost/first';
mongoose.connect(db);

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: true
}))

//find
router.get('/find',(req,res)=>{
	Student.find((err, Student)=>{
		if(err){
			res.send('error');
		}
		else{
			res.json(Student);
		}
	});
});
/*
//findone
router.get('/find:id',(req,res)=>{
	Student.findOne({
		_id:req.params.id
	})
	.exec((err,Student)=>{
		if(err){
			res.send('error occured')
		}
		else{
			res.json(Student);
		}
	})
})*/

//insert
router.post('/insert',(req,res)=>{
	let newStudent= new Student();

	newStudent.name= req.body.name;
	newStudent.id= req.body.id;
	newStudent.save(function(err,student){
		if(err){
			res.send('error');
		}
		else{
			res.json(student);
		}
	});
});

//update
router.put('/:name',function(req,res){
	Student.update({
		name: req.params.name
	},{$set:
		{name:req.body.name}},
		{upsert:true},
function(err,ss){
if(err){
	res.send('error')
}
else{
	res.json(ss);
}
})
})

//delete
router.delete('/:id',function(req,res){
	Student.remove({
		_id:req.params.id
	},function(err,student){
		if(err){
			res.send('error')
		}
		else{
			console.log("done")
			res.json(student)
		}
	})
})

module.exports=router;