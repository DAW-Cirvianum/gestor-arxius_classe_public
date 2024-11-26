import React from "react";
import "./App.css";
import FileUploader from "./components/FileUploader";
import ImageGallery from "./components/ImageGallery";

function App() {
  return (
    <>
      <ImageGallery />
      <FileUploader />
    </>
  );
}

export default App;
