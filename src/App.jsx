import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import Transcription from './components/Transcription';
import AudioGenerator from './components/AudioGenerator';
import Summarizer from './components/Summarizer';
import LanguageSelector from './components/LanguageSelector';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [language, setLanguage] = useState('en');

  const handleUploadSuccess = () => {
    toast.success('File uploaded successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  const handleUploadError = () => {
    toast.error('Error uploading file. Please try again.', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-blue-500 p-8">
      <ToastContainer />
      <h1 className="text-5xl font-extrabold mb-8 text-white shadow-md rounded-lg p-4 bg-gradient-to-r from-indigo-600 to-blue-600">
        Video Transcription and Summarization
      </h1>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8 space-y-6">
        <FileUploader setAudioFile={setAudioFile} onUploadSuccess={handleUploadSuccess} onUploadError={handleUploadError} />
        {audioFile && (
          <Transcription audioUrl={audioFile} setTranscription={setTranscription} />
        )}
        {transcription && (
          <div className="mt-4 space-y-4">
            <LanguageSelector setLanguage={setLanguage} />
            <AudioGenerator transcription={transcription} language={language} />
            <Summarizer transcription={transcription} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
