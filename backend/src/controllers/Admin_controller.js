const userSchema = require('../models/user_schema')
const mongoose = require('mongoose');

module.exports = {
    getAllUsers : async(req,res)=>{
        let users = await userSchema.find({role : 'user'})
        if(users){
            res.status(200).send({users:users})
        }else{
            res.status(200).send({message : 'No users found'})
        }
    },
    getUserData : async(req,res)=>{
        if(req.query.id.length >10){
            let user = await userSchema.findOne({_id : req.query.id})
            if(user){
                res.status(200).send({user : user})
            }else{
                res.status(400).send({error : 'no users'})
            }
        }else{
            res.status(400).send({error : 'no users'})
        }
    },
    EditUserData : async(req,res)=>{

        console.log(req.body)
        await userSchema.updateOne(
            {
                _id : mongoose.Types.ObjectId(req.body.userId)
            },
            {
                $set : {
                    email : req.body.email,
                    userName : req.body.userName
                }
            }
        )
        res.status(200).send({updated : true})
    },
    deleteAUser : async(req,res)=>{
        
        if(req.query.id.length >10){
            
            await userSchema.deleteOne(
                {
                    _id : mongoose.Types.ObjectId(req.query.id)
                },
            )

            let users = await userSchema.find({role : 'user'})
            if(users){
                res.status(200).send({users:users})
            }else{
                res.status(200).send({message : 'No users found'})
            }
        }else{
            res.status(400).send({error : 'no users'})
        } 
    },
    searchUser : async(req,res)=>{
        let users = await userSchema.find({userName: { '$regex': `(\s+${req.query.name}|^${req.query.name})`, '$options': 'i' },role:'user'}, {})
        if(users[0]){
            res.send({users:users})
        }else{
         users = await userSchema.find({category: { '$regex': `(\s+${req.query.name}|^${req.query.name})`, '$options': 'i' }}, {})
         res.send({users:users})
        }  
    },
}