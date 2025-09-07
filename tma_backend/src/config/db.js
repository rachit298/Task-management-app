const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME_CRED}:${encodeURIComponent(process.env.MONGODB_PASSOWRD_CRED)}@taskmanagementapp.xdxvksv.mongodb.net/`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
}

module.exports = {
    connectDB
}