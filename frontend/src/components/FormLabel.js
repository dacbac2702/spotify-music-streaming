const FormLabel = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-semibold mb-1">
    {children} <span className="text-red-500">*</span>
  </label>
);

export default FormLabel;
