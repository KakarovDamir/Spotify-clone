import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { PlaylistsCard } from "../PlaylistCard";
import axios from "axios";

export const Playlistsection = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v5/albums")
     .then(response => setPlaylists(response.data))
     .catch(error => console.error("Error fetching playlists", error));
  }, []);
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-2xl font-bold text-white hover:underline">
          Popular Albums
        </Link>
        
      </div>
      <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {playlists.map(playlist => (
          <PlaylistsCard
            key={playlist._id}
            id={playlist._id}
            title={playlist.title}
            description={playlist.artist}
            imageUrl={playlist.img}
          />
        ))}
      </div>
    </div>
  );
};
