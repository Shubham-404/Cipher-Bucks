import { useState } from 'react';

export default function AddHisaab({ username, today }) {
  const [form, setForm] = useState({
    username: username || '',
    date: today || '',
    amount: '',
    description: '',
    encrypt: false,
    passcode: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Add Hisaab', form);
  };

  return (
    <div className="bg-indigo-500 grid grid-cols-1 md:grid-cols-2 h-[90svh]">
      <div className="text-white flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold mb-3">KhaataBook</h1>
        <p className="text-lg opacity-90">Log every ₹ you spend, encrypted and safe.</p>
        <p className="mt-10 text-md opacity-70">By Shubham-404</p>
      </div>

      <div className="flex items-center justify-center bg-white bg-no-repeat bg-[length:auto_50%] bg-bottom bg-[url('/images/undraw_quiet-street.png')]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-white rounded-xl shadow-md shadow-gray-400 flex flex-col gap-4"
        >
          <h1 className="text-2xl font-semibold text-gray-700 text-center">Add Hisaab 📝</h1>

          <input
            type="date"
            name="date"
            value={form.date}
            max={today}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
          />

          <input
            type="text"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount in ₹ (e.g., 3000)"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description (e.g., Rent, Grocery)"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-24 text-gray-700"
          />

          <div className="flex items-center gap-3">
            <label className="text-gray-600 font-medium">Encrypt?</label>
            <input
              type="checkbox"
              name="encrypt"
              checked={form.encrypt}
              onChange={handleChange}
              className="check h-5 w-5 accent-indigo-500"
            />
            <input
              type="text"
              name="passcode"
              value={form.passcode}
              onChange={handleChange}
              disabled={!form.encrypt}
              placeholder={form.encrypt ? 'Enter Passcode' : 'Enable encryption'}
              className={`flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                form.encrypt ? 'cursor-text' : 'cursor-default'
              } text-gray-700`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl shadow-md transition-all"
          >
            ➕ Add Hisaab
          </button>
        </form>
      </div>
    </div>
  );
}
