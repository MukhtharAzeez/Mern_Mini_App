const mongoose = require('mongoose');
const Schema=mongoose.Schema

const productSchema = new Schema({
   name : {
    type : String,
    required : true,
    trim : true,
   
   },
   category : {
    type : String,
    required : true,
    trim : true,
   
   },
   price : {
    type : Number,
    required : true,
    
   },
   
   image :{
    type : String,
   }
  
},{timestamps : true})


module.exports =mongoose.model('product',productSchema)