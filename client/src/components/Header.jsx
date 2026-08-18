import { Calendar } from 'lucide-react';

const Header = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning! ☀️';
    if (hour < 18) return 'Good Afternoon! 👋';
    return 'Good Evening! 🌙';
  };

  const todayStr = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{getGreeting()}</h2>
        <p className="text-gray-500">Track your daily Profit & Loss</p>
      </div>
      <div className="flex items-center gap-2 text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
        <Calendar className="w-4 h-4" />
        <span className="text-sm font-medium">{todayStr}</span>
      </div>
    </div>
  );
};

export default Header;
