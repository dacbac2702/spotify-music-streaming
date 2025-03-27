import React from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-10 py-8">
      {/* Phần trên: 4 danh mục + Mạng xã hội */}
      <div className="grid grid-cols-5 gap-6 mb-6">
        {/* Cột 1 */}
        <div>
          <h3 className="text-lg font-bold mb-2">Công ty</h3>
          <ul className="text-gray-400 space-y-1">
            <li>
              <a href="#">Giới thiệu</a>
            </li>
            <li>
              <a href="#">Việc làm</a>
            </li>
            <li>
              <a href="#">For the Record</a>
            </li>
          </ul>
        </div>

        {/* Cột 2 */}
        <div>
          <h3 className="text-lg font-bold mb-2">Cộng đồng</h3>
          <ul className="text-gray-400 space-y-1">
            <li>
              <a href="#">Dành cho các Nghệ sĩ</a>
            </li>
            <li>
              <a href="#">Nhà phát triển</a>
            </li>
            <li>
              <a href="#">Quảng cáo</a>
            </li>
            <li>
              <a href="#">Nhà đầu tư</a>
            </li>
            <li>
              <a href="#">Nhà cung cấp</a>
            </li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h3 className="text-lg font-bold mb-2">Liên kết hữu ích</h3>
          <ul className="text-gray-400 space-y-1">
            <li>
              <a href="#">Hỗ trợ</a>
            </li>
            <li>
              <a href="#">Ứng dụng Di động Miễn phí</a>
            </li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div>
          <h3 className="text-lg font-bold mb-2">Các gói của Spotify</h3>
          <ul className="text-gray-400 space-y-1">
            <li>
              <a href="#">Premium Individual</a>
            </li>
            <li>
              <a href="#">Premium Student</a>
            </li>
            <li>
              <a href="#">Spotify Free</a>
            </li>
          </ul>
        </div>

        {/* Cột 5: Mạng xã hội */}
        <div className="flex items-start justify-end space-x-4">
          <a href="#" className="p-2 bg-gray-800 rounded-full">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="p-2 bg-gray-800 rounded-full">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="p-2 bg-gray-800 rounded-full">
            <FaFacebook size={20} />
          </a>
        </div>
      </div>

      {/* Đường kẻ ngang */}
      <hr className="border-gray-700 mb-6" />

      {/* Phần dưới: Thông tin pháp lý */}
      <div className="flex flex-wrap justify-between text-gray-400 text-sm">
        <div className="space-x-4 mb-2">
          <a href="#">Pháp lý</a>
          <a href="#">Trung tâm an toàn và quyền riêng tư</a>
          <a href="#">Chính sách quyền riêng tư</a>
          <a href="#">Cookie</a>
          <a href="#">Giới thiệu Quảng cáo</a>
          <a href="#">Hỗ trợ tiếp cận</a>
        </div>
        <div>&copy; 2025 Spotify AB</div>
      </div>
    </footer>
  );
};

export default Footer;
