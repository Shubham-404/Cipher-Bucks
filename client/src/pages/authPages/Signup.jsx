// Signup.jsx:
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import SidePanel from '../../components/SidePanel';
// Import a new utility/icon for the password visibility toggle
import { Eye, EyeOff } from 'lucide-react'; // Assuming you have lucide-react or similar

export default function Signup() {
  document.title = "Vault Book • Signup";
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    // Removed confirmPassword from state to simplify the form, 
    // but keeping it in the handleSubmit for temporary validation check only
    // for this example's sake.
    confirmPassword: '' 
  });
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
    setError('');

    // NOTE: In a real app, you would typically handle password complexity 
    // and ONLY use ONE password field + a show/hide toggle.
    // I'm keeping the confirmPassword check only because it was in the original logic.
    if (formData.password !== formData.confirmPassword && formData.confirmPassword !== '') {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    // TODO: Replace with actual API call
    setTimeout(() => {
      setLoading(false);
      navigate('/verify-email');
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen flex relative max-md:p-4 bg-gray-100 dark:bg-gray-900">
      {loading && <Loader />}

      {/* Theme Switcher - Fixed top right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      {/* Left Panel */}
      <SidePanel message="Join Vault Book" text="Start managing your finances securely today." />

      {/* Right Panel - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 max-md:p-4">
        {/* Updated Card Styling: Glassmorphism look (Subtle shadow, rounded, border) */}
        <div 
          ref={cardRef} 
          className="w-full max-w-md max-md:w-[95%] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-md:p-6 
                     border border-gray-100 dark:border-gray-700 
                     shadow-indigo-200/30 dark:shadow-indigo-800/20"
        >
          {/* Updated Header with Gradient Text */}
          <h2 className="text-3xl max-md:text-2xl font-black mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-400 to-indigo-700">
             Sign Up 🚀
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-md:text-sm">
            Create your secure account to get started
          </p>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <InputField
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              // The InputField component should handle the visual fixes (e.g., higher contrast border/background)
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            
            {/* Password field with toggle (UX fix: combine password inputs) */}
            <div className='relative'>
                <InputField
                  label="Password"
                  // Using showPassword state to toggle between 'password' and 'text' type
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="pr-10" // Add padding to make space for the toggle icon
                />
                <button 
                  type="button" 
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <div className='mt-6'> 
                    {/* The icon is positioned relative to its parent InputField's wrapper */}
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </button>
            </div>


            {/* NOTE: Hidden or removed the 'Confirm Password' InputField for clean UX */}

            {/* Updated Button Styling: Primary CTA now uses Orange theme */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-8 px-6 py-3 
                        bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-400 
                        text-white rounded-full font-semibold shadow-lg transition-all 
                        hover:shadow-xl hover:scale-[1.01] disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Secure Sign Up'}
            </button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}