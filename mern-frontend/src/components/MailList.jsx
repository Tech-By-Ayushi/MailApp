import React, { useEffect, useState } from "react";
import axios from "../utils/api";

import { Inbox, Pencil, Send, Trash, Menu, Search, Mail, MenuIcon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_NAME } from "../utils/extra";
import LogoutButton from "./Logout";
import AlertBanner from "./AlertBanner";

export default function MailList({ userId }) {
  const navigate = useNavigate();

  const [mails, setMails] = useState([]);
  const [mailData, setMailData] = useState({});
  const [fullName, setfullName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(true);
  const [IsComposing, setIsComposing] = useState(false);
  const [IsReading, setIsReading] = useState(false);


  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [mailSent, setMailSent] = useState(false);


  useEffect(() => {
    if (!userId) {
      userId = sessionStorage.getItem('userId');
    }

    const mailList = sessionStorage.getItem('mailList');
    const userName = sessionStorage.getItem('username');
    const userEmail = sessionStorage.getItem('email');

    if (!mailList) {
      axios
        .get(`http://localhost:5000/api/mails/${userId}`)
        .then((res) => {
          let mails = res.data;
          mails.sort((a, b) => new Date(b.time) - new Date(a.time));
          setMails(mails);
        })
        .catch((err) => {
          console.error(err);
          setAlertMessage("Failed to load mails");
          //alert("Failed to load mails");
        });
    }
    else {
      setMails(mailList);
    }

    if (!userName || !userEmail) {
      setAlertMessage("No login data");
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    }

    setfullName(sessionStorage.getItem('username'));
    setUserEmail(sessionStorage.getItem('email'));

    sessionStorage.setItem('mailList', mails);

  }, []);


  useEffect(() => {
    if (alertMessage.length > 0) {
      const timer = setTimeout(() => setAlertMessage(""), 5000);
      console.log(alertMessage);

      return () => clearTimeout(timer); // clean up if component unmounts
    }
  }, [alertMessage])

  // Function to Search mails : will implemnt later :)
  function handleMailSearch() {

  }

  async function sendMail() {

    if (!recipient || !subject || !body) {
      setAlertMessage("Please fill in all fields.");
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

      setAlertMessage(response.data.message); // Clear the error message

      if (response.status === 201)
        setMailSent(true);

      else setMailSent(false);

      axios.get(`/api/mails/${userId}`).then((res) => setMails(res.data));
    } catch (err) {
      console.error(err);
      setAlertMessage(err.response.data.message);
      setMailSent(false)
    }
  }

  return (

    <div className="w-screen h-screen flex flex-col overflow-hidden bg-linear-180 from-blue-200 to-blue-500 text-gray-900">
      {/* TOP BAR */}
      <nav className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 shrink-0 w-full shadow-md">

        {/* LOGO WITH NAME */}
        <div onClick={() => setOpenDrawer(!openDrawer)} className="mr-4 cursor-pointer">
          <MenuIcon />
        </div>
        <a href="/" className="flex items-center space-x-3">
          <Mail className="h-8" />
          <span className="text-2xl font-bold">{PRODUCT_NAME}</span>
        </a>

        <div className="flex flex-grow justify-end items-center gap-4 px-4">

          {/* SEARCH BAR  */}
          {/* <form onChange={handleMailSearch} className="w-1/4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M12.9 14.32a8 8 0 1 1 1.414-1.414l4.386 4.386-1.414 1.414-4.386-4.386zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search mails..."
                className="w-full pl-10 p-2 rounded border border-blue-300 bg-white focus:ring-2 focus:ring-blue-400 text-gray-900"
              />
            </div>
          </form> */}

          {/* Profile Button */}
          <div
            onClick={() => setOpenUserMenu(!openUserMenu)}
            className="p-2 bg-blue-200 hover:bg-blue-300 rounded-full cursor-pointer relative"
          >
            <User />
            {openUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50">
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-800">{fullName}</p>
                  <p className="text-sm text-gray-500">{userEmail}</p>
                </div>
                <ul>
                  <li className="px-4 py-2 hover:bg-blue-50">
                    <LogoutButton />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN LAYOUT */}
      <div className="flex flex-grow overflow-hidden">
        {/* SIDEBAR */}
        {openDrawer && (
          <div className="w-64 h-full rounded-r-2xl my-2 bg-blue-100 p-4 flex flex-col border-r border-blue-200">
            <button
              onClick={() => setIsComposing(!IsComposing)}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full mb-6 shadow"
            >
              <Pencil size={18} /> Compose
            </button>
            <nav className="space-y-3 text-blue-800">
              <div className="flex items-center gap-2 p-2 hover:bg-blue-100 rounded cursor-pointer">
                <Inbox size={20} /> Inbox
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-blue-100 rounded cursor-pointer">
                <Send size={20} /> Sent
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-blue-100 rounded cursor-pointer">
                <Trash size={20} /> Trash
              </div>
            </nav>
          </div>
        )}

        {/* CONTENT AREA */}
        <div className="flex-grow m-2 rounded-2xl bg-blue-50 p-4 overflow-y-auto border border-blue-100">
          <ul className="divide-y divide-blue-100">
            {mails.map((mail, index) => (
              <li
                onClick={(e) => { setIsReading(true); setMailData(mail) }}
                key={index}
                className="flex justify-between items-center px-4 py-4 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                {/* Sender & Subject */}
                <div className="flex items-center space-x-4 w-2/3">
                  <img
                    src={mail.avatar || './profile-user.png'}
                    alt="Sender Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-blue-900">{mail.subject}</p>
                    <p className="text-sm text-gray-700 truncate max-w-xs">{mail.from.email}</p>
                  </div>
                </div>

                {/* Preview Body (Short) */}
                <div className="hidden md:block w-1/3">
                  <p className="text-sm text-gray-600 truncate">{mail.body}</p>
                </div>

                {/* Timestamp */}
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {formatDateTime(mail.time) || '--'}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {
          true && (
            <ReadMail reading={IsReading} mailData={mailData} />
          )
        }

        {/* COMPOSE MAIL */}
        {IsComposing && (
          <div className="md:max-w-1/3 m-2 p-8 bg-white rounded-2xl shadow-xl absolute left-1 bottom-1 transition-all duration-500 ease-in-out border border-blue-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-700">Compose Mail</h2>
              <p className="text-gray-600 mt-2">Send a message to your recipient</p>
            </div>

            <div className="space-y-6">
              <input
                type="email"
                placeholder="Recipient's Email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-5 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />

              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-5 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />

              <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows="6"
                className="w-full px-5 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              ></textarea>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <button
                onClick={sendMail}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg shadow-lg transition-all duration-300"
              >
                Send Mail
              </button>
              <button
                onClick={() => setIsComposing(false)}
                className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 py-3 rounded-lg shadow-inner transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {alertMessage.length > 0 && (
          <AlertBanner
            message={alertMessage}
            type={mailSent ? "success" : "error"}
            hide={false}
          />
        )}

      </div>

    </div>


  );
}

function ReadMail(props) {

  const reading = props.reading || false;
  const { subject = "Test subject", body = "TEST BODY", time = "23", from = { name: "Unknown", email: "unknown@example.com" } } = props.mailData || {};

  return (
    <div className={`${reading ? "w-1/2" : "w-1/4"} mr-2 my-2 bg-white shadow-md rounded-2xl p-6 border border-gray-200`}>

      {!reading ? <div className="h-full flex items-center justify-center">Open Mail</div> : <>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Subject: {subject}</h2>
            <p className="text-sm text-gray-500">From: {from.name} &lt;{from.email}&gt;</p>
          </div>
          <span className="text-sm text-gray-400"></span>
        </div>
        <hr className="mb-4" />
        <div className="prose prose-sm text-gray-700 max-w-none">
          <p>{body}</p>
        </div>
      </>
      }
    </div>
  )
}


function formatDateTime(isoDateString) {
  const date = new Date(isoDateString);

  const options = {
    month: 'short',    // Jan, Feb, etc.
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}
