const path = require('path')
const express = require('express');
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
};
app.use(cors(corsOptions))
// app.options('*', cors(corsOptions));

const indexRouter = require('./routes/index-router')
const userRouter = require('./routes/user-router')
const testRouter = require('./routes/test-router')
const verifyRouter = require('./routes/verify-router')

app.use('/', indexRouter)
app.use('/test1', testRouter)
app.use('/user', userRouter)
app.use('/verify', verifyRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server live at http://localhost:${PORT}/`)
})