const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        maxLength: 10,
        required: true
    },
    description: {
        type: String,
        maxLength: 50,
    },
    status: {
        type: String,
        validate: (val) => {
            if (!["pending", "done"].includes(val)) {
                throw new Error(`${val} is not a valid status.`);
            };
        }
    },
    createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;