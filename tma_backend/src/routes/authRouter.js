const express = require("express");
const authRouter = express.Router();
const { signup, login } = require("../controllers/authControllers");

//sign up 
authRouter.post('/auth/signup', signup);

//login 
authRouter.post('/auth/login', login);

module.exports = authRouter;