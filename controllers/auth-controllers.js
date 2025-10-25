const bcrypt = require('bcrypt');

const sendEmailToUser = require('../utils/services/send-email')

const userModel = require('../utils/models/user')
const getToken = require('../utils/services/get-token')
const getOtp = require('../utils/services/get-otp')


// signup
module.exports.signupUser = async function (req, res) {
    try {
        const { name, email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (user) {
            console.log('User already exists.');
            return res.json({ success: false, message: "User already exists. Kindly login." });
        }

        // create new user
        // generate hash using bcrypt
        const salt = await bcrypt.genSalt(+process.env.MY_SALT); // unnary + operator to convert string to integer
        const hash = await bcrypt.hash(password, salt)
        user = await userModel.create({
            name,
            email,
            password: hash
        })
        console.log("user Created.")
        // now login the user by saving jwt token
        let token = getToken({ email })
        res.cookie('khataToken', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 // one day
        })
        console.log("Login Sucess!")


        // Send welcome mail to new user
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: `Welcome to Cipher Bucks!`,
            html: `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f7fa;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .header img {
                        max-width: 180px;
                    }
                    h2 {
                        color: #4CAF50;
                    }
                    p {
                        line-height: 1.6;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        font-size: 12px;
                        color: #777;
                    }
                    .footer a {
                        color: #4CAF50;
                        text-decoration: none;
                    }
                    .cta-button {
                        background-color: #4CAF50;
                        color: white;
                        padding: 12px 25px;
                        text-align: center;
                        font-size: 16px;
                        border-radius: 5px;
                        text-decoration: none;
                        display: inline-block;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <a href='https://postimages.org/' target='_blank'><img src='https://i.postimg.cc/D0xKtM2f/logo-long.png' border='0' alt='logo-long'/></a>
                    </div>

                    <h2>Welcome, ${name}!</h2>
                    <p>We’re thrilled to have you on board! Your account has been successfully created with the email <strong>${email}</strong>.</p>
                    <p>We’re here to help you make the most of your experience with Cipher Bucks. If you have any suggestions or need assistance, don’t hesitate to reach out to us at <a href="mailto:help@cipherbucks.shubham.app">help@cipherbucks.shubham.app</a>.</p>

                    <p>We hope you enjoy the journey with us!</p>

                    <div class="footer">
                        <p>Warm regards,<br>Team Cipher Bucks</p>
                    </div>
                </div>
            </body>
        </html>
    `
        };

        let mailRespnse = await sendEmailToUser(mailOptions);
        console.log(mailRespnse.message);

        res.status(201).json({ success: true, message: "Account created successfully. Please verify your email to proceed." });
    }
    catch (err) {
        console.log("Here is the err: ", err.message);
        res.status(500).json({ success: false, message: "Process Failure, please go back!" })
    }
}


// login
module.exports.loginUser = async function (req, res) {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(500).json({ success: false, message: "Invalid email or password." })
        }
        let result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(500).json({ success: false, message: "Invalid email or password." })
        }

        // now login the user by saving jwt token
        let token = getToken({ email })
        res.cookie('khataToken', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 // one day
        })
        console.log("Cookie is set.")
        console.log("Logged In.")

        res.status(201).json({ success: true, message: "Logged in Successfully." });
    }
    catch {
        console.log("Cannot get user data!");
        res.json({ success: false, message: "Process Failure, please go back!" })
    }
}


// user profile
module.exports.userProfile = function (req, res) {
    let { name, email, hisaabs } = req.user;
    res.json({ success: true, name, email, hisaabs });
}

// logout
module.exports.logoutUser = function (req, res) {
    res.cookie('khataToken', '', {
        httpOnly: true,
        secure: true,
    })
    console.log("Cookie is reset.")

    res.status(201).json({ success: true, message: "Logged Out." });
}


module.exports.sendVerifyOtp = async function (req, res) {
    try {
        //check if the user is already verified.
        const email = req.body.email
        const user = await userModel.findOne({ email });
        if (user.isAccountVerified) return res.json({ success: false, message: "User already verified." })


        const OTP = getOtp();
        //update otp and expire time in database
        user.verifyOtp = OTP;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        // Send otp via mail to the user
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: `OTP for Email Verification`,
            html: `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f7fa;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .header img {
                        max-width: 150px;
                    }
                    h2 { 
                        color: #4CAF50;
                    }
                    .otp-code {
                        display: inline-block;
                        background-color: #4CAF50;
                        color: white;
                        padding: 10px 20px;
                        font-size: 18px;
                        font-weight: bold;
                        border-radius: 5px;
                        margin-top: 20px;
                    }
                    p {
                        line-height: 1.6;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        font-size: 12px;
                        color: #777;
                    }
                    .footer a {
                        color: #4CAF50;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <a href='https://postimages.org/' target='_blank'><img src='https://i.postimg.cc/D0xKtM2f/logo-long.png' border='0' alt='logo-long'/></a>
                    </div>

                    <h2>Hi ${user.name || 'there'}!</h2>
                    <p>We have received a request to create an account using the email <strong>${user.email}</strong>.</p>
                    <p>Your One-Time Password (OTP) for verifying your email address is:</p>

                    <div class="otp-code">
                        ${OTP}
                    </div>

                    <p>Please enter this code on the verification page to complete your registration process.</p>

                    <p>If you did not request this, we recommend updating your password and logging out of other devices immediately.</p>

                    <p>For any assistance or suggestions, feel free to reach us at <a href="mailto:help@cipherbucks.shubham.app">help@cipherbucks.shubham.app</a>.</p>

                    <div class="footer">
                        <p>Regards,<br>Team Cipher Bucks</p>
                    </div>
                </div>
            </body>
        </html>
    `
        };

        let mailRespnse = await sendEmailToUser(mailOptions);
        console.log(mailRespnse.message);
        res.json({ success: true, message: "Verification OTP sent on email." });

    } catch (err) {
        console.error(err)
        res.json({ success: false, message: "Unable send OTP verification email. Please try again.", error: err })
    }
}


module.exports.verifyEmail = async function (req, res) {
    const { email, OTP } = req.body;
    if (!user || !OTP) {
        res.json({ success: false, message: "Missing Details." })
    }
    try {
        const user = await userModel.findOne({ email });

    } catch (err) {
        res.json({ success: false, message: err })
    }
}