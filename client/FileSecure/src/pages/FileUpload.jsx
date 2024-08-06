import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.error('No file selected for upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFile(null);
      fetchFiles();
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/files');
      setFileList(response.data);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-fit mt-4 p-48 bg-gradient-to-r from-blue-200 to-blue-400">
      <div className="flex items-center justify-center w-4/5">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-full cursor-pointer bg-white hover:bg-gray-100 transition-colors duration-200 ease-in-out"
        >
          {!file ? (
            <div className="flex flex-col items-center justify-center pt-7">
              <FontAwesomeIcon icon={faUpload} className="w-24 h-24 text-gray-400" />
              <p className="pt-1 text-4xl tracking-wider text-gray-400">
                Select a file
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-7">
              <FontAwesomeIcon icon={faFileAlt} className="w-12 h-12 text-gray-400" />
              <p className="pt-1 text-sm tracking-wider text-gray-400">
                {file.name}
              </p>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
              >
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                Remove
              </button>
            </div>
          )}
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {file && (
        <button
          type="button"
          onClick={handleFileUpload}
          className="mt-4 w-64 h-14 bg-blue-700 text-white rounded-lg hover:bg-blue-800 flex items-center"
        >
          <FontAwesomeIcon icon={faUpload} className="p-8" />
          Upload File
        </button>
      )}

      <div className="mt-8 w-4/5">
        <h2 className="text-2xl font-bold mb-4">Uploaded Files</h2>
        <ul className="list-disc list-inside w-5/6 h-5/6 rounded-lg bg-white p-4">
          {fileList.length > 0 ? (
            fileList.map((file, index) => (
              <li key={index} className="text-lg text-gray-500">{file.filename}</li>
            ))
          ) : (
            <p className="text-lg text-gray-500">No files available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
