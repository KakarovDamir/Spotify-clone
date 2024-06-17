import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useMusic } from '../../context/MusicContext';

const socket = io('http://localhost:5000');

export default function UsersActivity() {
  const { currentSong } = useMusic();
  const [tracks, setTracks] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    socket.emit('registerUser', { email });

    socket.on('updateTrack', (data) => {
      setTracks((prevTracks) => {
        const updatedTracks = prevTracks.filter(track => track.userEmail !== data.userEmail);
        return [...updatedTracks, data];
      });
    });

    return () => {
      socket.off('updateTrack');
    };
  }, [email]);

  useEffect(() => {
    if (currentSong?.title) {
      socket.emit('currentTrack', { track: currentSong.title });
    }
  }, [currentSong]);

  return (
    <div className="border-t border-gray-700 mt-8 pt-4">
      <h4 className="text-white text-lg font-bold mb-4">Users Activity</h4>
      <div className="flex flex-col gap-y-4 overflow-y-auto" style={{ maxHeight: '300px' }}>
        {tracks.map((item, index) => (
          <div key={index}>
            <h5 className="text-white font-bold">{item.userEmail}</h5>
            <p className="text-gray-400">{item.track}</p>
            <p className="text-gray-400">Listening Now</p>
          </div>
        ))}
      </div>
    </div>
  );
}
