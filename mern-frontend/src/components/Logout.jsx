import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session data
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('mailList');
        sessionStorage.removeItem('userId');

        // Optionally, if you're using a token (like JWT), clear it as well:
        // localStorage.removeItem('authToken');

        // Redirect the user to the login page
        navigate('/login');  // Adjust this if you're using a different route for login
    };

    return (
        <div
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left hover:bg-blue-500 "
        >
            Logout
        </div>
    );
}
