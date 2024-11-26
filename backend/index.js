const express = require("express");
const axios = require("axios");

const app = express();

app.get("/api/images", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.cloudinary.com/v1_1/djkefa40q/resources/image",
      {
        params: { prefix: "Proves/" },
        auth: {
          username: "378943726713911",
          password: "urNaZmI7y-hUgoIAmoQFJO20wNY",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching images");
  }
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
