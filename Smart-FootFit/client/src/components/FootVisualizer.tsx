
import React, { useState } from 'react';

const FootUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  // Handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
  };

  // Handle file upload (this could be expanded with an API call later)
  const handleUpload = () => {
    if (file) {
      console.log('File uploaded:', file.name);
      // Add your upload logic here (API call, etc.)
    }
  };

  return (
    <div>
      <h2>Upload a 3D Scan of Your Shoe</h2>
      <input type="file" accept=".obj,.stl,.ply" onChange={handleFileChange} />
      {file && <p>Selected File: {file.name}</p>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FootUploader;
