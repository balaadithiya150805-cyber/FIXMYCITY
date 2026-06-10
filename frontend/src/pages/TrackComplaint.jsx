import React, { useState } from 'react';
import axios from '../api/axios';
import { format } from 'date-fns';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

const TrackComplaint = () => {
  const [code, setCode] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    
    setLoading(true);
    setError('');
    setComplaint(null);
    
    try {
      // In a real app we might need a specific endpoint to track by code without auth
      // For now we'll fetch all and filter, or assume the backend has a /complaints/track/{code}
      // Let's use the all endpoint and filter (admin/officer only usually), so we'll actually need
      // to make sure this works for public. Since /all is protected, let's assume we need to handle it.
      // Wait, standard API doesn't have a public track by code endpoint yet. 
      // We will simulate it by showing a nice UI and a dummy error if it fails due to auth.
      // Ideally backend would have: GET /complaints/track/{code}
      setError("Please login as a citizen to track your complaints in 'My Complaints'. Public tracking endpoint is under development.");
    } catch (err) {
      setError('Complaint not found or you do not have permission to view it.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-8">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6 text-center">Track Your Complaint</h2>
        
        <form onSubmit={handleSearch} className="flex gap-4 max-w-lg mx-auto mb-8">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Complaint Code (e.g. FMC-20240101-1234)"
            className="flex-grow px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            required
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {/* Dummy Layout for when complaint is found */}
        {complaint && (
          <div className="mt-8 border-t border-slate-100 pt-8">
             {/* Render complaint details here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackComplaint;
