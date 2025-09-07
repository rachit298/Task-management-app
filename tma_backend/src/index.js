const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();
require('dotenv').config();
const port = process.env.PORT_NUMBER || 3000;
const { connectDB } = require("./config/db");
const authRouter = require("./routes/authRouter");
const taskRouter = require("./routes/taskRouter");

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', taskRouter);

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}.`);
    })
}).catch((error) => {
    console.log("Error while establishing connection with database.");
    process.exit(1);
})