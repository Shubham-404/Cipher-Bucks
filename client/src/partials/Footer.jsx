// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p className="text-gray-300">&copy; 2025 <span className="font-semibold text-white">KhaataBook</span>. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://github.com/your-repo" target="_blank" className="text-gray-400 hover:text-white transition">GitHub</a>
          <a href="mailto:contact@khaatabook.app" className="text-gray-400 hover:text-white transition">Contact</a>
          <a href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
