// Import the required modules
const express = require("express");
const multer = require('multer');
const router = express.Router();
const path = require('path');
// Import Rating Controllers
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

// Configure storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filenames
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Rating and Review Routes
router.post("/createRating", upload.array('files[]', 10), createRating);
router.post("/getAverageRating", getAverageRating);
router.post("/getReviews", getAllRating);

module.exports = router;
