const express = require("express");

const indexRouter = express.Router()

const { indexController } = require('../controllers/index-controller')

indexRouter.get('/', indexController)

module.exports = indexRouter