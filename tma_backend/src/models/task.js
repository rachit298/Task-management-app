const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId
    },
    title: {
        type: String,
        minLength: 1,
        maxLength: 10,
        required: true,
        trim: true,
        set: (val) => validator.escape(val)
    },
    description: {
        type: String,
        maxLength: 50,
        trim: true,
        set: (val) => validator.escape(val)
    },
    status: {
        type: String,
        validate: (val) => {
            if (!["pending", "done"].includes(val)) {
                throw new Error(`${val} is not a valid status.`);
            };
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        validate: (value) => {
            if (!(value instanceof Date) || isNaN(value.getTime())) {
                throw new Error("Date is not valid.")
            }
        }
    }
});

taskSchema.index({ title: "text", description: "text" });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;