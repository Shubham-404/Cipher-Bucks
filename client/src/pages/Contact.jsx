import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function Contact() {
  document.title = "Vault Book • Contact Us";
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* <Navbar /> */}

      <div className="container mx-auto px-6 py-10">
        <div ref={cardRef} className="max-w-2xl mx-auto">
          <Card>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📧</div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Have questions? We'd love to hear from you!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">👤</div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Developer</p>
                  <p className="text-gray-600 dark:text-gray-400">Shubham-404</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-3xl">💻</div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">GitHub</p>
                  <a
                    href="https://github.com/Shubham-404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    github.com/Shubham-404
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-3xl">📬</div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                  <p className="text-gray-600 dark:text-gray-400">contact@cipherbucks.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-600 dark:text-gray-400">
                Built with ❤️ using React, Vite, TailwindCSS, and GSAP
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
