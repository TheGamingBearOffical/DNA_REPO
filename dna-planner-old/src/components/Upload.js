import React, { useState } from 'react';

const Upload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "text/plain" || file.type === "text/csv" || file.type === "application/json")) {
      setSelectedFile(file);
      onFileSelect(file);
      console.log("File selected:", file.name);
    } else {
      console.log("Invalid file type selected.");
      setSelectedFile(null);
    }
  };

  return (
    <div className="card shadow-sm border-primary mb-4">
      <div className="card-body">
        <h5 className="card-title text-primary">Upload DNA</h5>
        <label htmlFor="dna-upload" className="form-label visually-hidden">Upload your DNA file</label>
        <input
          id="dna-upload"
          type="file"
          accept=".txt,.csv,.json"
          className="form-control bg-white text-dark border-primary mt-2"
          onChange={handleFileChange}
        />
        {selectedFile && <p className="mt-2">File selected: {selectedFile.name}</p>}
      </div>
    </div>
  );
};

export default Upload; 