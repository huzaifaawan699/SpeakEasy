// FileUploader.js

import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = ({ setAudioFile, onUploadSuccess, onUploadError }) => {
    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVideoUpload = async (e) => {
        const file = e.target.files[0];
        setVideoFile(file);
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('video', file);

        try {
            const response = await axios.post('http://localhost:5000/convert', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob', // Important to handle the binary file
            });

            const audioUrl = URL.createObjectURL(new Blob([response.data]));
            setAudioFile(audioUrl);
            onUploadSuccess(); // Notify success
        } catch (error) {
            console.error('Error during file upload or conversion:', error);
            setError('Failed to upload or convert the file. Please try again.');
            onUploadError(); // Notify error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Upload Your Video</h2>
            <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100 mb-4"
            />
            {loading && <p className="text-blue-600">Uploading...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {videoFile && <p className="mt-2 text-gray-800">Video uploaded: {videoFile.name}</p>}
        </div>
    );
};

export default FileUploader;
