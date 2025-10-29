import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import DashboardNavbar from '../../components/DashboardNavbar';
import Footer from '../../components/partials/Footer';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

export default function Hisabs() {
  document.title = "Cipher Bucks • Hisabs";
  const [hisabs, setHisabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cardsRef = useRef(null);

  useEffect(() => {
    // TODO: Fetch hisabs from API
    setTimeout(() => {
      setHisabs([
        { id: 1, title: 'Grocery Shopping', amount: -500, date: '2024-01-15', type: 'expense', category: 'Food' },
        { id: 2, title: 'Salary', amount: 50000, date: '2024-01-01', type: 'income', category: 'Salary' },
        { id: 3, title: 'Electricity Bill', amount: -1200, date: '2024-01-10', type: 'expense', category: 'Utilities' },
        { id: 4, title: 'Freelance Project', amount: 15000, date: '2024-01-12', type: 'income', category: 'Freelance' },
        { id: 5, title: 'Restaurant', amount: -800, date: '2024-01-14', type: 'expense', category: 'Food' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!loading && cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [loading]);

  const handleDelete = (id) => {
    setHisabs(hisabs.filter(h => h.id !== id));
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-400 dark:from-gray-900 dark:via-indigo-900 dark:to-gray-800">
      {/* <DashboardNavbar /> */}

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              All Hisabs 📓
            </h1>
            <p className="text-white/90">
              Manage all your transactions
            </p>
          </div>
          <Button onClick={() => navigate('/add-hisab')} className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 rounded-full">
            + Add Hisab
          </Button>
        </div>

        {/* Hisabs List */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hisabs.map((hisab) => (
            <Card key={hisab.id} className="hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {hisab.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        hisab.type === 'income'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {hisab.category}
                    </span>
                  </div>
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
                      onClick={() => console.log('Edit', hisab.id)}
                      className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(hisab.id)}
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

        {hisabs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-white">
              No hisabs yet. Add your first transaction!
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
