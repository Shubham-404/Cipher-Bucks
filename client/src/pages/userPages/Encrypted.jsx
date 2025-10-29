import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import DashboardNavbar from '../../components/DashboardNavbar';
import Footer from '../../components/partials/Footer';
import Card from '../../components/Card';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Loader from '../../components/Loader';

export default function Encrypted() {
  document.title = "Cipher Bucks • Encrypted Hisabs";
  const [isLocked, setIsLocked] = useState(true);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [encryptedHisabs, setEncryptedHisabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const lockRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (lockRef.current) {
      gsap.fromTo(
        lockRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [isLocked]);

  const handleUnlock = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // TODO: Replace with actual API call
    setTimeout(() => {
      if (passcode === '1234') {
        setEncryptedHisabs([
          { id: 1, title: 'Personal Loan', amount: -50000, date: '2024-01-01', type: 'expense' },
          { id: 2, title: 'Investment Return', amount: 25000, date: '2024-01-05', type: 'income' }
        ]);
        setIsLocked(false);
        setLoading(false);
      } else {
        setError('Incorrect passcode');
        setLoading(false);
      }
    }, 1000);
  };

  const handleLock = () => {
    setIsLocked(true);
    setPasscode('');
    setEncryptedHisabs([]);
  };

  useEffect(() => {
    if (!isLocked && cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [isLocked, encryptedHisabs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-400 dark:from-gray-900 dark:via-indigo-900 dark:to-gray-800">
      {loading && <Loader />}
      <DashboardNavbar />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Encrypted Hisabs 🔐
            </h1>
            <p className="text-white/90">
              Secure your sensitive transactions
            </p>
          </div>
          {!isLocked && (
            <Button onClick={handleLock} variant="secondary" className="rounded-full">
              🔒 Lock
            </Button>
          )}
        </div>

        {/* Locked View */}
        {isLocked ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card ref={lockRef} className="w-full max-w-md">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🔒</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Unlock Encrypted Hisabs
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter your passcode to access encrypted transactions
                </p>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleUnlock}>
                <InputField
                  label="Passcode"
                  type="password"
                  name="passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter 4-digit passcode"
                  className="text-center text-2xl tracking-widest"
                />
                <Button type="submit" variant="primary" className="w-full mt-4">
                  Unlock 🔓
                </Button>
              </form>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Hint: Try 1234 (for demo purposes)
              </p>
            </Card>
          </div>
        ) : (
          /* Unlocked View */
          <div>
            <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg mb-6 max-w-2xl mx-auto">
              ✅ Encrypted hisabs unlocked. Auto-lock after inactivity.
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {encryptedHisabs.map((hisab) => (
                <Card key={hisab.id} className="hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {hisab.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(hisab.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="flex items-center space-x-6">
                      <p
                        className={`text-2xl font-bold ${
                          hisab.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {hisab.amount > 0 ? '+' : ''}₹{Math.abs(hisab.amount).toLocaleString()}
                      </p>

                      <div className="flex space-x-2">
                        <button
                          className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {encryptedHisabs.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔐</div>
                <p className="text-xl text-white">
                  No encrypted hisabs yet. Add sensitive transactions here!
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
