import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import SidePanel from '../../components/SidePanel';
import { Eye, EyeOff } from 'lucide-react';


export default function Login() {
  document.title = "Vault Book • Login";
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex relative  mb-2 max-md:p-4 bg-gray-100 dark:bg-gray-900">
      {loading && <Loader />}

      {/* Theme Switcher - Fixed top right */}
      <div className="fixed top-5 right-3 p-5 z-50">
        <ThemeSwitcher />
      </div>

      {/* Left Panel */}
      <SidePanel message="Welcome Back!" text="Your digital ledger — secure, simple, encrypted." />

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 max-md:p-4">
        <div ref={cardRef} className="w-full max-w-md max-md:w-[95%] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-md:p-6 border border-gray-100 dark:border-gray-700 shadow-indigo-200/30 dark:shadow-indigo-800/20">
          <h2 className="text-3xl max-md:text-2xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-400 to-indigo-700">
            Login 🔐
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-md:text-sm">
            Welcome back! Please enter your details.
          </p>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />

            <div className="relative">
              <InputField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <div className="mt-6">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</div>
              </button>
            </div>

            <div className="flex justify-end mb-6">
              <Link to="/forgot-password" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-400 text-white rounded-full font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Login'}
            </button>
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
