import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <Navbar />
      <main className="p-6 text-white"> {/* Nội dung trang ở đây */} </main>
    </div>
  );
}

export default App;
