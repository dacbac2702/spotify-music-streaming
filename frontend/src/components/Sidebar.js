import { FaPlus, FaArrowRight } from "react-icons/fa";

const Sidebar = () => {
  const playlists = [
    {
      name: "ROSÉ",
      type: "Nghệ sĩ",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1742572572/rosie_glk143.jpg",
    },
    {
      name: "Hoàng Thùy Linh",
      type: "Nghệ sĩ",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1742999627/464330970_1105559810932451_828845685177865440_n_hegpqz.jpg",
    },
    {
      name: "Playlist 1",
      type: "Danh sách phát",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000013/playlist-icon-linear-logo-mark-set-collection-black-white-web-playlist-icon-linear-logo-mark-black-white-326628417_ujxea8.jpg",
    },
    {
      name: "Playlist 2",
      type: "Danh sách phát",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000013/playlist-icon-linear-logo-mark-set-collection-black-white-web-playlist-icon-linear-logo-mark-black-white-326628417_ujxea8.jpg",
    },
    {
      name: "APT.",
      type: "Đĩa đơn • ROSÉ",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1743000175/Ros%C3%A9_and_Bruno_Mars_-_Apt._g7okns.png",
    },
    {
      name: "rosie",
      type: "Album • ROSÉ",
      image:
        "https://res.cloudinary.com/dcbqh6tx4/image/upload/v1742572572/rosie_glk143.jpg",
    },
  ];

  return (
    <div className="w-72 h-screen bg-black text-white p-4 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Thư viện</h2>
        <div className="flex gap-3">
          <FaPlus className="cursor-pointer" />
          <FaArrowRight className="cursor-pointer" />
        </div>
      </div>

      {/* Playlist List */}
      <div className="space-y-3">
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded-md"
          >
            <img
              src={playlist.image}
              alt={playlist.name}
              className="w-12 h-12 rounded-md"
            />
            <div>
              <h3 className="text-sm font-medium">{playlist.name}</h3>
              <p className="text-xs text-gray-400">{playlist.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
