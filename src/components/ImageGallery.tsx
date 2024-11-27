import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

import { sepia } from "@cloudinary/url-gen/actions/effect";

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: "djkefa40q", // Replace with your Cloudinary cloud name
  },
});

const ImageGallery = () => {
  const [imageIds, setImageIds] = useState([
    "hcfn3lvxid4m1jmmzicz",
    "image2",
    "image3",
  ]); // Replace with your image public IDs
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
      }}
    >
      {imageIds.map((id) => {
        const img = cld.image(id).effect(sepia());
        return (
          <AdvancedImage
            key={id}
            cldImg={img}
            style={{ maxWidth: "300px", width: "100%" }}
          />
        );
      })}
    </div>
  );
};

export default ImageGallery;
