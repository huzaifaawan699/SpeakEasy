import React from 'react';

const LanguageSelector = ({ setLanguage }) => {
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'zh', name: 'Chinese (Simplified)' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ru', name: 'Russian' },
        { code: 'it', name: 'Italian' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ko', name: 'Korean' },
        { code: 'ar', name: 'Arabic' },
        { code: 'nl', name: 'Dutch' },
        { code: 'hi', name: 'Hindi' },
        { code: 'sv', name: 'Swedish' },
        { code: 'no', name: 'Norwegian' },
        { code: 'da', name: 'Danish' },
        { code: 'fi', name: 'Finnish' },
        { code: 'tr', name: 'Turkish' },
        { code: 'cs', name: 'Czech' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'th', name: 'Thai' },
    ];

    return (
        <div className="mb-4">
            <label htmlFor="language" className="block text-gray-700 text-sm font-semibold mb-2">
                Select Language:
            </label>
            <select
                id="language"
                onChange={(e) => setLanguage(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition duration-200 ease-in-out"
            >
                {languages.map(({ code, name }) => (
                    <option key={code} value={code} className="text-gray-700">
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
