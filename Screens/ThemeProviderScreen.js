// import React, { createContext, useState, useContext, useMemo } from 'react';

// const ThemeContext = createContext();

// export const useTheme = () => useContext(ThemeContext);

// export const ThemeProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleTheme = () => setIsDarkMode((prev) => !prev);

//   const theme = useMemo(
//     () => ({
//       background: isDarkMode ? '#333' : '#fff',
//       text: isDarkMode ? '#fff' : '#000',
//       primary: isDarkMode ? '#007AFF' : '#007AFF', // You can adjust primary color based on theme
//     }),
//     [isDarkMode]
//   );

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
