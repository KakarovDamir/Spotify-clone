import React, { useState } from 'react';
import axios from 'axios';

function SongForm({ addSong }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('album', album);
    formData.append('genre', genre);
    if (file) {
      formData.append('file', file[0]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v5/songs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      addSong(response.data);
      setTitle('');
      setArtist('');
      setAlbum('');
      setGenre('');
      setFile(null);
    } catch (error) {
      console.error('Failed to add song', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
      <input type="text" placeholder="Album" value={album} onChange={(e) => setAlbum(e.target.value)} />
      <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files)} />
      <button type="submit">Add Song</button>
    </form>
  );
}

export default SongForm;
