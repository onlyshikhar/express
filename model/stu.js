let mongoose = require ('mongoose')

let Schema= mongoose.Schema
 
let Stud = new Schema({
	name:String,
	id:Number
})

module.exports=mongoose.model('Student',Stud);
