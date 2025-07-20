const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken =  (id) => {
    return jwt.sign({
        id
    },process.env.JWT_SECRET, {expiresIn: "1h"});
}

exports.registerUser = async (req,res) => {
    const { fullName, email, Password, profileImageUrl } = req.body;

    if(!fullName || !email || !Password){
        return res.status(400).json({ message: "All feilds are required "});
    }
    try{
        const existingUser  = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "Email Aldready in use "});
        }

        const user = await User.create({
            fullName,
            email,
            Password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err){
        res.status(500).json({ message: "Error existing user", error: err.message });
    }
};

exports.loginUser = async (req,res) => {

};

exports.getUserInfo = async (req,res) => {

};