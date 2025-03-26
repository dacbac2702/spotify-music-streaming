import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="flex">
        <Navbar />
        <MainContent className="flex-1" />
      </div>
    </div>
  );
}

export default App;
