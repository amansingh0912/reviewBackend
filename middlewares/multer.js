// Configure storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
         console.log("inside files")
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filenames
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });


module.exports = upload;