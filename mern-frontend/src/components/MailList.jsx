import React, { useEffect, useState } from "react";
import axios from "axios";
import { Inbox } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MailList({ userId }) {
  const [mails, setMails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/mails/${userId}`)
      .then((res) => setMails(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load mails");
      });
  }, [userId]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm text-center">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Inbox className="text-blue-600 mr-2" size={32} />
            <h2 className="text-3xl font-bold text-blue-700">Your Mails</h2>
          </div>
          <button
            onClick={() => navigate("/compose")}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Compose
          </button>
        </div>

        {mails.length === 0 ? (
          <p className="text-center text-gray-600">No mails to show.</p>
        ) : (
          <div className="space-y-6">
            {mails.map((mail, index) => (
              <div
                key={index}
                className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100"
              >
                <h4 className="text-xl font-semibold text-blue-800 mb-2">
                  {mail.subject}
                </h4>
                <p className="text-gray-700">{mail.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
