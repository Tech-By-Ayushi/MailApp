import React, { useState } from "react";
import { Mail, ReceiptIndianRupee } from "lucide-react";
import './components.css'
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";
import AlertBanner from "./AlertBanner.jsx";

import { PRODUCT_NAME } from "../utils/extra.js";

function Login({ setUserId }) {

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function LoginPage(e) {

    try {
      e.preventDefault();

      if (!email || !password) {
        setErrorMessage("Please fill in both fields!");
        return;
      }

      const res = await axios.post("/api/auth/login", { email, password });

      // storing the token in localStorage
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('username', res.data.username);
      sessionStorage.setItem('email', res.data.email);
      sessionStorage.setItem('userId', res.data.userId);

      if (res.status === 200) {
        setUserId(res.data.userId);
        setShowAlert(true);

        setTimeout(() => navigate('/mails'), 1500);
        //alert("Login successful");
      }

    } catch (error) {

      if (error.response) {

        // The server responded with a status code outside the range of 2xx
        console.error('Error from backend:', error.response.data.error);  // Access the error message
        setErrorMessage(error.response.data.error);
        //alert(error.response.data.error);
      }
      else if (error.request) {
        // The request was made but no response was received
        console.error('No response from backend:', error.request);
        setErrorMessage(error.response.data.error);
      }
      else {
        // Something else triggered an error (e.g., in setting up the request)
        console.error('Error in request:', error.message);
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300">

      {/* Left side text content */}
      <div className="w-1/2 flex items-center justify-center px-12">
        <div className="text-left max-w-lg">
          <h1 className="text-5xl font-extrabold text-blue-800 mb-4"> Welcome to <span className="text-blue-600">{PRODUCT_NAME}</span></h1>
          <p className="text-lg text-blue-900 mb-6 max-w-xl">
            Your secure, streamlined, and lightning-fast email client — built for the modern workspace.
          </p>
          <ul className="list-disc list-inside text-blue-800 space-y-2 text-md">
            <li>Effortlessly organize your inbox</li>
            <li>Blazing-fast search and smart filters</li>
            <li>Sync across all your devices seamlessly</li>
          </ul>
        </div>
      </div>

      {/* Right side login form */}
      <div className="w-1/2 flex items-center justify-start pl-12">
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full shadow-md">
              <Mail size={40} className="text-blue-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-blue-700 mb-6">Login</h2>

          <form onSubmit={(e) => LoginPage(e)} className="w-full max-w-sm mx-auto">
            <input
              required
              type="email"
              autoComplete="email"
              placeholder="example@mailapp.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-300 text-black"
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-6 px-4 py-2 border-2 border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-200 text-black"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline cursor-pointer">
              Register
            </a>
          </p>
        </div>
      </div>
      {/* Alert Snackbar */}
      {showAlert &&
        <AlertBanner
          message="Login Successful"
          type="success"
        />
      }

      {errorMessage && (
        <AlertBanner
          message={errorMessage}
          type="error"
        />
      )}

    </div >
  );
};




export default Login;
