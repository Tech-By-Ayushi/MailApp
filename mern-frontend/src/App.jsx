import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./components/Login";
import Register from "./components/Register";
import MailList from "./components/MailList";
import Mails from "./components/Mails";

function App() {
  const [userId, setUserId] = useState(null);

  return (

    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login setUserId={setUserId} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUserId={setUserId} />} />
          <Route path="/mail" element={<MailList userId={userId} />} />
          <Route path="/mails" element={<MailList userId={userId} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
