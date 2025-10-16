const express = require("express");

const userRouter = express.Router()

const { authorize } = require('../middlewares/authorize')
const { userProfile, loginUser, signupUser, logoutUser } = require('../controllers/auth-controllers')

userRouter.post('/signup', signupUser);  // login route -> /user/login/
userRouter.post('/login', loginUser);  // login route -> /user/login/
// userRouter.post('/auth/resetpassword', sendOTP, );  // reset password -> /user/
userRouter.get('/logout', logoutUser);  // login route -> /user/login/
userRouter.get('/auth/profile', authorize, userProfile);  // test route -> /user/

module.exports = userRouter
