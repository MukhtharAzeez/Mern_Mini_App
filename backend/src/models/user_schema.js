const mongoose = require('mongoose');
const Schema=mongoose.Schema
const bcrypt = require('bcrypt');

const userSchema = new Schema({
   firstName : {
    type : String,
    required : true,
    trim : true,
    min : 4,
    max : 20,
   },
   lastName : {
    type : String,
    required : true,
    trim : true,
    min : 4,
    max : 20,
   },
   userName : {
    type : String,
    required : true,
    trim : true,
    unique : true,
    index : true,
    lowerCase : true
   },
   email : {
    type : String,
    required : true,
    trim : true,
    unique : true,
    lowerCase : true,
   },
   hash_password : {
    type : String,
    required : true,
   },
   role : {
    type : String,
    enum : ['admin','user'],
    default : 'user',
   },
   contactNumber : {
    type : Number,
    // required : true,
   },
   profilePicture : {
    type : String,
   },
   image :{
    type : String,
   }
},{timestamps : true})

userSchema.virtual('password').set(function(password){
    this.hash_password = bcrypt.hashSync(password,10);
})

userSchema.methods = {
    authenticate : function(password){
        return bcrypt.compareSync(password,this.hash_password);
    }
}

module.exports =mongoose.model('user',userSchema)