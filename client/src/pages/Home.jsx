import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Navbar from '../components/Navbar';

export default function Home() {
  document.title = "Cipher Bucks • Home";
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      featuresRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, delay: 0.3, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#5A5AFB] to-blue-400 py-20" ref={heroRef}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            Cipher Bucks
          </h1>
          <p className="text-2xl text-white mb-2">A simple, secure ledger system</p>
          <p className="text-lg text-blue-100 mb-8">
            by <a href="https://github.com/Shubham-404" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Shubham-404</a> 🔗
          </p>
          
          <p className="text-xl text-white mb-12 max-w-2xl mx-auto">
            Cipher Bucks lets you manage multiple hisaabs with optional passcode protection and a delightful UI experience.
          </p>

          <Link to="/login">
            <button className="bg-[#FF4C4C] hover:bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Start Logging Now 🚀
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" ref={featuresRef}>
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">📓</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Multiple Hisaabs</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Easily manage separate transaction books under your account.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Encrypted Safety</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add passcode protection to sensitive records — unlock only when needed.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Intuitive UX</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Smooth interactions, responsive design, and intelligent show/hide logic.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Built with ❤️</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Crafted by a dev exploring the full-stack journey — Node.js, MongoDB, EJS.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
