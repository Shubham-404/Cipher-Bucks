import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import DashboardNavbar from '../../components/DashboardNavbar';
import Footer from '../../components/partials/Footer';
import Loader from '../../components/Loader';

export default function Dashboard() {
  document.title = "Cipher Bucks • Dashboard";
  const [user, setUser] = useState({ name: 'User' });
  const [hisabs, setHisabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unlockPasscodes, setUnlockPasscodes] = useState({});
  const navigate = useNavigate();
  const greetingRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // TODO: Fetch user data and hisabs from API
    setTimeout(() => {
      setUser({ name: 'Shubham Singh' });
      setHisabs([
        { 
          id: 1, 
          amount: 3000, 
          description: '1234r', 
          encrypted: false, 
          updatedAt: '2025-05-28', 
          createdAt: '2025-05-28' 
        },
        { 
          id: 2, 
          amount: 47, 
          description: 'chocolate. shampoo', 
          encrypted: false, 
          updatedAt: '2025-05-29', 
          createdAt: '2025-05-29' 
        },
        { 
          id: 3, 
          amount: 1234, 
          description: 'locked data', 
          encrypted: true, 
          passcode: 'secret',
          updatedAt: '2025-05-28', 
          createdAt: '2025-05-27' 
        },
        { 
          id: 4, 
          amount: 500, 
          description: 'sdf', 
          encrypted: false, 
          updatedAt: '2025-05-29', 
          createdAt: '2025-05-29' 
        },
        { 
          id: 5, 
          amount: 999, 
          description: 'another encrypted', 
          encrypted: true, 
          passcode: 'pass',
          updatedAt: '2025-05-30', 
          createdAt: '2025-05-30' 
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        greetingRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
      
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
        );
      }
    }
  }, [loading]);

  const handleUnlock = (id, passcode) => {
    const hisab = hisabs.find(h => h.id === id);
    if (hisab && hisab.passcode === passcode) {
      return true;
    }
    return false;
  };

  const handlePasscodeChange = (id, value) => {
    setUnlockPasscodes({ ...unlockPasscodes, [id]: value });
  };

  const handleEdit = (id) => {
    navigate(`/edit-hisab/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this hisaab?')) {
      setHisabs(hisabs.filter(h => h.id !== id));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-400 dark:from-gray-900 dark:via-indigo-900 dark:to-gray-800">
      <DashboardNavbar />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div ref={greetingRef} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome back, {user.name} 👋
          </h1>
        </div>

        {/* Your Hisaabs Title & Add Button */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center flex-1">
            Your Hisaabs
          </h2>
          <button
            onClick={() => navigate('/add-hisab')}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            + Add New Hisaab
          </button>
        </div>

        {/* Hisaabs Grid */}
        {hisabs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-white">
              No hisaabs yet. Add your first transaction!
            </p>
          </div>
        ) : (
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hisabs.map((hisab) => (
              <HisaabCard
                key={hisab.id}
                hisab={hisab}
                passcode={unlockPasscodes[hisab.id] || ''}
                onPasscodeChange={handlePasscodeChange}
                onUnlock={handleUnlock}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

// Hisaab Card Component
function HisaabCard({ hisab, passcode, onPasscodeChange, onUnlock, onEdit, onDelete }) {
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

  const handleUnlockClick = () => {
    if (onUnlock(hisab.id, passcode)) {
      setUnlocked(true);
      setError('');
    } else {
      setError('Incorrect passcode');
      setTimeout(() => setError(''), 2000);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-indigo-300/40 dark:hover:shadow-indigo-900/40 transition-all p-6">
      {/* Card Header */}
      <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        {hisab.encrypted && !unlocked ? (
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Encrypted</span>
            <span className="text-xl">🔒</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Not Encrypted</span>
            <span className="text-xl">🔓</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="text-gray-700 dark:text-gray-300 space-y-2 mb-4">
        {hisab.encrypted && !unlocked ? (
          <div className="text-center py-4">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <span className="text-4xl">🔒</span>
              <p className="mt-2">Enter passcode to unlock.</p>
            </div>
            <input
              type="password"
              value={passcode}
              onChange={(e) => onPasscodeChange(hisab.id, e.target.value)}
              placeholder="passcode"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-2"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              onClick={handleUnlockClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <span>🔑</span> Unlock
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[80px]">Amount:</span>
              <span>₹{hisab.amount}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[80px]">Description:</span>
              <span className="break-words">{hisab.description}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[80px]">Updated:</span>
              <span>{formatDate(hisab.updatedAt)}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[80px]">CreatedAt:</span>
              <span>{formatDate(hisab.createdAt)}</span>
            </div>
          </>
        )}
      </div>

      {/* Card Actions */}
      <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
        {hisab.encrypted && (
          <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-semibold mr-auto">
            {unlocked ? 'Unlocked' : 'Encrypted'}
          </span>
        )}
        <button
          onClick={() => onEdit(hisab.id)}
          className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition-colors"
          title="Edit"
        >
          🖊️
        </button>
        <button
          onClick={() => onDelete(hisab.id)}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
