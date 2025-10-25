const express = require("express");

const userRouter = express.Router()

const { authorize } = require('../middlewares/authorize')
const { userProfile, loginUser, signupUser, logoutUser, sendVerifyOtp, verifyEmail } = require('../controllers/auth-controllers')

userRouter.post('/signup', signupUser);  // login route -> /user/login/
userRouter.post('/login', loginUser);  // login route -> /user/login/

userRouter.get('/logout', logoutUser);  // login route -> /user/login/
userRouter.get('/auth/profile', authorize, userProfile);  // test route -> /user/

userRouter.post('/send-verify-otp', authorize, sendVerifyOtp); 
userRouter.post('/verify-email', authorize, verifyEmail); 

module.exports = userRouter
