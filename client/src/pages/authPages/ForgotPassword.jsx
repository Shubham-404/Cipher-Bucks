import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import SidePanel from '../../components/SidePanel';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Replace with actual API call
    setTimeout(() => {
      setLoading(false);
      navigate('/reset-password');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 max-md:p-4 relative">
      {loading && <Loader />}

      {/* Theme Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      <div ref={cardRef} className="w-full max-w-md max-md:w-[95%] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-md:p-6 border border-gray-100 dark:border-gray-700 shadow-indigo-200/30 dark:shadow-indigo-800/20">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔑</div>
          <h2 className="text-3xl max-md:text-2xl font-black mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-400 to-indigo-700">
            Forgot Password?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-md:text-sm">
            No worries! Enter your email and we'll send you an OTP to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-400 text-white rounded-full font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Send OTP'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/login" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
    // </div>
  );
}
