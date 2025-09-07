const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT_NUMBER || 3000;
const { connectDB } = require("./config/db");

app.get('/', (req, res) => {
    res.send("Welcome to the initial setup of Task management app server.")
})

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}.`);
    })
}).catch((error) => {
    console.log("Error while establishing connection with database.");
    process.exit(1);
})