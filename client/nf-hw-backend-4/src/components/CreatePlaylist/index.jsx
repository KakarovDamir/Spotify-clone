import React, { useState } from 'react';
import axios from 'axios';

export const CreatePlaylistModal = ({ onClose, onCreate }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistImg, setPlaylistImg] = useState('');

  const handleCreate = () => {
    axios.post('http://localhost:5000/api/v5/playlist', { title: playlistName, img: playlistImg})
      .then(response => {
        onCreate(response.data);
        onClose();
      })
      .catch(error => console.error('Error creating playlist', error));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Create Playlist</h2>
        <input
          type="text"
          placeholder="Playlist Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black"
        />
        <input
          type="text"
          placeholder="Playlist Image URL"
          value={playlistImg}
          onChange={(e) => setPlaylistImg(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black"
        />
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
