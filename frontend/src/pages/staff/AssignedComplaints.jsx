import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import ComplaintTable from '../../components/ComplaintTable';
import { AuthContext } from '../../context/AuthContext';
import { getComplaintsByDepartment } from '../../../api/complaintApi';
import { STATUS_LIST, PRIORITY_LIST } from '../../utils/constants';

const AssignedComplaints = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    status: '',
    priority: ''
  });

  useEffect(() => {
    const fetchComplaints = async () => {
      if (user?.department_id) {
        try {
          const data = await getComplaintsByDepartment(user.department_id);
          setComplaints(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [user]);

  const filteredComplaints = complaints.filter(c => {
    if (filters.status && c.status !== filters.status) return false;
    if (filters.priority && c.priority !== filters.priority) return false;
    return true;
  });

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Assigned Complaints</h1>

        {!user?.department_id ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">No department assigned.</div>
        ) : (
          <>
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
            </div>

            {loading ? <div>Loading data...</div> : <ComplaintTable complaints={filteredComplaints} />}
          </>
        )}
      </div>
    </div>
  );
};

export default AssignedComplaints;
