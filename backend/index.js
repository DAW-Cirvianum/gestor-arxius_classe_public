const express = require("express");
const { listFiles } = require("./cloudinaryProxy");

const app = express();

app.get("/api/files", async (req, res) => {
  try {
    const files = await listFiles(); // Fetch all files
    res.json(files); // Send the list of files to the frontend
  } catch (error) {
    console.error("Error fetching files:", error); // Log the error details
    res.status(500).json({ message: "Error fetching files", error });
  }
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Backend server running on http://localhost:${PORT}`)
);
