import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useMusic } from "../../context/MusicContext";
import { Footer } from "../../components/footer";

export const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const { playSong } = useMusic();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v5/artists/${id}`)
      .then(response => setArtist(response.data))
      .catch(error => console.error("Error fetching artist", error));

    axios.get(`http://localhost:5000/api/v5/songs/artists/${id}`)
      .then(response => setSongs(response.data))
      .catch(error => console.error("Error fetching artist's songs", error));
  }, [id]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen text-gray-300">
      <Header setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="bg-custom-section pt-28 md:pl-72 p-8 flex flex-col min-h-screen">
        <div className="flex flex-col items-center">
          <img src={artist.img} alt={artist.name} className="w-64 h-64 object-cover rounded-full" />
          <h2 className="text-3xl font-bold mt-4">{artist.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 text-black flex-grow">
            {songs.map(song => (
              <div key={song._id} className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer" onClick={() => playSong(song)}>
                <h3 className="text-lg font-semibold text-white">{song.title}</h3>
                <img src={song.img} alt={song.title} className="mt-2 w-full h-32 object-cover rounded-md" />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
