import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import SidePanel from '../../components/SidePanel';


export default function Login() {
  document.title = "Cipher Bucks • Login";
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // TODO: Replace with actual API call
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex relative">
      {loading && <Loader />}

      {/* Theme Switcher - Fixed top right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      {/* Left Panel */}
      <SidePanel message="Welcome Back!" text="Your digital ledger — secure, simple, encrypted."/>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <div ref={cardRef} className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Login 🔐
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Welcome back! Please enter your details.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            <div className="flex justify-end mb-6">
              <Link to="/forgot-password" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" className="w-full mb-4">
              Login
            </Button>
            <div className='flex justify-center items-center gap-5'>
              <Button type="button" variant="secondary" className="!p-0 overflow-hidden flex items-center justify-center self-center justify-self-center space-x-2 text-xs border border-gray-300 !rounded-full ">
                <span><img className='h-9' src="/images/google-logo.png" alt="Login with Google" /></span>
              </Button>

              <Button type="button" variant="secondary" className="!p-0 overflow-hidden flex items-center justify-center self-center justify-self-center space-x-2 text-xs border border-gray-300 !rounded-full shadow-md">
                <span><img className='h-9 bg-white' src="/images/github-logo.png" alt="Login with GitHub" /></span>
              </Button>
            </div>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
