import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { AlarmSmoke, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AlertBanner from "./AlertBanner";
import { PRODUCT_NAME } from "../utils/extra";
export default function Register() {
  const [name, setName] = useState("");
  const [paswdMatch, setPaswdMatch] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState(""); // Date of Birth state

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("error");

  const navigate = useNavigate();

  const register = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setShowAlert(true);
      return;
    }

    if (!name || !email || !password || !confirmPassword || !dob) {
      setErrorMessage("Please fill all fields first");
      setShowAlert(true);
      return;
    }

    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        dob,
      });
      {
        // Registration successful, navigate to login page
        if (res.status == 201) {
          setErrorMessage("Account Created");
          setShowAlert(true);
          setAlertType("success");
          // alert("Registration Successful");
          setTimeout(() => navigate('/login'), 5000);
        }
      }

    } catch (error) {

      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        console.error('Error from backend:', error.response.data.error);  // Access the error message
        setErrorMessage(error.response.data.error);
        setAlertType("error");
        //alert(error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response from backend:', error.request);
        setErrorMessage(error.response.data.error);
        setAlertType("error");
      } else {
        // Something else triggered an error (e.g., in setting up the request)
        console.error('Error in request:', error.message);
        setErrorMessage(error.response.data.error);
        setAlertType("error");
      }
      setShowAlert(true)
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
        setErrorMessage("");
      }, 5000);

      return () => clearTimeout(timer); // cleanup on unmount
    }
  }, [errorMessage]);

  return (
    <div className="w-screen h-screen flex  bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300">

      {/* Left Side: Content */}
      <div className="w-1/2 p-8 flex flex-col justify-center items-center">
        {/* <img
          src="data:image/jpeg;base64,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jG6ucvTnFTTepEiQs5U9U9DdaTFUwm/QeyRvYJAQQO+O/etHGLVMzUuZ6ItIymo0hpBzZ2sDgyNgD5XEXwJwbxOGWOPYsE6jU7cuZjlLU2sbw4BwNwRcHeCs6d9jIZYxiFD2JW5KVC4QBAWSuIBLRc7Be1+/YgIbp5zhzA+lHuqQYiZ/2LfpR7qtdFMpqKrR9W+9oIm3OsR8IcQHjJ7f0fRdfdgdoWGUWyjptk6lNb/aQwkb2SkHwLVki3zLKMuZF5SUdZPSzwwsYx8jdQOMpAAJAdi1lxdusLjeskZJNNkuLOM5MckdN0GsIHUZY8gujfJIWkjC4tGC02wv2DOwWWdWEt7lVCSPRGOqLC8Db2xtLcX226GSwXRbKc1y+0BXV0DIYWxMtIJH68ps4BrgB0WHab9yyU6kYu7IlBshck9CaboxHC40ktO0+qZZOcaw5iN3NjAYkA3GzAZTOdOWvMiMGjqtJQVEkbmNhYCbWvLhgQdjexaeKp+1pOCe5s4aapVFN8jnhyc0gDcc23+WZzfYxclcMqradv1Os+JUXvC/6Ff/AMDSPWH+Yk91T2dX/M9WR2hh/wAv0Q+L+kesP8xJ7qdnV/zPVjtDD/l+iMLuStaTctiJOZMriTxOoqvhdR7yXqXXFaSVlF+hT4p1nUi+lPuJ2VPvL1J7Wp91j4p1nUi+lPuJ2VPvL1Ha1PusfFOs6kX0p9xOyp95eo7Wp91j4p1nUi+lPuJ2VPvL1Ha1PusfFOs6kX0p9xOyp95eo7Wp91j4p1nUi+lPuJ2VPvL1Ha1PusfFOs6kX0p9xOyp95eo7Wp91lsvJOusdVkGtY2vK619l7R3spjwqV/ekrES4tC2kXc5bSvo10xUOBlfS2GTWyyAC+0fo8+1dvC0qGHVoJ+fM42JrVcQ7zf25GSt9HGl5XMc99L0AGsAkcGNA3N5q2Nsd/DBZqLpUU8ieu75mOrKpVazPY9UkilcwsdTsLXNLHN5wWLSLEerlZUzIrlPJJ/RLXh55t0BYD0C+Vwfq7Na0ZF+C2ViYrUxukzJ/ss0j/230r//AFLN+Nh0ZX2LO55F8l5aCN41BJJIQXv5wAWbfVa0auQu44537lq1q/tGZI08p0DzUWNoW3theXC+y/RWG6LZWag6LqnPL5YIX3IcWiZzWktaGtv0DcDHD95YMl3dmP2be5uAZ/2DfpR7qz3RkymWB8wIvCAMiecBsNptq4qGyyRsFUkIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAID//Z"
          alt="Welcome Image"
          className="rounded-lg shadow-xl absolute opacity-20 w-2xl"
        /> */}
        <div className="text-left max-w-lg">

          <h1 className="text-5xl font-extrabold text-blue-800 mb-4"> Create Your <span className="text-blue-600">{PRODUCT_NAME}</span> Account
          </h1>


          <p className="text-md text-blue-900 mb-6 max-w-md">
            Join thousands of professionals who trust Postly to manage their inbox with speed, clarity, and control.
          </p>
          <ul className="list-disc list-inside text-blue-800 space-y-2 text-sm">
            <li>Instant access to your personalized inbox</li>
            <li>Smart email filtering and search</li>
            <li>Secure cloud-based syncing across devices</li>
          </ul>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-1/2 items-center justify-start pl-12 mt-12" >
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full shadow-md">
              <User size={40} className="text-blue-600" />
            </div>
          </div>


          <h2 className="text-2xl font-bold text-blue-700 mb-6">Create an Account</h2>

          {/* Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-300 text-black"
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-300 text-black"
          />

          {/* Password Input */}

          <div className=" mb-4">

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-300 text-black"
            />

            {/* Confirm Password Input */}
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                (password != e.target.value) ? setPaswdMatch(false) : setPaswdMatch(true);

              }
              }
              className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-300 text-black"
            />
            {!paswdMatch && <p className="text-red-600">Password does not match</p>}
          </div>

          {/* Date of Birth Input */}
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full mb-6 px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:bg-blue-300 focus:ring-blue-500 text-black"
          />

          <button
            onClick={register}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Register
          </button>

          <p className="text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              <a href="/login">Login</a>
            </span>
          </p>
        </div>
      </div>

      {
        showAlert && (
          <AlertBanner message={errorMessage} type={alertType} />
        )
      }

    </div >

  );
}
