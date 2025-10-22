export default function Button({ children, variant = 'primary', type = 'button', onClick, className = '', disabled = false }) {
  const variants = {
    primary: 'bg-[#FF4C4C] hover:bg-red-600 text-white',
    secondary: 'bg-gray-400 hover:bg-gray-500 text-white',
    outline: 'border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
