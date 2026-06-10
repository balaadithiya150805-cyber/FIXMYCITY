import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null;

  const getMenuItems = () => {
    switch (user.role) {
      case 'citizen':
        return [
          { name: 'Dashboard', path: '/citizen/dashboard', icon: '📊' },
          { name: 'New Complaint', path: '/citizen/new-complaint', icon: '📝' },
          { name: 'My Complaints', path: '/citizen/my-complaints', icon: '📋' }
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
          { name: 'All Complaints', path: '/admin/complaints', icon: '📋' },
          { name: 'Map View', path: '/admin/map', icon: '🗺️' },
          { name: 'Departments', path: '/admin/departments', icon: '🏢' },
          { name: 'Reports', path: '/admin/reports', icon: '📄' }
        ];
      case 'staff':
        return [
          { name: 'Dashboard', path: '/staff/dashboard', icon: '📊' },
          { name: 'Assigned Complaints', path: '/staff/complaints', icon: '📋' }
        ];
      case 'officer':
        return [
          { name: 'Dashboard', path: '/officer/dashboard', icon: '📊' },
          { name: 'Analytics', path: '/officer/analytics', icon: '📈' },
          { name: 'Reports', path: '/officer/reports', icon: '📄' }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-slate-800 text-white min-h-[calc(100vh-4rem)] shadow-lg hidden md:block">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Menu
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
