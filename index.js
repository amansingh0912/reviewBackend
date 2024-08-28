

const express = require('express');
const multer = require('multer');
const path = require('path'); // Make sure to import the path module
const cors = require('cors');
const app = express();
const { connect } = require("./config/database");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// Connection with the database
connect();

app.use(express.json());

app.use(cors({
    origin: "*",
    credentials: true,
}));


// Import and use routes
const courseRoutes = require("./routes/Course");
app.use("/api/v1/course", courseRoutes);

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on port 4000');
});
