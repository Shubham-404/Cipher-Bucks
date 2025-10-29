import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../../components/DashboardNavbar';
import Footer from '../partials/Footer';
import HisaabCard from '../../components/HisaabCard';

export default function MyHisaab({ name = 'User', username = 'user', hisaabs = [] }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-400 dark:from-gray-900 dark:via-indigo-900 dark:to-gray-800">
      {/* <DashboardNavbar /> */}

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome back, {name} 👋
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
        {hisaabs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hisaabs.map((h) => (
              <HisaabCard key={h.id} h={h} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-white mb-2">
              No Hisaabs found.
            </p>
            <p className="text-white/80">
              Start by adding a new one — encrypted and secured just for you.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
