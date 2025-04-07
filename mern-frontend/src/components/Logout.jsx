import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session data
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');

        // Optionally, if you're using a token (like JWT), clear it as well:
        // localStorage.removeItem('authToken');

        // Redirect the user to the login page
        navigate('/login');  // Adjust this if you're using a different route for login
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
            Logout
        </button>
    );
}
