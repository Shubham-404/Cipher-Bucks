const express = require("express");

const testRouter = express.Router()

const { testController } = require('../controllers/test-controller');
const { sendVerifyOtp } = require("../controllers/auth-controllers");

testRouter.post('/', testController)
testRouter.post('/sendotp', sendVerifyOtp)

module.exports = testRouter