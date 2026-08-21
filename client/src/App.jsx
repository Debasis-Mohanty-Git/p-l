import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Menu, LineChart, LogOut } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Login from './pages/Login';
import CalendarView from './pages/CalendarView';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('pnl_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pnl_token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="*" element={<Login setAuth={setIsAuthenticated} />} />
        </Routes>
      ) : (
        <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          <main className="flex-1 flex flex-col overflow-hidden w-full">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 z-30">
              <div className="flex items-center gap-2">
                <LineChart className="w-6 h-6 text-primary-500" />
                <h1 className="font-bold text-lg text-gray-800">Daily P&L</h1>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsSidebarOpen(true)} 
                  className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Desktop Logout (Optional) */}
            <div className="hidden md:flex justify-end p-4 pb-0">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<CalendarView />} />
                <Route path="/history" element={<History />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;
