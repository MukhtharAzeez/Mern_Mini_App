const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_auth_controller')
const userMiddleware = require('../middlewares/user_auth_middleware')

router.get('/',(req,res)=>{
    // res.send('hello world')
    res.status(200).json({
        message : 'Hello From Server'
    })
})

router.post('/signup',userController.postSignUp)

router.post('/login',userController.postSignIn)

router.get('/home',userMiddleware.verifyToken,userController.getHome)

module.exports = router;