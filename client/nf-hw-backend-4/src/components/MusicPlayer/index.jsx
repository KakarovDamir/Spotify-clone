import React, { useEffect, useRef } from 'react';
import { useMusic } from '../../context/MusicContext';

const MusicPlayer = () => {
  const { currentSong, isPlaying } = useMusic();
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying && currentSong) {
      audioRef.current.play();
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  return (
    <div className='text-black fixed inset-x-0 bottom-0 z-50'>
  {currentSong && (
    <audio ref={audioRef} src={currentSong.url} controls autoPlay />
  )}
</div>

  );
};

export default MusicPlayer;
