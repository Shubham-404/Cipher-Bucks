const jwt = require('jsonwebtoken');

module.exports.authorize = async (req, res, next) => {
    if (req.cookies.cipherBucksToken) {
        try {
            const tokenData = await jwt.verify(req.cookies.cipherBucksToken, process.env.JWT_SECRET);
            console.log(tokenData)
            if (tokenData) {
                req.body.userId = tokenData.id
            } else {
                return res.json({ success: false, message: "Not Authorize. Login again." });
            }
            next();

        } catch (error) {
            res.status(401).json({ success: false, message: "Something went wrong!", error: error.message })
        }
    } else {
        return res.json({ success: false, message: "Not Authorized, login again." })
    }
}