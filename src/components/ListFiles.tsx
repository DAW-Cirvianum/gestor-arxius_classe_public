import React, { useState, useEffect } from "react";
import axios from "axios";

const ListFiles = () => {
  interface File {
    public_id: string;
    secure_url: string;
    format: string;
  }

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch all files from the backend
        const response = await axios.get("http://localhost:4000/api/files");
        setFiles(response.data); // Set the list of files in state
      } catch (error) {
        setError("Failed to fetch files");
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) return <p>Loading files...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Cloudinary Files</h1>
      <ul>
        {files.map((file) => (
          <li key={file.public_id}>
            <a href={file.secure_url} target="_blank" rel="noopener noreferrer">
              {file.public_id}
            </a>
            {file.format === "jpg" || file.format === "png" ? (
              <img
                src={file.secure_url}
                alt={file.public_id}
                style={{ width: "200px", height: "200px" }}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListFiles;
