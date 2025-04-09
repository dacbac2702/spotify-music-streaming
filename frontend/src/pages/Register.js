import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const firstInputRef = useRef(null);
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.passwordConfirm) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Đăng ký thất bại!");
        return;
      }

      toast.success("Đăng ký thành công!");
      setForm({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
    } catch (err) {
      toast.error("Lỗi kết nối đến máy chủ!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        <img
          src="https://res.cloudinary.com/dcbqh6tx4/image/upload/v1742935893/logo-spotify_xhcne4.jpg"
          alt="Logo"
          className="w-16 h-16 mb-1"
        />
        <h1 className="text-3xl font-bold mb-2">Đăng ký để bắt đầu nghe</h1>
        <form onSubmit={handleSubmit} className="w-full text-left capitalize">
          <FormInput
            id="lastName"
            label="Họ"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Họ"
            inputRef={firstInputRef}
          />

          <FormInput
            id="firstName"
            label="Tên"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Tên"
          />
          <FormInput
            id="username"
            label="Tên người dùng"
            value={form.username}
            onChange={handleChange}
            placeholder="Tên người dùng"
          />
          <FormInput
            id="email"
            type="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <PasswordInput
            id="password"
            label="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            placeholder="Mật khẩu"
          />
          <PasswordInput
            id="passwordConfirm"
            label="Xác nhận mật khẩu"
            value={form.passwordConfirm}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition rounded-full py-3 font-bold my-2"
          >
            Đăng ký
          </button>
        </form>

        <div className="flex items-center my-4 w-full">
          <hr className="flex-grow border-gray-700" />
          <hr className="flex-grow border-gray-700" />
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Bạn đã có tài khoản?{" "}
          <a
            href="/login"
            className="text-white underline hover:text-green-500"
          >
            Đăng nhập tại đây.
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
