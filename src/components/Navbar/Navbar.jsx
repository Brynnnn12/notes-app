import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { toast } from "react-toastify";
import { FiSearch, FiX } from "react-icons/fi";

const Navbar = ({ userInfo, value, onSearchNote }) => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const onLogout = () => {
    localStorage.clear();
    toast.success("Logout Berhasil");
    navigate("/login");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow relative">
      {/* Logo / Judul */}
      <h2
        className={`text-xl font-medium text-black py-2 transition-all ${
          isSearchOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        Notes
      </h2>

      {/* Search Bar (Desktop) */}
      <div className="hidden sm:block">
        <SearchBar
          value={value}
          onChange={({ target }) => onSearchNote(target.value)}
        />
      </div>

      {/* Tombol Search untuk Mobile */}
      <button
        className="sm:hidden p-2 text-black z-10"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        {isSearchOpen ? <FiX size={22} /> : <FiSearch size={22} />}
      </button>

      {/* Search Input untuk Mobile - Overlay di Navbar */}
      <div
        className={`absolute inset-x-0 top-0 h-full bg-white flex items-center px-6 transition-all duration-300 ${
          isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <SearchBar
          value={value}
          onChange={({ target }) => onSearchNote(target.value)}
          handleSearch={() => onSearchNote(value)}
        />
      </div>

      {/* Profile Info */}
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
