const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        maxLength: 20,
        required: true,
        validate: (value) => {
            if (!validator.isEmail(value))
                throw new Error("Invalid email: " + value);
        }
    },
    password: {
        type: String,
        maxLength: 20,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;