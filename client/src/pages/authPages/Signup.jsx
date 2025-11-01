// Signup.jsx:
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
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
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
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

  const onSubmit = async (data) => {
    setError('');
    // TODO: Call signup API with `data`
    // On success, navigate to verify-email
    // Example:
    // await authService.signup(data);
    // navigate('/verify-email');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen flex relative max-md:p-4 bg-gray-100 dark:bg-gray-900">
      {isSubmitting && <Loader />}

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

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                {...register('email', { required: 'Email is required', pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: 'Enter a valid email' } })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            
            {/* Password field with toggle (UX fix: combine password inputs) */}
            <div className='relative'>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-10`}
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
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
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === watch('password') || 'Passwords do not match'
                })}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Updated Button Styling: Primary CTA now uses Orange theme */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full mt-8 px-6 py-3 
                        bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-400 
                        text-white rounded-full font-semibold shadow-lg transition-all 
                        hover:shadow-xl hover:scale-[1.01] disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Secure Sign Up'}
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