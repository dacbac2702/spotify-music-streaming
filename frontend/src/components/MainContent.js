import React from "react";

const MainContent = () => {
  const categories = ["Tất cả", "Âm nhạc", "Podcasts"];
  const playlists = [
    {
      name: "Playlist 1",
      type: "Danh sách phát",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000013/playlist-icon-linear-logo-mark-set-collection-black-white-web-playlist-icon-linear-logo-mark-black-white-326628417_ujxea8.jpg",
    },
    {
      name: "Playlist 1",
      type: "Danh sách phát",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000013/playlist-icon-linear-logo-mark-set-collection-black-white-web-playlist-icon-linear-logo-mark-black-white-326628417_ujxea8.jpg",
    },
    {
      name: "Playlist 1",
      type: "Danh sách phát",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000013/playlist-icon-linear-logo-mark-set-collection-black-white-web-playlist-icon-linear-logo-mark-black-white-326628417_ujxea8.jpg",
    },
    {
      name: "Playlist 1",
      type: "Danh sách phát",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000013/playlist-icon-linear-logo-mark-set-collection-black-white-web-playlist-icon-linear-logo-mark-black-white-326628417_ujxea8.jpg",
    },
    {
      name: "Playlist 1",
      type: "Danh sách phát",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000013/playlist-icon-linear-logo-mark-set-collection-black-white-web-playlist-icon-linear-logo-mark-black-white-326628417_ujxea8.jpg",
    },
    {
      name: "Playlist 1",
      type: "Danh sách phát",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000013/playlist-icon-linear-logo-mark-set-collection-black-white-web-playlist-icon-linear-logo-mark-black-white-326628417_ujxea8.jpg",
    },
  ];
  const dailyMixes = [
    {
      id: 1,
      title: "Bằng Kiều, Bùi Công Nam, Đinh Tiến Đạt...",
      mixNumber: "01",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000013/playlist-icon-linear-logo-mark-set-collection-black-white-web-playlist-icon-linear-logo-mark-black-white-326628417_ujxea8.jpg",
    },
    {
      id: 2,
      title: "SOOBIN, Sơn Tùng M-TP, Đông Nhi...",
      mixNumber: "02",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000013/playlist-icon-linear-logo-mark-set-collection-black-white-web-playlist-icon-linear-logo-mark-black-white-326628417_ujxea8.jpg",
    },
    {
      id: 3,
      title: "David Guetta và Martin Garrix",
      mixNumber: "03",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000013/playlist-icon-linear-logo-mark-set-collection-black-white-web-playlist-icon-linear-logo-mark-black-white-326628417_ujxea8.jpg",
    },
    {
      id: 4,
      title: "David Guetta và Martin Garrix",
      mixNumber: "04",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000013/playlist-icon-linear-logo-mark-set-collection-black-white-web-playlist-icon-linear-logo-mark-black-white-326628417_ujxea8.jpg",
    },
    {
      id: 5,
      title: "Don Omar, Nicky Jam, Romeo Santos...",
      mixNumber: "05",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000013/playlist-icon-linear-logo-mark-set-collection-black-white-web-playlist-icon-linear-logo-mark-black-white-326628417_ujxea8.jpg",
    },
  ];

  return (
    <div className="flex-1 p-6 bg-gradient-to-b from-green-900 to-black text-white overflow-y-auto">
      {/* Category Filter */}
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
      {/* Playlist Suggestions */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="flex items-center bg-green-800 rounded-lg p-2"
          >
            <img
              src={playlist.image}
              alt={playlist.name}
              className="w-10 h-10 bg-gray-400 rounded-md mr-2"
            />
            <span className="font-semibold">{playlist.name}</span>
          </div>
        ))}
      </div>

      <div className="mb-4">
        {/* For You Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Dành Cho Bạn</h2>
          <button className="text-gray-400 hover:text-white">
            Hiện tất cả
          </button>
        </div>
        {/* Daily Mix Cards */}
        <div className="grid grid-cols-5 gap-4">
          {dailyMixes.map((dailyMixes) => (
            <div key={dailyMixes.id} className="bg-gray-900 p-4 rounded-lg">
              <img
                src={dailyMixes.image}
                alt={dailyMixes.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-lg font-semibold">{dailyMixes.title}</h3>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        {/* For You Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Dành Cho Bạn</h2>
          <button className="text-gray-400 hover:text-white">
            Hiện tất cả
          </button>
        </div>
        {/* Daily Mix Cards */}
        <div className="grid grid-cols-5 gap-4">
          {dailyMixes.map((dailyMixes) => (
            <div key={dailyMixes.id} className="bg-gray-900 p-4 rounded-lg">
              <img
                src={dailyMixes.image}
                alt={dailyMixes.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-lg font-semibold">{dailyMixes.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* For You Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Dành Cho Bạn</h2>
          <button className="text-gray-400 hover:text-white">
            Hiện tất cả
          </button>
        </div>
        {/* Daily Mix Cards */}
        <div className="grid grid-cols-5 gap-4">
          {dailyMixes.map((dailyMixes) => (
            <div key={dailyMixes.id} className="bg-gray-900 p-4 rounded-lg">
              <img
                src={dailyMixes.image}
                alt={dailyMixes.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-lg font-semibold">{dailyMixes.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MainContent;
