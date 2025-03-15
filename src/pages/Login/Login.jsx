import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      // console.log("API Response:", response.data); // Tambahkan log ini

      if (response.data && response.data.accesToken) {
        localStorage.setItem("token", response.data.accesToken);
        toast.success("Login berhasil!");
        // console.log("Token disimpan"); //Tambahkan log ini.
        navigate("/");
        // console.log("Navigasi ke dashboard"); //Tambahkan log ini.
      } else {
        setError("Token tidak ditemukan pada respon");
        toast.error("Login gagal");
      }
    } catch (error) {
      // console.error("Login Error:", error); // Tambahkan log ini
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan. Coba lagi nanti.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
