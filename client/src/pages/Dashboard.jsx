import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function Dashboard() {
  document.title = "Cipher Bucks • Dashboard";
  const [user, setUser] = useState({ name: 'User' });
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0
  });
  const [recentHisabs, setRecentHisabs] = useState([]);
  const navigate = useNavigate();
  const statsRef = useRef(null);

  useEffect(() => {
    // TODO: Fetch user data and stats from API
    setUser({ name: 'Shubham' });
    setStats({
      totalIncome: 50000,
      totalExpense: 32000,
      netBalance: 18000
    });
    setRecentHisabs([
      { id: 1, title: 'Grocery Shopping', amount: -500, date: '2024-01-15', type: 'expense' },
      { id: 2, title: 'Salary', amount: 50000, date: '2024-01-01', type: 'income' },
      { id: 3, title: 'Electricity Bill', amount: -1200, date: '2024-01-10', type: 'expense' }
    ]);

    gsap.fromTo(
      statsRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Here's your financial overview
            </p>
          </div>
          <ThemeSwitcher />
        </div>

        {/* Stats Cards */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm mb-1">Total Income</p>
                <p className="text-3xl font-bold">₹{stats.totalIncome.toLocaleString()}</p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm mb-1">Total Expense</p>
                <p className="text-3xl font-bold">₹{stats.totalExpense.toLocaleString()}</p>
              </div>
              <div className="text-4xl">📉</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm mb-1">Net Balance</p>
                <p className="text-3xl font-bold">₹{stats.netBalance.toLocaleString()}</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </Card>
        </div>

        {/* Recent Hisabs */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Hisabs
            </h2>
            <button
              onClick={() => navigate('/hisabs')}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentHisabs.map((hisab) => (
              <div
                key={hisab.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all"
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {hisab.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(hisab.date).toLocaleDateString()}
                  </p>
                </div>
                <p
                  className={`text-lg font-bold ${
                    hisab.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {hisab.amount > 0 ? '+' : ''}₹{Math.abs(hisab.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Placeholder for Chart */}
        <Card className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Expense Trend
          </h2>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Chart visualization coming soon 📊
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
