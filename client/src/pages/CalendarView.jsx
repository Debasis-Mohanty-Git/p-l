import { useState, useEffect } from 'react';
import { pnlApi } from '../services/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pnls, setPnls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPnls = async () => {
      try {
        const data = await pnlApi.getAllPnl();
        setPnls(data);
      } catch (error) {
        console.error('Failed to fetch PnLs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPnls();
  }, []);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 md:p-4 border border-transparent"></div>);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = new Date(Date.UTC(year, month, day)).toISOString().split('T')[0];
      
      // Find PnL for this date
      const pnlRecord = pnls.find(p => {
        const pDate = new Date(p.date).toISOString().split('T')[0];
        return pDate === dateStr;
      });

      let bgColor = 'bg-white';
      let textColor = 'text-gray-700';

      if (pnlRecord) {
        const val = parseFloat(pnlRecord.pnl);
        if (val > 0) {
          bgColor = 'bg-green-500 border-green-600 shadow-sm';
          textColor = 'text-white font-bold';
        } else if (val < 0) {
          bgColor = 'bg-red-500 border-red-600 shadow-sm';
          textColor = 'text-white font-bold';
        } else {
          bgColor = 'bg-gray-200 border-gray-300';
          textColor = 'text-gray-800 font-bold';
        }
      }

      days.push(
        <div key={day} className={`flex items-center justify-center aspect-square rounded-xl border ${bgColor} transition-all`}>
          <span className={`text-sm md:text-lg ${textColor}`}>{day}</span>
        </div>
      );
    }

    return days;
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading calendar...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          {monthNames[month]} {year}
        </h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextMonth} className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(d => (
          <div key={d} className="text-center text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default CalendarView;
