import { useEffect, useState } from 'react';
import Header from '../components/Header';
import PnlInput from '../components/PnlInput';
import SummaryCards from '../components/SummaryCards';
import MotivationQuotes from '../components/MotivationQuotes';
import { pnlApi } from '../services/api';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const data = await pnlApi.getSummary();
      setSummary(data);
    } catch (error) {
      console.error('Failed to fetch summary:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PnlInput onAddSuccess={fetchSummary} />
          <h3 className="text-lg font-bold text-gray-800 mb-4">Summary</h3>
          <SummaryCards summary={summary} loading={loading} />
        </div>
        <div className="lg:col-span-1">
          <MotivationQuotes />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
