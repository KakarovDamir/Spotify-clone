import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Footer } from '../../components/footer';
import { Link } from 'react-router-dom';

export const Library = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Fetch user's playlists
    axios.get("http://localhost:5000/api/v5/playlist")
      .then(response => setPlaylists(response.data))
      .catch(error => console.error("Error fetching playlists", error));
  }, []);

  return (
    <div className="min-h-screen text-gray-300">
      <Header setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="bg-custom-section pt-28 md:pl-72 p-8 flex flex-col min-h-screen">
        <h1 className="text-3xl font-semibold mb-8 text-center">My Library</h1>
        <div className="flex-grow">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {playlists.map(playlist => (
              <li
                key={playlist._id}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden dark:bg-gray-950 cursor-pointer"
              ><Link to={`/library/${playlist._id}`} className="flex flex-col h-full">
                <div className="p-4">
                    <img src={playlist.img} alt="" />
                  <h3 className="text-lg font-semibold text-white">{playlist.title}</h3>
                </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    </div>
  );
};
