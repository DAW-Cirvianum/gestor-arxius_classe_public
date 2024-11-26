import React, { useState } from "react";
import { FileData } from "../types/FileData";
import axios from "axios";

const apiPreset = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;
const apiUrl = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_URL;

const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // En el nostre cas només volem accedir a un únic "file" per tant files[0]
      setSelectedFile(event.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", apiPreset);

    try {
      const response = await axios.post(apiUrl, formData);

      const newFile: FileData = {
        url: response.data.secure_url,
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
      };

      setFiles([...files, newFile]);
      alert("Fitxer pujat correctament!");
    } catch (error) {
      console.error("Error pujant el fitxer", error);
      alert("Error durant la pujada del fitxer");
    } finally {
      setLoading(false);
    }
  };

  //   const deleteFile = (id: string) => {
  //     axios
  //       .delete(`${API_URL}/${id}`)
  //       .then(() => setFiles(files.filter((file) => file.id !== id)));
  //   };

  return (
    <>
      <div>
        <h1>Gestor de Fitxers</h1>
        {loading && <p>Carregant...</p>}
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile} disabled={loading}>
          {loading ? "Pujant..." : "Pujar"}
        </button>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a href={file.url} target="_blank">
                {file.name}
              </a>
              {/* Només si és una imatge, que la mostri */}
              {file.type.startsWith("image/") && (
                <div>
                  <img
                    src={file.url}
                    alt={file.name}
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FileUploader;
