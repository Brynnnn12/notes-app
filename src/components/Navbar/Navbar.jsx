import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { toast } from "react-toastify";

const Navbar = ({ userInfo, value, onSearchNote }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    toast.success("Logout Berhasil");
    navigate("/login");
  };

  const onClearSearch = () => {
    onSearchNote(""); // Reset pencarian di Home
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <SearchBar
        value={value} // Gunakan prop value dari Home
        onChange={({ target }) => onSearchNote(target.value)} // Langsung update searchQuery di Home
        handleSearch={() => onSearchNote(value)} // Tidak perlu pakai state lokal
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
