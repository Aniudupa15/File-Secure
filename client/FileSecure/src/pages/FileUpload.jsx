import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const FileUpload = () => {
  const [file, setFile] = useState(null);
 // const [fileList, setFileList] = useState([]);

 /* useEffect(() => {
    // Fetch files from the backend
    axios.get('/api/files')
      .then(response => {
        setFileList(response.data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, []);*/

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleManualUpload = () => {
    document.getElementById('file-upload').click();
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
              <p className="pt-1 text-4xl tracking-wider text-gray-400 group-hover:text-gray-600">
                Select a file
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-7">
              <FontAwesomeIcon icon={faFileAlt} className="w-12 h-12 text-gray-400" />
              <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
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
      <button
        type="button"
        onClick={handleManualUpload}
        className="mt-4 w-64 h-14 bg-white text-blue-700 rounded-lg hover:bg-white flex items-center"
      >
        <FontAwesomeIcon icon={faUpload} className="p-8" />
        Upload Manually
      </button>

      <div className="mt-8 w-4/5">
        <h2 className="text-2xl font-bold mb-4">Uploaded Files</h2>
        <ul className="list-disc list-inside w-5/6 h-5/6 rounded-lg bg-white"> <p className="text-lg text-gray-500">No files available</p>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
