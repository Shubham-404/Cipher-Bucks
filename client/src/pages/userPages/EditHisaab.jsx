import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import SidePanel from '../../components/SidePanel';

export default function EditHisaab() {
  document.title = "Cipher Bucks • Edit Hisaab";
  const { id } = useParams();
  const today = new Date().toISOString().split('T')[0];
  
  const [form, setForm] = useState({
    date: today,
    amount: '',
    description: '',
    encrypt: false,
    passcode: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    // TODO: Fetch hisaab data from API
    setTimeout(() => {
      // Mock data - replace with actual API call
      setForm({
        date: '2025-05-28',
        amount: '3000',
        description: 'Sample hisaab',
        encrypt: false,
        passcode: ''
      });
      setLoading(false);
    }, 500);
  }, [id]);

  useEffect(() => {
    if (!loading && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [loading]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.encrypt && !form.passcode) {
      setError('Please enter a passcode for encryption');
      return;
    }

    setSaving(true);

    // TODO: Replace with actual API call
    setTimeout(() => {
      setSaving(false);
      navigate('/dashboard');
    }, 1500);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex relative">
      {saving && <Loader />}

      {/* Theme Switcher - Fixed top right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      {/* Left Panel */}
      <SidePanel message="Edit Hisaab" text="Update your transaction details with ease." />

      {/* Right Panel - Edit Hisaab Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <div ref={cardRef} className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Edit Hisaab ✏️
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Update your transaction details
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField
              label="Date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              max={today}
            />

            <InputField
              label="Amount (₹)"
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g., 3000"
            />

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="e.g., Rent, Grocery, Utilities"
                rows="3"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  id="encrypt"
                  name="encrypt"
                  checked={form.encrypt}
                  onChange={handleChange}
                  className="w-5 h-5 accent-indigo-500"
                />
                <label htmlFor="encrypt" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  🔐 Encrypt this hisaab?
                </label>
              </div>
              
              {form.encrypt && (
                <InputField
                  label="Passcode"
                  type="password"
                  name="passcode"
                  value={form.passcode}
                  onChange={handleChange}
                  placeholder="Enter passcode"
                />
              )}
            </div>

            <Button type="submit" variant="primary" className="w-full">
              💾 Save Changes
            </Button>

            <Button 
              type="button" 
              variant="secondary" 
              className="w-full mt-3"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
