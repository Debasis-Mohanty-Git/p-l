import { TrendingUp, TrendingDown, Calendar, PieChart } from 'lucide-react';

const SummaryCards = ({ summary, loading }) => {
  if (loading) {
    return <div className="text-gray-500">Loading summary...</div>;
  }

  const { totalPnl = 0, totalDays = 0, averagePerDay = 0 } = summary || {};
  const isPositive = totalPnl >= 0;

  return (
    <div className="flex flex-col gap-4 mb-8 md:grid md:grid-cols-3 md:gap-6 relative">
      {/* Card 1: Total P&L */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between sticky top-4 z-10 md:static md:z-auto">
        <div className="flex justify-between items-start mb-4">
          <p className="text-gray-500 font-medium">Total P&L</p>
          <div className={`p-2 rounded-xl ${isPositive ? 'bg-primary-50 text-primary-500' : 'bg-red-50 text-red-500'}`}>
            {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          </div>
        </div>
        <div>
          <h3 className={`text-3xl font-bold mb-1 ${isPositive ? 'text-primary-600' : 'text-red-500'}`}>
            {isPositive ? '+' : '-'}₹{Math.abs(totalPnl).toLocaleString()}
          </h3>
          <p className="text-sm text-gray-400">All Time</p>
        </div>
      </div>

      {/* Card 2: Total Days */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between sticky top-8 z-20 md:static md:z-auto">
        <div className="flex justify-between items-start mb-4">
          <p className="text-gray-500 font-medium">Total Days</p>
          <div className="p-2 rounded-xl bg-blue-50 text-blue-500">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-1 text-blue-600">
            {totalDays}
          </h3>
          <p className="text-sm text-gray-400">Days Logged</p>
        </div>
      </div>

      {/* Card 3: Average / Day */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between sticky top-12 z-30 md:static md:z-auto">
        <div className="flex justify-between items-start mb-4">
          <p className="text-gray-500 font-medium">Average / Day</p>
          <div className="p-2 rounded-xl bg-purple-50 text-purple-500">
            <PieChart className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h3 className={`text-3xl font-bold mb-1 ${averagePerDay >= 0 ? 'text-primary-600' : 'text-red-500'}`}>
            {averagePerDay >= 0 ? '+' : '-'}₹{Math.abs(averagePerDay).toLocaleString()}
          </h3>
          <p className="text-sm text-gray-400">All Time</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
