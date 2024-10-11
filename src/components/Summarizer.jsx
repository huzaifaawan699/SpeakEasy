import axios from 'axios';
import React, { useState } from 'react';

const Summarizer = ({ transcription }) => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const summarizeText = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('https://api.grok.ai/lama-3/summarize', {
                text: transcription,
            });
            setSummary(response.data.summary);
        } catch (err) {
            console.error('Error during summarization:', err);
            setError('Failed to summarize the text. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-6 p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-shadow duration-300 hover:shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Text Summarizer</h2>
            <button
                onClick={summarizeText}
                disabled={loading}
                className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {loading ? 'Summarizing...' : 'Summarize'}
            </button>
            {summary && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                    <p className="text-gray-700">
                        <strong>Summary:</strong> {summary}
                    </p>
                </div>
            )}
            {error && (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
                    <p className="text-red-700">
                        <strong>Error:</strong> {error}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Summarizer;
