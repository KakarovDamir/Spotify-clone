import React, { createContext, useContext, useState } from 'react';

const MusicContext = createContext();

export const useMusic = () => {
  return useContext(MusicContext);
};

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const stopSong = () => {
    setIsPlaying(false);
  };

  return (
    <MusicContext.Provider value={{ currentUser, setCurrentUser, currentSong, isPlaying, playSong, stopSong }}>
      {children}
    </MusicContext.Provider>
  );
};
