
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RouteList } from "./routes";
import MusicPlayer from "./components/MusicPlayer";
import { MusicProvider } from "./context/MusicContext";

 const App = () => {
  return (
      <BrowserRouter>
      <MusicProvider>
        <RouteList/>
      <MusicPlayer />
      </MusicProvider>
      </BrowserRouter> 
  );
};

export default App;