export const extractAudioFromVideo = async (videoFile) => {
    // Dynamically import ffmpeg
    const { createFFmpeg, fetchFile } = await import('@ffmpeg/ffmpeg');
    const ffmpeg = createFFmpeg({ log: true });

    if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
    }

    ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(videoFile));
    await ffmpeg.run('-i', 'video.mp4', 'audio.mp3');
    const audioData = ffmpeg.FS('readFile', 'audio.mp3');

    const audioBlob = new Blob([audioData.buffer], { type: 'audio/mp3' });
    return URL.createObjectURL(audioBlob);
};
