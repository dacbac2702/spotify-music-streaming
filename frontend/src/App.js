import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import { SearchProvider } from "./context/SearchContext";
import { PlayerProvider } from "./context/PlayerContext";
import Register from "./pages/Register";

function App() {
  return (
    <SearchProvider>
      <PlayerProvider>
        <Router>
          <div className="bg-black min-h-screen">
            <Routes>
              <Route
                path="/register"
                element={
                  <>
                    <Register />
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <div className="flex">
                      <Navbar />
                      <div className="flex flex-col flex-1 min-h-screen">
                        <MainContent />
                        <Footer />
                      </div>
                    </div>
                    <MusicPlayer />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </PlayerProvider>
    </SearchProvider>
  );
}

export default App;
