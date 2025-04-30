// tailwind.config.js
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],

    theme: {
        extend: {
            colors: {
                primary: "#1D4ED8",       // e.g. blue-700
                secondary: "#9333EA",     // e.g. purple-600
                accent: "#F59E0B",        // e.g. amber-500
                background: "#F9FAFB",    // light background
                surface: "#FFFFFF",
                muted: "#6B7280",         // gray-500
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                heading: ["Poppins", "sans-serif"],
            },
        },
    },
    darkMode: 'class', // or 'media'
    theme: {
        extend: {
            colors: {
                dark: {
                    background: "#1F2937",
                    surface: "#111827",
                    text: "#F9FAFB",
                },
            },
        },
    },
    plugins: [],
};
