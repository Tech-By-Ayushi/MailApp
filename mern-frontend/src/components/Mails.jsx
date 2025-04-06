import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { Inbox } from "lucide-react";
import LogoutButton from "./Logout";
import { useNavigate } from "react-router-dom";

export default function MailList({ userId }) {
    const [mails, setMails] = useState([]);
    const [isComposing, setIsComposing] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const userName = sessionStorage.getItem('username');

    useEffect(() => {

        if (userName === undefined || userName === null) {
            navigate('/login');
            alert("Login First");
            userId = null;
        }
        if (!userId) return;

        axios
            .get(`/api/mails/${userId}`)
            .then((res) => setMails(res.data))
            .catch((err) => {
                console.error(err);
                alert("Failed to load mails");
            });
    }, [userId]);

    const sendMail = async () => {
        if (!recipient || !subject || !body) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post("/api/mails/send-mail", {
                userId,
                recipient,
                subject,
                body,
            });
            console.log(response.data); // Handle the success response
            setIsComposing(false); // Hide the compose form after sending
            setRecipient("");
            setSubject("");
            setBody("");
            setErrorMessage(""); // Clear the error message
            alert(response.data.message);
            axios.get(`/api/mails/${userId}`).then((res) => setMails(res.data));
        } catch (err) {
            console.error(err);
            setErrorMessage("Failed to send mail.");
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
                {!isComposing ? (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center">
                                <Inbox className="text-blue-600 mr-3" size={32} />
                                <h2 className="text-3xl font-semibold text-blue-700">Welcome {userName}, Your Mails</h2>
                            </div>
                            <button
                                onClick={() => setIsComposing(true)}
                                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                            >
                                Compose
                            </button>
                            <LogoutButton />
                        </div>

                        {mails.length === 0 ? (
                            <p className="text-center text-gray-600">No mails to show.</p>
                        ) : (
                            <div className="space-y-6">
                                {mails.map((mail, index) => (
                                    <div
                                        key={index}
                                        className="bg-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
                                    >
                                        <h4 className="text-xl font-semibold text-blue-800 mb-3">{mail.subject}</h4>
                                        <p className="text-gray-700">{mail.body}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-semibold text-blue-700">Compose Mail</h2>
                        </div>

                        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

                        <input
                            type="email"
                            placeholder="Recipient's Email"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="w-full mb-4 px-5 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />

                        <input
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full mb-4 px-5 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />

                        <textarea
                            placeholder="Body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full mb-6 px-5 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            rows="6"
                        ></textarea>

                        <div className="flex space-x-4">
                            <button
                                onClick={sendMail}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg shadow-md transition-all duration-300 text-black" >
                                Send Mail
                            </button>
                            <button
                                onClick={() => setIsComposing(false)}
                                className="flex-1 bg-gray-300 text-black py-3 rounded-lg hover:bg-gray-400 transition-all duration-300 text-white">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
