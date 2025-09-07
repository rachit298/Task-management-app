const User = require("../models/user");
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const emailId = email.toLowerCase();
        const user = new User({
            email: emailId,
            password: passwordHash
        })
        const savedUser = await user.save();
        res.status(200).json({ user: savedUser });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!validator.isEmail(email)) {
            throw new Error("Invalid Email.")
        }
        const findUser = await User.findOne({
            email
        });
        if (!findUser) {
            throw new Error("Invalid credentials.")
        }
        const isPasswordMatched = await bcrypt.compare(password, findUser.password);
        if (!isPasswordMatched) {
            throw new Error("Invalid credentials.");
        }

        const JWT = await jwt.sign({
            _id: findUser._id
        }, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.cookie("token", JWT, {
            maxAge: 28800000
        });
        res.status(200).json({
            message: "Logged in successfully."
        });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
}

module.exports = {
    signup,
    login
}