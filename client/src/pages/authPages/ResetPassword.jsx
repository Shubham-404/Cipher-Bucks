import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ThemeSwitcher from '../../components/ThemeSwitcher';

export default function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const [error, setError] = useState('');
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
    setError('');
    // TODO: Call reset-password API with `data.otp` and `data.newPassword`
    // On success, navigate to login
    // navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 max-md:p-4 relative">
      {isSubmitting && <Loader />}
      
      {/* Theme Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      <div ref={cardRef} className="w-full max-w-md max-md:w-[95%] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-md:p-6 border border-gray-100 dark:border-gray-700 shadow-indigo-200/30 dark:shadow-indigo-800/20">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-3xl max-md:text-2xl font-black mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-400 to-indigo-700">
            Reset Password
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-md:text-sm">
            Enter the OTP sent to your email and create a new password
          </p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OTP Code</label>
            <input
              id="otp"
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              className={`w-full px-4 py-3 rounded-lg border ${errors.otp ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              {...register('otp', { required: 'OTP is required', minLength: { value: 6, message: 'Enter 6 digits' }, maxLength: { value: 6, message: 'Enter 6 digits' } })}
            />
            {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              className={`w-full px-4 py-3 rounded-lg border ${errors.newPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              {...register('newPassword', { required: 'New password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
            />
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              {...register('confirmPassword', { required: 'Please confirm your password', validate: (value) => value === watch('newPassword') || 'Passwords do not match' })}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-400 text-white rounded-full font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
