import React from "react";
import "./App.css";
import FileUploader from "./components/FileUploader";
import ListFiles from "./components/ListFiles";
import ImageGallery from "./components/ImageGallery";

function App() {
  return (
    <div>
      <h1>Gestor de Fitxers</h1>
      <FileUploader />
      <ImageGallery />
    </div>
  );
}

export default App;
