const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token not valid.");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedToken;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not present.");
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Error while authenticating the user." });
    }
}

module.exports = authMiddleware;