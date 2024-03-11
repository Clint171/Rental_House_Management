const { signupNewUser , loginUser , authenticate , changePassword , logout , viewProfile} = require('../middleware/auth.js');
const express = require('express');
const router = express.Router();

router.post('/signup' , signupNewUser);

router.post('/login' , loginUser);

router.get('/profile' , authenticate , viewProfile);

router.post('/changePassword' , authenticate , changePassword);

router.get('/logout' , authenticate , logout);

module.exports = router;