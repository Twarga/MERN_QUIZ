// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Deprecated but sometimes needed for older setups
            useUnifiedTopology: true, // Deprecated but sometimes needed
            // Mongoose 6 doesn't require these options anymore, but leaving them might help avoid warnings in some environments.
            // You can often remove them.
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
