import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false); // For showing a loading state

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage(""); // Reset message on file change
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      setLoading(true); // Set loading to true while the request is being processed

      try {
        // Mock POST request using axios
        const response = await axios.post('https://example.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          setUploadMessage(`File "${file.name}" uploaded successfully!`);
        }
      } catch (error) {
        setUploadMessage("Failed to upload the file. Please try again.");
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    } else {
      setUploadMessage("Please select a file first.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg">
      {/* File Selection */}
      <label className="block text-gray-700 mb-2">Select a file:</label>
      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileChange}
        className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-indigo-500"
      />

      {/* Upload Button */}
      {file && (
        <button
          onClick={handleUpload}
          className={`mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload File'}
        </button>
      )}

      {/* Display upload message */}
      {uploadMessage && (
        <div className="mt-4 p-4 bg-green-50 border border-green-400 rounded-lg">
          <p className={`text-${uploadMessage.includes('successfully') ? 'green' : 'red'}-800`}>{uploadMessage}</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
