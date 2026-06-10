import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl">🏙️</span>
              <span className="font-bold text-xl tracking-tight">FixMyCity AI</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition">Home</Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition">About</Link>
            <Link to="/track" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition">Track Issue</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-700">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-teal-400 capitalize">{user?.role}</span>
                </div>
                <button 
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-4">
                <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition">Login</Link>
                <Link to="/register" className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md text-sm font-medium transition">Register</Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-800 px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700">Home</Link>
          <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700">About</Link>
          <Link to="/track" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700">Track Issue</Link>
          
          {isAuthenticated ? (
            <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-slate-700">
              Logout ({user?.name})
            </button>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700">Login</Link>
              <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-teal-400 hover:bg-slate-700">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
