import React from "react";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">🎵 My Music App</h1>
      <MusicPlayer songId="67dc54b0bfce6eb73d2aa038" />
    </div>
  );
}

export default App;
