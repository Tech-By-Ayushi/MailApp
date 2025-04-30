// AlertBanner.jsx
import React, { useState, useEffect } from 'react';


const typeToBackgroundClass = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
};


const AlertBanner = ({ message, type = "info" }) => {

    const backgroundClass = typeToBackgroundClass[type] || typeToBackgroundClass.info;

    const [hide, setHide] = useState(false);

    setTimeout(() => {
        setHide(true);
    }, 5000)

    return (
        <div className={`${hide ? "hidden" : "fixed"} top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded shadow-md border-l-4 ${backgroundClass}`}
            role="alert" >
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
};

export default AlertBanner;