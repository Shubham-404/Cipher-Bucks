// models/user.js
const mongoose = require("mongoose");
const hisaabSchema = require("./hisaab");

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    name: String,
    hisaabs: [hisaabSchema] 
});

module.exports = mongoose.model("User", userSchema);
