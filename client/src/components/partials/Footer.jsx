// src/components/Footer.jsx
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 dark:bg-indigo-900/30 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p className="text-gray-300">&copy; 2025 <span className="font-semibold text-white">Vault Book</span>. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://github.com/Shubham-404/Cipher-Bucks" target="_blank" className="text-gray-400 hover:text-white transition">GitHub</a>
          <a href="mailto:help.cipher-bucks@shubham.app" className="text-gray-400 hover:text-white transition">Contact</a>
          <Link to="/privacy" className="text-gray-400 hover:text-white transition">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
