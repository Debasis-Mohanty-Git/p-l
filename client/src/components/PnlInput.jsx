import { useState } from 'react';
import { pnlApi } from '../services/api';

const PnlInput = ({ onAddSuccess }) => {
  const [pnl, setPnl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pnl) {
      setError('Please enter a valid P&L.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await pnlApi.addTodayPnl(parseFloat(pnl));
      setSuccess('P&L added successfully!');
      setPnl('');
      if(onAddSuccess) onAddSuccess(); // Trigger refresh
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Add Today's P&L</h3>
      <p className="text-gray-500 mb-6 text-sm">Enter today's total Profit/Loss</p>

      <form onSubmit={handleSubmit} className="flex gap-4 items-start">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
          <input
            type="number"
            step="0.01"
            value={pnl}
            onChange={(e) => setPnl(e.target.value)}
            placeholder="Enter today's P&L"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-sm disabled:opacity-70 whitespace-nowrap"
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>

      {error && (
        <div className="mt-3">
          <p className="text-red-500 text-sm">{error}</p>
          {error.includes("already recorded") && (
            <a href="/history" className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-1 inline-block underline">
              Edit Today's P&L
            </a>
          )}
        </div>
      )}
      {success && <p className="text-primary-600 text-sm mt-3">{success}</p>}
    </div>
  );
};

export default PnlInput;
