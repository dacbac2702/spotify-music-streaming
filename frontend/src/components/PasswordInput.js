import { useState } from "react";
import FormLabel from "./FormLabel";

const PasswordInput = ({ id, value, onChange, placeholder, label }) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  return (
    <div className="mb-4 relative">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <input
        type={show ? "text" : "password"}
        id={id}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 pr-10 rounded border border-gray-700 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-500"
      />
      <span
        onClick={toggle}
        className="absolute right-3 top-[33px] cursor-pointer text-sm text-gray-400 hover:text-white"
      >
        {show ? "Ẩn" : "Hiện"}
      </span>
    </div>
  );
};

export default PasswordInput;
