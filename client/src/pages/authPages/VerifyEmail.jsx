import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useForm, Controller } from 'react-hook-form';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ThemeSwitcher from '../../components/ThemeSwitcher';

export default function VerifyEmail() {
  const { control, handleSubmit, getValues, formState: { isSubmitting } } = useForm({
    defaultValues: { code0: '', code1: '', code2: '', code3: '', code4: '', code5: '' }
  });
  const inputRefs = useRef([]);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const onSubmit = async () => {
    const values = getValues();
    const code = `${values.code0}${values.code1}${values.code2}${values.code3}${values.code4}${values.code5}`;
    // TODO: Call verify-email API with `code`
    // On success, set auth state and navigate to dashboard
    // navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 max-md:p-4 relative">
      {isSubmitting && <Loader />}
      
      {/* Theme Switcher & Back Link */}
      <div className="fixed top-4 left-4 z-50">
        <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center space-x-2 max-md:text-sm">
          <span>←</span>
          <span>Home</span>
        </Link>
      </div>
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      <div ref={cardRef} className="w-full max-w-md max-md:w-[95%] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-md:p-6 border border-gray-100 dark:border-gray-700 shadow-indigo-200/30 dark:shadow-indigo-800/20">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-3xl max-md:text-2xl font-black mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-400 to-indigo-700">
            Verify Your Email
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-md:text-sm">
            We've sent a 6-digit code to your email address
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center space-x-3 mb-8">
            {[0,1,2,3,4,5].map((index) => (
              <Controller
                key={index}
                name={`code${index}`}
                control={control}
                rules={{ required: true, maxLength: 1, minLength: 1 }}
                render={({ field }) => (
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={field.value}
                    onChange={(e) => { field.onChange(e); handleChange(index, e.target.value); }}
                    className="w-12 h-12 max-md:w-10 max-md:h-10 max-md:text-lg text-center text-xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                  />
                )}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-400 text-white rounded-full font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.01]"
          >
            Verify Email
          </button>

          <div className="text-center mt-6">
            <button type="button" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              Resend Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
