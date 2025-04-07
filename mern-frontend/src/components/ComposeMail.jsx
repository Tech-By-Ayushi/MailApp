import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ComposeMail({ userId }) {
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const sendMail = async () => {
        if (!recipient || !subject || !body) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/send-mail", {
                userId,
                recipient,
                subject,
                body,
            });
            console.log(response.data); // Handle the success response
            navigate("/mails"); // Redirect to the mail list page after sending
        } catch (err) {
            console.error(err);
            setErrorMessage("Failed to send mail.");
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-blue-700">Compose Mail</h2>
                </div>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <input
                    type="email"
                    placeholder="Recipient's Email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full mb-6 px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                ></textarea>

                <button
                    onClick={sendMail}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                    Send Mail
                </button>
            </div>
        </div>
    );
}
