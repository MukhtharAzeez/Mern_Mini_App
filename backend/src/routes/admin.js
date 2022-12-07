const express = require('express');
const router = express.Router();
const adminController = require('../controllers/Admin_controller')


router.get('/getAllUsers',adminController.getAllUsers)
router.get('/getUserData',adminController.getUserData)
router.post('/EditUserData',adminController.EditUserData)
router.get('/deleteAUser',adminController.deleteAUser)


module.exports = router;
