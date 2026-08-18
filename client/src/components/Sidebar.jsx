import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History as HistoryIcon, LineChart } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-gray-50">
        <LineChart className="w-8 h-8 text-primary-500" />
        <h1 className="font-bold text-xl text-gray-800">Daily P&L Tracker</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <NavLink 
          to="/" 
          className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>
        <NavLink 
          to="/history" 
          className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          <HistoryIcon className="w-5 h-5" />
          History
        </NavLink>
      </nav>

      <div className="p-4">
        <div className="bg-primary-50 p-4 rounded-xl text-primary-900">
          <div className="flex items-center gap-2 font-semibold mb-2">
            <span className="text-primary-500">★</span> Keep Going!
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            Discipline today,<br/>freedom tomorrow.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
