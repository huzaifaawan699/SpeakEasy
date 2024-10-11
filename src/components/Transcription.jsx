import React, { useEffect, useState } from 'react';

const Transcription = ({ audioUrl, setTranscription }) => {
    const [transcribing, setTranscribing] = useState(false);

    useEffect(() => {
        if (audioUrl) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.continuous = true;

            recognition.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                setTranscription(transcript);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event);
            };

            recognition.onend = () => setTranscribing(false);

            recognition.start();
            setTranscribing(true);

            return () => recognition.stop();
        }
    }, [audioUrl, setTranscription]);

    return (
        <div className="mt-6 p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-shadow duration-300 hover:shadow-xl">
            {transcribing ? (
                <div className="flex items-center">
                    <div className="animate-spin h-5 w-5 border-4 border-blue-600 border-t-transparent rounded-full mr-2"></div>
                    <p className="text-blue-600 font-semibold">Transcribing audio...</p>
                </div>
            ) : (
                <p className="text-gray-700 font-semibold">Ready for transcription.</p>
            )}
        </div>
    );
};

export default Transcription;
