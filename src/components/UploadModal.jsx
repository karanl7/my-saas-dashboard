// src/components/UploadModal.jsx
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);

  // This effect simulates the upload process
  useEffect(() => {
    if (files.some(f => f.status === 'uploading')) {
      const timer = setTimeout(() => {
        setFiles(currentFiles =>
          currentFiles.map(file => {
            if (file.status === 'uploading') {
              // Randomly succeed or fail
              return { ...file, status: Math.random() > 0.2 ? 'success' : 'error' };
            }
            return file;
          })
        );
      }, 1500); // Simulate 1.5 second upload time
      return () => clearTimeout(timer);
    }
  }, [files]);

  const onDrop = useCallback(acceptedFiles => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      status: 'uploading', // Initial status
    }));
    setFiles(currentFiles => [...currentFiles, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'application/pdf': ['.pdf']} });

  if (!isOpen) return null;

  const getStatusColor = (status) => {
    if (status === 'success') return 'text-green-400';
    if (status === 'error') return 'text-red-400';
    return 'text-blue-400';
  }

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Upload Contracts</h2>
        
        {/* Dropzone */}
        <div {...getRootProps()} className={`p-8 border-2 border-dashed rounded-md cursor-pointer text-center
          ${isDragActive ? 'border-blue-500 bg-gray-700' : 'border-gray-600 hover:border-blue-500'}`}>
          <input {...getInputProps()} />
          <p className="text-gray-400">Drag & drop some files here, or click to select files</p>
          <p className="text-xs text-gray-500">Only *.pdf files will be accepted</p>
        </div>

        {/* File List */}
        <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
          {files.map((f, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded">
              <span className="text-sm text-gray-300 truncate">{f.file.name}</span>
              <span className={`text-sm font-semibold ${getStatusColor(f.status)}`}>
                {f.status.charAt(0).toUpperCase() + f.status.slice(1)}...
              </span>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => { setFiles([]); onClose(); }}
          className="w-full mt-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default UploadModal;