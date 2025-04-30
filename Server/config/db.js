const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const mongoUri = process.env.MONGO_URI; // Get the connection string from .env

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB Atlas successfully"))
    .catch(err => console.log("Failed to connect to MongoDB Atlas", err));
