import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { Signup } from "../pages/signup";
import { Signin } from "../pages/singin";
import { Search } from "../pages/search";
import { ArtistDetail } from "../pages/ArtistDetail";
import { AlbumDetail } from "../pages/AlbumDetail";
import { Library } from "../pages/Library";
import { PlaylistDetail } from "../pages/PlaylistDetail";
import { Liked } from "../pages/Liked";

export const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search" element={<Search />} />
      <Route path="/artist/:id" element={<ArtistDetail />} />
      <Route path="/album/:id" element={<AlbumDetail />} />
      <Route path="/library" element={<Library />} />
      <Route path="/library/:id" element={<PlaylistDetail />} />
      <Route path="/liked" element={<Liked />} />
    </Routes>
  );
};
