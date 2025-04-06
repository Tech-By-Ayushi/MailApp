import React, { useState } from "react";
import axios from "axios";
import { Mail } from "lucide-react";

export default function Login({ setUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      setUserId(res.data.userId);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full shadow-md">
            <Mail size={40} className="text-blue-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-blue-700 mb-6">Welcome Back</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-300 text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border-2 border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-200 text-black"
        />

        <button
          onClick={login}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Login
        </button>

        <p className="text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
