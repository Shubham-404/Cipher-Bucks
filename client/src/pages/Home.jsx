// src/pages/Home.jsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export default function Home() {
  document.title = "Vault Book • Home";
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100  dark:bg-gray-900 text-gray-800 dark:text-white max-md:text-sm">
      <div ref={heroRef} className="w-full max-w-6xl px-6 md:px-12 py-12">
        {/* Top Section */}
        <div className="relative flex items-center justify-center gap-6">
          {/* Shield Icon */}
          <div className="w-70 h-60 max-lg:absolute max-lg:w-full bottom-0 -z-1 max-lg:bg-blend-color-burn max-lg:opacity-10 rounded-2xl bg-[url(/images/illustration.png)] bg-center bg-cover flex items-center justify-center">
          </div>

          <div className='flex flex-col min-w-sx p-5 justify-center items-start space-y-6 max-md:space-y-3'>
            <h1 className="text-6xl max-md:text-5xl font-bold">
              Vault Book
            </h1>
            <span className="text-lg max-md:text-sm  text-gray-600 dark:text-gray-300">
              A simple, secure ledger system <br /> by{' '}
              <a
                href="https://github.com/Shubham-404"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-teal-500 hover:underline"
              >
                Shubham-404
              </a>
            </span>

            <p className="max-w-xl text-gray-600 dark:text-gray-400 text-md">
              Vault Book lets you manage multiple hisaabs with optional passcode
              protection and a delightful UI experience.
            </p>

            <Link
              to="/login"
              className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all"
            >
              Start Logging Now
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
          {/* Feature Card */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-teal-500/10 rounded-full text-teal-600 dark:text-teal-400">
                🧾
              </div>
              <h3 className="text-lg font-semibold">Multiple Hisaabs</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Easily manage separate transaction books under your account.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-blue-500/10 rounded-full text-blue-600 dark:text-blue-400">
                🔐
              </div>
              <h3 className="text-lg font-semibold">Encrypted Safety</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Keep your data encrypted and private — only you can access it.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-orange-500/10 rounded-full text-orange-600 dark:text-orange-400">
                🧠
              </div>
              <h3 className="text-lg font-semibold">Intuitive UX</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Minimal, clean, and responsive experience with subtle animations.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-purple-500/10 rounded-full text-purple-600 dark:text-purple-400">
                💜
              </div>
              <h3 className="text-lg font-semibold">Built with ❤️</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Crafted with care using React, Tailwind, and smooth GSAP magic.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}