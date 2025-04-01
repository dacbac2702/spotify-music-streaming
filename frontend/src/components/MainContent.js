import React, { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";

const MainContent = () => {
  const categories = ["Tất cả", "Âm nhạc", "Podcasts"];
  const [songs, setSongs] = useState([]);
  const { searchResults, isSearching } = useSearch();

  useEffect(() => {
    fetch("http://localhost:5000/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Lỗi khi fetch dữ liệu bài hát:", error));
  }, []);

  const displaySongs = isSearching ? searchResults : songs;

  return (
    <div className="flex-1 p-6 bg-gradient-to-b from-green-900 to-black text-white overflow-y-auto">
      {/* Ẩn category filter khi đang tìm kiếm */}
      {!isSearching && (
        <div className="flex space-x-4 mb-6">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full ${
                index === 0 ? "bg-white text-black" : "bg-green-800 text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {isSearching ? "Kết quả tìm kiếm" : "Dành Cho Bạn"}
          </h2>
          {!isSearching && (
            <button className="text-gray-400 hover:text-white">
              Hiện tất cả
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {displaySongs.length > 0 ? (
            displaySongs.map((song) => (
              <div
                key={song._id}
                className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition cursor-pointer"
              >
                <div className="w-full aspect-square overflow-hidden rounded-lg">
                  <img
                    src={song.coverImage || "https://via.placeholder.com/150"}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-2 text-lg font-semibold truncate">
                  {song.title}
                </h3>
                <p className="text-gray-400 truncate">{song.artist}</p>
                {song.album && <p className="text-gray-500 text-sm truncate">{song.album}</p>}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-400">
                {isSearching
                  ? "Không tìm thấy bài hát phù hợp"
                  : "Không có bài hát nào"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;