import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import SidePanel from '../../components/SidePanel';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  const onSubmit = async (data) => {
    // TODO: Call forgot-password API with `data.email`
    // On success, navigate to reset-password
    // navigate('/reset-password');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 max-md:p-4 relative">
      {isSubmitting && <Loader />}

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              {...register('email', { required: 'Email is required', pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: 'Enter a valid email' } })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-400 text-white rounded-full font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Send OTP'}
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
