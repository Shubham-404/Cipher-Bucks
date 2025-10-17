module.exports = getOTP = () => {
    return String(Math.floor(100000 + Math.random() * 900000));
}