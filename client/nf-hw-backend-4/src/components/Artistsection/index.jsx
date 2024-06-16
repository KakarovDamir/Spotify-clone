import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArtistsCard } from "../ArtistsCard";
import "./Artistsection.css";
import axios from "axios";

export const Artistsection = () => {
  const [artists, setArtists] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/api/v5/artists")
     .then(response => setArtists(response.data))
     .catch(error => console.error("Error fetching artists", error));
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-2xl font-bold text-white hover:underline">
          Popular artists
        </Link>
      </div>
      <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {artists.map(artist => (
          <ArtistsCard
            key={artist._id}
            id={artist._id}
            title={artist.name}
            description={artist.prof}
            imageUrl={artist.img}
          />
        ))}
      </div>
    </div>
  );
};
