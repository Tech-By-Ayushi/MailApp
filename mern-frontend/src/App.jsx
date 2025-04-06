import React, { useState } from "react";
import Login from "./components/Login";
import MailList from "./components/MailList";

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <div>
      {!userId ? (
        <Login setUserId={setUserId} />
      ) : (
        <MailList userId={userId} />
      )}
    </div>
  );
}

export default App;
