import { FaSearch, FaBell } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSearchResults, setIsSearching } = useSearch();

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload(); // hoặc navigate("/login")
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    fetch(
      `http://localhost:5000/songs/search?title=${encodeURIComponent(
        searchTerm
      )}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Lỗi API");
        return response.json();
      })
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tìm kiếm:", error);
        setSearchResults([]);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="bg-black text-white flex items-center justify-between px-6 py-2 w-full">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <img
          src="https://res.cloudinary.com/dcbqh6tx4/image/upload/v1742935893/logo-spotify_xhcne4.jpg"
          alt="Spotify Logo"
          className="w-12"
        />

        {/* Home Icon */}
        <IoHomeSharp className="text-2xl" />

        {/* Search Bar */}
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Bạn muốn phát nội dung gì?"
            className="bg-gray text-black px-4 py-2 rounded-full pl-10 w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <FaSearch
            className="absolute left-3 top-3 text-gray-400 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {!user && (
          <button className="bg-white text-black px-4 py-2 rounded-full font-semibold">
            Khám phá Premium
          </button>
        )}
        <div className="flex items-center text-gray-300 cursor-pointer">
          <IoMdDownload className="text-xl" />
          <span className="text-sm ml-1 font-semibold">Cài đặt Ứng dụng</span>
        </div>
        {!user ? (
          <>
            <div className="flex gap-4">
              <a
                href="/register"
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Đăng ký
              </a>
              <a
                href="/login"
                className="bg-white text-black px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                Đăng nhập
              </a>
            </div>
          </>
        ) : (
          <>
            <FaBell className="text-xl cursor-pointer" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setShowMenu(!showMenu)}
                />
              </div>

              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-neutral-900 text-white rounded shadow-md z-10">
                  <div className="px-4 py-2 border-b font-semibold">
                    Xin chào, {user.username}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-500"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
