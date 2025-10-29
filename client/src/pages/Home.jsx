import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Navbar from '../components/Navbar';

export default function Home() {
  document.title = "Cipher Bucks • Home";
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* <Navbar /> */}

      {/* Main Content */}
      <div id="main-content" className="flex justify-center items-center min-h-[85vh]">
        <div
          className="w-full max-w-4xl bg-white dark:bg-gray-700 bg-no-repeat bg-[length:auto_65%] bg-top bg-[url('/images/background.png')] dark:bg-blend-color-burn shadow-2xl rounded-3xl p-10 my-5 text-center space-y-8"
          ref={heroRef}
        >
          <h1 className="text-transparent font-black bg-clip-text bg-gradient-to-r from-indigo-700  via-indigo-400 to-indigo-700 text-4xl md:text-6xl">
            Cipher Bucks
          </h1>
          <p className="text-xl justify-self-center w-75 font-medium text-gray-600 dark:text-white">
            A simple, secure ledger system by <a className="text-red-400 font-bold" target='_blank' href='https://github.com/Shubham-404'>Shubham-404</a>
          </p>
          <p className="text-gray-600 dark:text-white w-90 text-md max-w-2xl mx-auto">
            Cipher Bucks lets you manage multiple hisaabs with optional passcode protection and a delightful UI
            experience.
          </p>
          <Link
            to="/login"
            className="inline-block px-7 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full text-md font-semibold shadow-lg transition-all"
          >
            Start Logging Now 🚀
          </Link>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 text-left">
            {[
              ['🧾 Multiple Hisaabs', 'Easily manage separate transaction books under your account.'],
              ['🔐 Encrypted Safety', 'Add passcode protection to sensitive records — unlock only when needed.'],
              ['🧠 Intuitive UX', 'Smooth interactions, responsive design, and intelligent show/hide logic.'],
              ['👨‍💻 Built with ❤️', 'Crafted by a dev exploring the full-stack journey — Node.js, MongoDB, EJS.']
            ].map(([title, desc]) => (
              <div
                key={title}
                className="bg-indigo-50/20 backdrop-blur-2xl p-6 rounded-xl shadow-inner hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-2">{title}</h2>
                <p className="text-gray-600 dark:text-gray-200 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
