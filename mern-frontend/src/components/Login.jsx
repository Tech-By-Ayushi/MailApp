import React, { useState } from "react";
import axios from "../utils/api";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      console.log(res.data)
      // storing the token in localStorage
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('username', res.data.username);
      if (res.status === 200) {

        try {
          setUserId(res.data.userId);
        } catch (err) {
          console.error(err.message);
        }

        alert("Login Successful");
        navigate('/mails');
      }

    }
    catch (error) {

      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        console.error('Error from backend:', error.response.data.error);  // Access the error message
        alert(error.response.data.error);
      }
      else if (error.request) {
        // The request was made but no response was received
        console.error('No response from backend:', error.request);
      }
      else {
        // Something else triggered an error (e.g., in setting up the request)
        console.error('Error in request:', error.message);
      }
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
            <a href="/register"> Register </a>
          </span>
        </p>
      </div>
    </div>
  );
}
