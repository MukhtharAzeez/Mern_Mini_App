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

router.get('/home',userController.getHome)

router.get('/userProfile',userMiddleware.verifyToken,userController.getUserProfile)

router.post('/editProfilePhoto',userMiddleware.verifyToken,userController.postEditProfile)

router.post('/addProduct',userMiddleware.verifyToken,userController.postAddProduct)

router.get('/getAllProducts',userController.getAllProducts)

router.get('/logout',userController.logout)

module.exports = router;