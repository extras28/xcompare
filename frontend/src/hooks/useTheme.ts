import { useState, useEffect } from "react";

export const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", isDarkMode ? "dark" : "light");
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return { isDarkMode, toggleTheme };
};
