import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ComplaintTable from '../../components/ComplaintTable';
import { getMyComplaints } from '../../../api/complaintApi';
import { STATUS_LIST } from '../../utils/constants';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getMyComplaints();
        setComplaints(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const filteredComplaints = filter === 'All' 
    ? complaints 
    : complaints.filter(c => c.status === filter);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">My Complaints</h1>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="All">All Statuses</option>
            {STATUS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <ComplaintTable complaints={filteredComplaints} />
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
