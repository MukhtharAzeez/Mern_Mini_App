const mongoose = require('mongoose');
const userSchema = require('../models/user_schema')
const jwt = require('jsonwebtoken');


module.exports = {
    postSignUp : (req,res)=>{
        userSchema.findOne({email : req.body.email}).exec((error,user)=>{
            if(user) return res.status(400).json({
                message : 'User already exists'
            });
            let userName = req.body.firstName +''+ req.body.lastName
            const {
                firstName,
                lastName,
                email,
                password,
            }=req.body;
    
            const _user = new userSchema({
                firstName,
                lastName,
                email,
                password,
                userName
            }).save((err,data)=>{
                if(err){
                    return res.send({userSignup:false})
                }
                if(data){
                    const token = jwt.sign({_id : data._id},process.env.JWT_SECRET,{expiresIn : 60});
                    req.session.token = token

                    return res.send({userSignup:true})
                }
            })
    
        })
    },
    postSignIn : async(req,res)=>{
       
        if(req.body.email.length==0 || req.body.password.length == 0){
            return res.send({userLogin : false,message : 'Fill all the fields'})
        }
        await userSchema.findOne({email:req.body.email}).exec((err,data)=>{
            if(err){
                return res.status(400).json({
                    message : 'something went wrong'
                })
            }

            if(data){

                if(data.authenticate(req.body.password)){
                    const token = jwt.sign({_id : data._id},process.env.JWT_SECRET,{expiresIn : 60});
                    // res.setHeader('authorization', 'Bearer ' + token);
                    req.session.token = token
                    return res.send({userLogin : true,user : data.userName})
                }else{
                    return res.send({userLogin : false,message : 'Password is invalid'})
                }
                
            }else{
                return res.send({userLogin : false,message : "You doesn't have an account"})
            }
            
        })
    },
    getHome : (req,res)=>{
        return res.status(200).json({
            message : 'User Home'
        })
    }
}