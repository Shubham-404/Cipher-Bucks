import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import DashboardNavbar from '../../components/DashboardNavbar';
import Footer from '../../components/partials/Footer';
import Card from '../../components/Card';
import Button from '../../components/Button';
import InputField from '../../components/InputField';

export default function Settings() {
  document.title = "Cipher Bucks • Settings";
  const [profile, setProfile] = useState({
    name: 'Shubham',
    email: 'user@example.com',
    username: 'shubham404'
  });
  const [autoLockTimeout, setAutoLockTimeout] = useState('5');
  const [saved, setSaved] = useState(false);
  const cardsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }
    );
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // TODO: Save to API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    // TODO: Save to API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-400 dark:from-gray-900 dark:via-indigo-900 dark:to-gray-800">
      {/* <DashboardNavbar /> */}

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Settings ⚙️
          </h1>
          <p className="text-white/90">
            Manage your account and preferences
          </p>
        </div>

        {saved && (
          <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg mb-6 max-w-2xl mx-auto">
            ✅ Settings saved successfully!
          </div>
        )}

        <div ref={cardsRef} className="space-y-6 max-w-2xl mx-auto">
          {/* Profile Settings */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Profile Information
            </h2>
            <form onSubmit={handleSaveProfile}>
              <InputField
                label="Full Name"
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                placeholder="Your name"
              />

              <InputField
                label="Email"
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="your.email@example.com"
              />

              <InputField
                label="Username"
                type="text"
                name="username"
                value={profile.username}
                onChange={handleProfileChange}
                placeholder="username"
              />

              <Button type="submit" variant="primary" className="mt-4">
                Save Profile
              </Button>
            </form>
          </Card>

          {/* Security Settings */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Security
            </h2>
            <form onSubmit={handleSavePreferences}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Auto-lock Timeout (minutes)
                </label>
                <select
                  value={autoLockTimeout}
                  onChange={(e) => setAutoLockTimeout(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="1">1 minute</option>
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="never">Never</option>
                </select>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Automatically lock encrypted hisabs after inactivity
                </p>
              </div>

              <Button type="submit" variant="primary">
                Save Security Settings
              </Button>
            </form>
          </Card>

          {/* Theme Settings */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Appearance
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Theme automatically adjusts based on your system preference. Use the theme toggle in the navbar to manually switch.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">☀️</span>
                <span className="text-gray-700 dark:text-gray-300">Light</span>
              </div>
              <div className="text-gray-400">•</div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌙</span>
                <span className="text-gray-700 dark:text-gray-300">Dark</span>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="border-2 border-red-500 dark:border-red-700">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Danger Zone
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="primary" className="bg-red-600 hover:bg-red-700">
              Delete Account
            </Button>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
