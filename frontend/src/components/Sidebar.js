import { useEffect, useState } from "react";
import { FaPlus, FaArrowRight, FaGlobe } from "react-icons/fa";

const Sidebar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

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
    <>
      {!user ? (
        // Hiển thị khi chưa đăng nhập
        <div className="w-72 bg-neutral-900 text-white p-4 rounded-lg space-y-4">
          <h2 className="text-lg font-bold mb-4">Thư viện</h2>

          {/* Tạo playlist */}
          <div className="bg-neutral-800 rounded-md p-4 space-y-2">
            <p className="font-bold">Tạo danh sách phát đầu tiên của bạn</p>
            <p className="text-sm text-gray-300">
              Rất dễ! Chúng tôi sẽ giúp bạn
            </p>
            <button className="bg-white text-black px-4 py-1 rounded-full font-semibold hover:bg-gray-200 transition">
              Tạo danh sách phát
            </button>
          </div>

          {/* Podcast */}
          <div className="bg-neutral-800 rounded-md p-4 space-y-2">
            <p className="font-bold">Hãy cùng tìm và theo dõi một số podcast</p>
            <p className="text-sm text-gray-300">
              Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới
            </p>
          </div>

          {/* Footer */}
          <div className="text-xs text-gray-400 space-y-2 mt-6">
            <div className="flex flex-wrap gap-x-2">
              <span>Pháp lý</span>
              <span>Trung tâm an toàn và quyền riêng tư</span>
              <span>Chính sách quyền riêng tư</span>
              <span>Cookie</span>
              <span>Giới thiệu Quảng cáo</span>
              <span>Hỗ trợ tiếp cận</span>
            </div>

            <button className="mt-2 px-4 py-1 border border-white rounded-full text-sm font-semibold flex items-center gap-2">
              <FaGlobe className="cursor-pointer" />
              Tiếng Việt
            </button>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Sidebar;
