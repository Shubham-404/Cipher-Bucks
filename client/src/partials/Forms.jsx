// src/components/FormsLayout.jsx
const FormsLayout = ({ yourText, children }) => {
  return (
    <div className="bg-indigo-500 grid grid-cols-1 md:grid-cols-2 h-[90svh]">
      <div className="text-white flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold mb-3">KhaataBook</h1>
        <p className="text-lg opacity-90">{yourText}</p>
        <a href="https://github.com/Shubham-404/" target="_blank" className="mt-10 text-md opacity-70">
          By Shubham-404
        </a>
      </div>
      {children}
    </div>
  );
};

export default FormsLayout;
