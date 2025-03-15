import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toogleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-2 rounded mb-2">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        type={showPassword ? "text" : "password"}
        className="w-full bg-transparent py-3 mr-3 rounded text-sm outline-none"
      />
      {showPassword ? (
        <FaRegEye
          size={22}
          className="cursor-pointer"
          onClick={toogleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="cursor-pointer"
          onClick={toogleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
