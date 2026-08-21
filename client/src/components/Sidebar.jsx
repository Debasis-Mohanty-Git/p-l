import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History as HistoryIcon, LineChart, X, Calendar as CalendarIcon } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0 md:flex
    `}>
      <div className="p-6 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-3">
          <LineChart className="w-8 h-8 text-primary-500" />
          <h1 className="font-bold text-xl text-gray-800">Daily P&L Tracker</h1>
        </div>
        <button 
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <NavLink 
          to="/" 
          onClick={() => setIsOpen(false)}
          className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>
        <NavLink 
          to="/calendar" 
          onClick={() => setIsOpen(false)}
          className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          <CalendarIcon className="w-5 h-5" />
          Calendar
        </NavLink>
        <NavLink 
          to="/history" 
          onClick={() => setIsOpen(false)}
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
