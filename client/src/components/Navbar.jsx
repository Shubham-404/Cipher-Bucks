import { Link } from 'react-router-dom';
import { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-linear-to-r from-indigo-600/90 to-indigo-500/80 backdrop-blur-md shadow-md rounded-b-lg">
      <div className="container mx-auto px-6 py-1">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-100 dark:text-indigo-100 hover:scale-105 transition-transform">
            <span className='flex justify-center items-center font-semibold text-sm'>

              <img className='h-15 rounded-full' src="/images/logo-no-bg.png" alt="Cipher Bucks Logo" />
              <h2 className='flex flex-col justify-center items-start gap-0'>
                <span>Cipher</span>
                <span>Bucks</span>
              </h2>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/contact" className="text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
              Contact
            </Link>
            <Link to="/login" className="px-4 py-2 text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-[#FF4C4C] hover:bg-red-600 text-white px-4 py-1 rounded-sm font-semibold shadow-md hover:shadow-lg transition-all">
              Sign Up
            </Link>
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 p-2"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
            <Link
              to="/contact"
              className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block bg-[#FF4C4C] hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold text-center transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
