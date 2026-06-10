import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ComplaintTable from '../../components/ComplaintTable';
import { getAllComplaints } from '../../../api/complaintApi';
import { STATUS_LIST, PRIORITY_LIST, ISSUE_TYPES } from '../../utils/constants';

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    issue_type: ''
  });

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const queryParams = {};
        Object.keys(filters).forEach(k => {
          if (filters[k]) queryParams[k] = filters[k];
        });
        const data = await getAllComplaints(queryParams);
        setComplaints(data.complaints);
        setTotal(data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [filters]);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">All Complaints</h1>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4 items-center">
          <span className="font-medium text-slate-700">Filters:</span>
          
          <select 
            value={filters.status} 
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">All Statuses</option>
            {STATUS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select 
            value={filters.priority} 
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">All Priorities</option>
            {PRIORITY_LIST.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select 
            value={filters.issue_type} 
            onChange={(e) => setFilters({...filters, issue_type: e.target.value})}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">All Issue Types</option>
            {ISSUE_TYPES.map(i => <option key={i} value={i}>{i.replace('_', ' ')}</option>)}
          </select>

          <div className="ml-auto text-sm text-slate-500">
            Total Results: <span className="font-bold text-slate-900">{total}</span>
          </div>
        </div>

        {loading ? (
          <div>Loading data...</div>
        ) : (
          <ComplaintTable complaints={complaints} />
        )}
      </div>
    </div>
  );
};

export default AllComplaints;
