import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import { SearchProvider } from "./context/SearchContext";
import { PlayerProvider } from "./context/PlayerContext";

function App() {
  return (
    <SearchProvider>
      <PlayerProvider>
        <div className="bg-black min-h-screen">
          <Header />
          <div className="flex">
            <Navbar />
            <div className="flex flex-col flex-1 min-h-screen">
              <MainContent />
              <Footer />
            </div>
          </div>
          <MusicPlayer />
        </div>
      </PlayerProvider>
    </SearchProvider>
  );
}

export default App;
