import React from "react";

const InputField = ({
  label,
  type,
  value,
  onChange,
  errors,
  success,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors ? "border-red-500" : ""
        } ${success ? "border-green-500" : ""}`}
        placeholder={placeholder}
      />
      {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
    </div>
  );
};

export default InputField;
