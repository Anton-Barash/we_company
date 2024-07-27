import React from 'react';
import $api from '../http';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    console.log(selectedFile);
    const formData = new FormData();
    formData.append('file', selectedFile);

    $api.put('/fileUpload', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }

    })
      .then((response) => {
        console.log('File uploaded successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
