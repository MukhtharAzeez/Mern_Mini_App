const mongoose = require('mongoose');
const userSchema = require('../models/user_schema')
const productSchema = require('../models/product_schema')
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
                    const token = jwt.sign({data},process.env.JWT_SECRET,{expiresIn : 600});
                    
                    return res.cookie("jwt", token, {
                        httpOnly: false,
                        maxAge: 60*1000*10,
                    }).status(200).send({ auth: true, token: token, user: data.userName });

                    
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
                    const token = jwt.sign({data},process.env.JWT_SECRET,{expiresIn : 600});
                    
                   if(data.role=='user'){
                    return res.cookie("jwt", token, {
                        httpOnly: false,
                        maxAge: 60*1000*10,
                    }).status(200).send({ auth: true, token: token, user: data.userName });
                   }else{
                    return res.cookie("adminJwt", token, {
                        httpOnly: false,
                        maxAge: 60*1000*10,
                    }).status(200).send({ admin: true, message : 'Admin' });
                   }

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
    },
    getUserProfile : async(req,res)=>{
        const jwtToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET)
        userId = jwtToken.data._id;
        userSchema.findOne({ _id: userId }).then((data) => {
            res.status(200).send(data)
        })
    },
    postEditProfile: async (req, res) => {
        const jwtToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET)
        const userId = jwtToken.data._id
        let user = await userSchema.findOne({ _id: userId })
        if (!user) {
            res.status(500).send({ error: "no user" })
        } else {
            userSchema.updateOne(
                { _id: userId },
                {
                    $set: {
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        userName : req.body.userName,
                        image: req.body.image
                    }
                }).then((err,data) => {
                    res.status(200).send({ changed: true })
                })
        }
    },
    postAddProduct : async(req,res)=>{
        const {
            name,
            category,
            price,
            imageUrl,
        }=req.body;

        const _product = new productSchema({
            name,
            category,
            price,
            image:imageUrl,
            
        }).save((err,data)=>{
            if(err){
                console.log(err)
                return res.send({productAdd:false})
            }
            if(data){    
                return res.status(200).send({ productAdd : true });      
            }
        })
    },
    getAllProducts : async(req,res)=>{
        try {
            let products = await productSchema.find({})
            res.status(200).send({error:false,products:products})
        } catch (error) {
            res.status(400).send({error:true})
        }
    },
    logout : async(req,res)=>{
        const token = jwt.sign({data:'mukhthar'},process.env.JWT_SECRET,{expiresIn : 600});


        res.cookie("jwt", token, {
            httpOnly: false,
            maxAge: 60*1000*10,
        }).send({status:true})
    }
}