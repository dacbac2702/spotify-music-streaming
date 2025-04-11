import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";
import MusicPlayer from "../components/MusicPlayer";

const Home = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex flex-col flex-1 min-h-screen">
          <MainContent />
          <Footer />
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
};

export default Home;
