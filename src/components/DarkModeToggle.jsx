import  { useEffect, useState } from "react";
import "./DarkModeToggle.css"; // Add custom styles for light and dark modes

const DarkModeToggle = () => {
  // Initialize state with saved theme or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : prefersDark;
  });

  // Toggle dark mode and update localStorage
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  // Apply/remove dark mode class to body on state change
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="dark-mode-toggle">
      <label className="toggle-label">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          aria-label="Toggle dark mode"
        />
        <span className="slider"></span>
        {isDarkMode ? "🌙 Dark Mode" : "🔆 Light Mode"}
      </label>
    </div>
  );
};

export default DarkModeToggle;
