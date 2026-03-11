import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the Context (The empty hub)
const ThemeContext = createContext();

// 2. Create the Provider (The wrapper that holds the state and logic)
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check memory on first load
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.classList.add('dark-mode');
        }
    }, []);

    // The Toggle Switch
    const toggleTheme = () => {
        setIsDarkMode((prev) => {
            const newTheme = !prev;
            if (newTheme) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// 3. Create a custom hook so other components can easily ask for the theme
export const useTheme = () => useContext(ThemeContext);