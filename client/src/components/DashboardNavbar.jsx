import { Link } from 'react-router-dom';
import { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default function DashboardNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-indigo-600 to-indigo-500 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-6 py-1">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 text-2xl font-bold text-white hover:scale-105 transition-transform">
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
            <Link to="/dashboard" className="text-white hover:text-indigo-200 font-medium transition-colors">
              Home
            </Link>
            <Link to="/contact" className="text-white hover:text-indigo-200 font-medium transition-colors">
              Contact Us
            </Link>
            <Link to="/login" className="text-white hover:text-indigo-200 font-medium transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-[#FF4C4C] hover:bg-red-600 text-white px-4 py-1 rounded-sm font-semibold shadow-md hover:shadow-lg transition-all">
              SignUp
            </Link>
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-indigo-400 pt-4">
            <Link
              to="/dashboard"
              className="block text-white hover:text-indigo-200 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="block text-white hover:text-indigo-200 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/login"
              className="block text-white hover:text-indigo-200 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block bg-[#FF4C4C] hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold text-center transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              SignUp
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
