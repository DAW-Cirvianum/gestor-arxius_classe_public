import React, { useState, useEffect } from "react";
import { FileData } from "../types/FileData";
import axios from "axios";

const API_URL = "http://localhost:5000/files";

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

  const uploadFile = () => {
    if (!selectedFile) return;

    setLoading(true);
    const fileData = {
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
    };

    axios
      .post<FileData>(API_URL, fileData)
      .then((response) => setFiles([...files, response.data]))
      .catch((error) => console.error("Erro pujant el fitxer:", error))
      .finally(() => setLoading(false));
  };

  const deleteFile = (id: string) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setFiles(files.filter((file) => file.id !== id)));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get<FileData[]>(API_URL)
      .then((response) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(response);
          }, 3000);
        });
      })
      .then((response) => setFiles(response.data))
      .catch((error) => console.error("Error carregant arxius:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div>
        <h1>Gestor de Fitxers</h1>
        {loading && <p>Carregant...</p>}
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Pujar</button>
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              {file.name} - {file.size}bytes
              <button onClick={() => deleteFile(file.id)}> Eliminar </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FileUploader;
