import { FaSearch, FaBell } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";

const Header = () => {
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
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Premium Button */}
        <button className="bg-white text-black px-4 py-2 rounded-full font-semibold">
          Khám phá Premium
        </button>

        {/* Download Icon */}
        <div className="flex items-center text-gray-300 cursor-pointer">
          <IoMdDownload className="text-xl" />
          <span className="text-sm ml-1 font-semibold">Cài đặt Ứng dụng</span>
        </div>

        {/* Notification Icon */}
        <FaBell className="text-xl cursor-pointer" />

        {/* User Avatar */}
        <img
          src="https://res.cloudinary.com/dcbqh6tx4/image/upload/v1742934355/vdb_avatar_vwgaax.jpg"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;
