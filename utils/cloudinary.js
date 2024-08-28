const cloudinary = require('cloudinary').v2;

const uploadOnCloudinary = async function(localFilePath) {
    console.log("localFilePath:", localFilePath);

    if (!localFilePath) {
        console.error("No file path provided");
        return null;
    }

    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });

    try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            public_id: `uploads/${Date.now()}`, // Generate a unique public ID based on the current timestamp
            resource_type: "auto" // Automatically detect the resource type (image, video, etc.)
        });

        console.log("File uploaded successfully:", uploadResult.url);

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(uploadResult.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });

      

        // Transform the image: auto-crop to square aspect ratio
        const autoCropUrl = cloudinary.url(uploadResult.public_id, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });

      

        return uploadResult.url;

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
};

module.exports = uploadOnCloudinary;
