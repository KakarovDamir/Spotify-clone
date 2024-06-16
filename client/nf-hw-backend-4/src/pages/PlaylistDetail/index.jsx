import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Footer } from '../../components/footer';
import { useMusic } from '../../context/MusicContext';

export const PlaylistDetail = () => {
  const { id } = useParams();
  const { playSong } = useMusic();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v5/playlist/${id}`)
      .then(response => {
        setPlaylist(response.data);
      })
      .catch(error => console.error("Error fetching playlist", error));

    axios.get(`http://localhost:5000/api/v5/songs/playlists/${id}`)
      .then(response => setSongs(response.data))
      .catch(error => console.error("Error fetching songs for playlist", error));

    axios.get("http://localhost:5000/api/v5/songs")
      .then(response => setAllSongs(response.data))
      .catch(error => console.error("Error fetching songs", error));
  }, [id]);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const results = allSongs.filter((song) =>
      song.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const addSongToPlaylist = (songId, playlists) => {
    playlists.push(id);
    axios.put(`http://localhost:5000/api/v5/songs/${songId}`, { playlists: playlists})
      .then(response => songs.concat(response.data.songs))
      .catch(error => console.error("Error adding song to playlist", error));
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen text-gray-300">
      <Header setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="bg-custom-section pt-28 md:pl-72 p-8 flex flex-col min-h-screen">
        <div className="flex flex-col items-center">
          <img src={playlist.img} alt={playlist.title} className="w-64 h-64 object-cover rounded-full" />
          <h2 className="text-3xl font-bold mt-4">{playlist.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 text-black flex-grow">
            {songs.map(song => (
              <div key={song._id} className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer" onClick={() => playSong(song)}>
                <h3 className="text-lg font-semibold text-white">{song.title}</h3>
                <img src={song.img} alt={song.title} className="mt-2 w-full h-32 object-cover rounded-md" />
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-8 mt-8">
            <input
              type="text"
              placeholder="Search for songs to add"
              className="w-200 py-2 px-4 rounded-md bg-black text-white placeholder-gray-500 text-center focus:outline-none focus:ring-2 focus:ring-gray-500 border-2 border-gray-500 "
              value={searchTerm}
              onChange={handleSearch}
            />
            <ul className="mt-4">
            {searchResults && searchResults.length > 0 && searchResults.map(song => (
                <li
                    key={song._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer flex justify-between items-center"
                >
                    <div className="flex items-center">
                    <img src={song.img} alt={song.title} className="w-12 h-12 object-cover rounded-full mr-4" />
                    <h3 className="text-lg font-semibold text-white">{song.title}</h3>
                    </div>
                    <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-md"
                    onClick={() => addSongToPlaylist(song._id, song.playlists)}
                    >
                    Add
                    </button>
                </li>
                ))}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
