import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="flex">
        <Navbar />
        <div className="flex flex-col flex-1 min-h-screen">
          <MainContent />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
