const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "djkefa40q", // Your Cloudinary cloud name
  api_key: "378943726713911", // Your Cloudinary API key
  api_secret: "urNaZmI7y-hUgoIAmoQFJO20wNY", // Your Cloudinary API secret
  secure: true, // Use HTTPS for requests
});

// Function to list all files
const listFiles = async () => {
  try {
    const response = await cloudinary.api.resources({
      type: "upload", // Fetch uploaded resources only
      resource_type: "image", // Fetch only image resources
    });
    return response.resources; // Returns the list of all resources
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};

module.exports = { listFiles };
