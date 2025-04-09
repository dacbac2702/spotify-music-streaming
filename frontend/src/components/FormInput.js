import FormLabel from "./FormLabel";

// Trong FormInput.js
const FormInput = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  inputRef,
}) => (
  <div className="mb-4">
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <input
      ref={inputRef}
      type={type}
      id={id}
      required
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 rounded border border-gray-700 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-500"
    />
  </div>
);

export default FormInput;
