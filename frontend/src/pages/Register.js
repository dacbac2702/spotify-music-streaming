import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        <img
          src="https://res.cloudinary.com/dcbqh6tx4/image/upload/v1742935893/logo-spotify_xhcne4.jpg"
          alt="Logo"
          className="w-16 h-16 mb-1"
        />
        <h1 className="text-3xl font-bold mb-2">Đăng ký để bắt đầu nghe</h1>
        <form className="w-full text-left capitalize">
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold mb-1"
            >
              Họ
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Họ"
              className="w-full p-2 rounded border border-gray-700 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold mb-1"
            >
              Tên
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Tên"
              className="w-full p-2 rounded border border-gray-700 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold mb-1"
            >
              Tên người dùng
            </label>
            <input
              type="text"
              id="username"
              placeholder="Tên người dùng"
              className="w-full p-2 rounded border border-gray-700 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Địa chỉ email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Địa chỉ email"
              className="w-full p-2 rounded border border-gray-700 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              placeholder="Mật khẩu"
              className="w-full p-2 rounded border border-gray-700 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-semibold mb-1"
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="passwordConfirm"
              placeholder="Xác nhận mật khẩu"
              className="w-full p-2 rounded border border-gray-700 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>

          <button className="w-full bg-green-500 hover:bg-green-600 transition rounded-full py-3 font-bold my-2">
            Đăng ký
          </button>
        </form>
        <div className="flex items-center my-4 w-full">
          <hr className="flex-grow border-gray-700" />
          <hr className="flex-grow border-gray-700" />
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Bạn đã có tài khoản?{" "}
          <a href="#" className="text-white underline hover:text-green-500">
            Đăng nhập tại đây.
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
