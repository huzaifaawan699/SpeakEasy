import axios from 'axios';
import React, { useState } from 'react';

const AudioGenerator = ({ transcription, language }) => {
    const [audioUrl, setAudioUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateAudio = async () => {
        setLoading(true);
        setError(null); // Reset error state

        try {
            const response = await axios.post('https://api.elevenlabs.io/text-to-speech', {
                text: transcription,
                language,
            });
            setAudioUrl(response.data.audio_url);
        } catch (err) {
            console.error('Error generating audio:', err);
            setError('Failed to generate audio. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Audio Generator</h2>
            <button
                onClick={generateAudio}
                disabled={loading}
                className={`px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
            >
                {loading ? 'Generating...' : `Generate Audio in ${language}`}
            </button>
            {error && <p className="mt-2 text-red-600 font-medium">{error}</p>}
            {audioUrl && (
                <div className="mt-4 w-full">
                    <audio controls src={audioUrl} className="w-full rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl"></audio>
                </div>
            )}
        </div>
    );
};

export default AudioGenerator;
