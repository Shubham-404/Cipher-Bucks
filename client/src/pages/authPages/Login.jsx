import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
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
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
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
    // TODO: Call login API with `data.username` and `data.password`
    // On success, set auth state in context and navigate to dashboard
    // Example:
    // const { token } = await authService.login(data);
    // setAuth({ isAuthenticated: true, token });
    // navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex relative  mb-2 max-md:p-4 bg-gray-100 dark:bg-gray-900">
      {isSubmitting && <Loader />}

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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="mb-1">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className={`w-full px-4 py-3 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-10`}
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <div className="mt-6">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</div>
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex justify-end mb-6">
              <Link to="/forgot-password" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-400 text-white rounded-full font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Login'}
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
