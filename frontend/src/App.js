import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { PlayerProvider } from "./context/PlayerContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <SearchProvider>
        <PlayerProvider>
          <Router>
            <Routes>
              <Route
                path="*"
                element={
                  <>
                    <Home />
                  </>
                }
              />
              <Route
                path="/register"
                element={
                  <>
                    <Register />
                  </>
                }
              /><Route
              path="/login"
              element={
                <>
                  <Login />
                </>
              }
            />
            </Routes>
          </Router>
        </PlayerProvider>
      </SearchProvider>
      <ToastContainer position="top-center" autoClose={3000} theme="light" />
    </>
  );
}

export default App;
