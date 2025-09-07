const express = require("express");
const authRouter = express.Router();
const { signup, login } = require("../controllers/authControllers");
const authMiddleware = require('../middleware/auth');

//sign up 
authRouter.post('/auth/signup', authMiddleware, signup);

//login 
authRouter.post('/auth/login', authMiddleware, login);

module.exports = authRouter;