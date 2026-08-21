const Header = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning! ☀️';
    if (hour < 18) return 'Good Afternoon! 👋';
    return 'Good Evening! 🌙';
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{getGreeting()}</h2>
        <p className="text-gray-500">Track your daily Profit & Loss</p>
      </div>
    </div>
  );
};

export default Header;
