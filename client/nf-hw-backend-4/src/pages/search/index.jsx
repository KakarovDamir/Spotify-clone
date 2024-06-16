import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Footer } from '../../components/footer';
import { useMusic } from '../../context/MusicContext';

export const Search = () => {
  const { playSong } = useMusic();
  const [songs, setSongs] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/api/v5/songs")
      .then((response) => {
        setSongs(response.data);
        setSearchResults(response.data); // Устанавливаем начальные результаты поиска
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching songs", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = songs.filter((song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, songs]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="min-h-screen text-gray-300">
      <Header setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="bg-custom-section pt-28 md:pl-72 p-8 flex flex-col min-h-screen">
        <h1 className="text-3xl font-semibold mb-8 text-center">Song List</h1>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by song or artist"
            className="w-full max-w-lg py-2 px-4 rounded-md bg-black text-white placeholder-gray-500 text-center focus:outline-none focus:ring-2 focus:ring-gray-500 border-2 border-white"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex-grow">
          {loading ? (
            <div className="text-center">
              <div className="loader"></div>
              <p>Loading...</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((song) => (
                <li
                  key={song.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-950 cursor-pointer"
                  onClick={() => playSong(song)}
                >
                  <div className="flex items-center p-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={song.img}
                        alt="Artist Profile"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{song.title}</h3>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};
