const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",
  api_secret: "your_api_secret",
  secure: true,
});

const getRandomImages = async () => {
  try {
    // Fetch all image resources
    const response = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image", // Fetch only images
      max_results: 100, // Limit the number of results fetched
    });

    // Extract public IDs
    const publicIds = response.resources.map((resource) => resource.public_id);

    // Randomly select 6 public IDs
    const randomImages = publicIds.sort(() => 0.5 - Math.random()).slice(0, 6);

    return randomImages;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

getRandomImages()
  .then((images) => console.log("Random Images:", images))
  .catch((error) => console.error("Error:", error));
