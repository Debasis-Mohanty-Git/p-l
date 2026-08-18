import { useEffect, useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { pnlApi } from '../services/api';

const History = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const data = await pnlApi.getAllPnl();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this P&L record?')) {
      try {
        await pnlApi.deletePnl(id);
        fetchRecords();
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('Something went wrong while deleting.');
      }
    }
  };

  const handleEditClick = (record) => {
    setEditingId(record.id);
    setEditValue(record.pnl);
  };

  const handleUpdate = async (id) => {
    if (!editValue) return;
    try {
      await pnlApi.updatePnl(id, parseFloat(editValue));
      setEditingId(null);
      fetchRecords();
    } catch (error) {
      console.error('Error updating record:', error);
      alert('Something went wrong while updating.');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">P&L History</h2>
        <p className="text-gray-500">View and manage your past daily records</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading history...</div>
        ) : records.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No records found. Start adding your daily P&L!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-100 text-sm font-medium">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Day</th>
                  <th className="px-6 py-4 text-right">P&L</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((record) => {
                  const dateObj = new Date(record.date);
                  const dateStr = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(dateObj);
                  const dayStr = new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(dateObj);
                  const isPositive = parseFloat(record.pnl) >= 0;

                  return (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-800 font-medium">{dateStr}</td>
                      <td className="px-6 py-4 text-gray-500">{dayStr}</td>
                      <td className="px-6 py-4 text-right">
                        {editingId === record.id ? (
                          <input
                            type="number"
                            step="0.01"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-24 px-2 py-1 border rounded text-right"
                          />
                        ) : (
                          <span className={`font-bold ${isPositive ? 'text-primary-600' : 'text-red-500'}`}>
                            {isPositive ? '+' : '-'}₹{Math.abs(parseFloat(record.pnl)).toLocaleString()}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {editingId === record.id ? (
                          <div className="flex justify-center gap-2">
                            <button onClick={() => handleUpdate(record.id)} className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                              <Check className="w-4 h-4" />
                            </button>
                            <button onClick={cancelEdit} className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-center gap-2">
                            <button onClick={() => handleEditClick(record)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(record.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
