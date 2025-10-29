import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom"
import clsx from "classnames";

export default function Navbar({ isAuthenticated = false, userName = "User" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const menuItems = isAuthenticated
    ? [
      { label: "Analysis", href: "#" },
      { label: "Forecast", href: "#" },
      { label: userName, href: "#" },
      { label: "Logout", href: "#" },
    ]
    : [
      { label: "Explore", href: "#" },
      { label: "Login", href: "#" },
      { label: "Register", href: "#" },
    ];

  return (
    <nav
      className={clsx(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl md:w-3/4  ",
        "rounded-2xl px-6 py-3 glass transition-all duration-300 flex items-center justify-between shadow-lg"
      )}
    >
      {/* LOGO */}
      <Link to={'/'} className="text-md text-white-600 hover:scale-110 active:scale:90">
        <span className="flex items-center justify-center">
          <img className="h-10 rounded-full" src="/images/logo-no-bg.png" alt="logo" />
          {/* <span className="flex flex-col items-center justify-center">
            <span>Cipher</span>
            <span>Bucks</span>
          </span> */}
        </span>
      </Link >

      {/* DESKTOP LINKS */}
      <div className=" md:flex items-center space-x-6">
        <Link to="/about" className="text-gray-800 dark:text-gray-200 hover:text-indigo-500">
          About Us
        </Link>
        <Link to="/contact" className="text-gray-800 dark:text-gray-200 hover:text-indigo-500">
          Contact
        </Link>

        {/* THEME TOGGLER */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-800 transition"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600" />
          )}
        </button>
      </div>

      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-indigo-600 dark:text-indigo-400">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div
        className={clsx(
          "absolute top-full left-0 w-full rounded-b-2xl glass backdrop-blur-md shadow-md",
          "flex flex-col items-start p-4 space-y-3 transition-all duration-300",
          menuOpen ? "opacity-100 translate-y-2" : "opacity-0 pointer-events-none -translate-y-2"
        )}
      >
        <a href="#about" className="block text-gray-800 dark:text-gray-200 hover:text-indigo-500">
          About Us
        </a>
        <a href="#contact" className="block text-gray-800 dark:text-gray-200 hover:text-indigo-500">
          Contact
        </a>

        <hr className="w-full border-gray-300 dark:border-gray-700" />

        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="block text-gray-800 dark:text-gray-200 hover:text-indigo-500"
          >
            {item.label}
          </a>
        ))}

        {/* THEME TOGGLER */}
        <button
          onClick={toggleTheme}
          className="mt-3 p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-800 transition self-center"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600" />
          )}
        </button>
      </div>
    </nav>
  );
}
