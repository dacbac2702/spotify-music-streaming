import React, { useState, useRef, useEffect } from "react";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const firstInputRef = useRef(null);
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Server response:", data);
      if (res.ok) {
        toast.success("Đăng nhập thành công!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        toast.error(data.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      toast.error("Lỗi kết nối đến máy chủ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
      <div className="bg-black p-8 rounded shadow-md w-full max-w-md flex flex-col items-center text-center">
        <img
          src="https://res.cloudinary.com/dcbqh6tx4/image/upload/v1742935893/logo-spotify_xhcne4.jpg"
          alt="Logo"
          className="w-16 h-16 mb-1"
        />
        <h1 className="text-3xl font-bold text-center mb-6">
          Đăng nhập vào Spotify
        </h1>

        <form onSubmit={handleSubmit} className="w-full text-left capitalize">
          <FormInput
            label="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            inputRef={firstInputRef}
          />
          <PasswordInput
            id="password"
            label="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mật khẩu"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-4 rounded-full hover:bg-green-600 transition  font-bold my-4"
          >
            Đăng nhập
          </button>
        </form>

        <div className="flex items-center my-4 w-full">
          <hr className="flex-grow border-gray-700" />
          <hr className="flex-grow border-gray-700" />
        </div>

        <p className="text-sm text-gray-400 my-4">
          Bạn chưa có tài khoản?{" "}
          <a
            href="/register"
            className="text-white underline hover:text-green-500"
          >
            Đăng ký Spotify
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
