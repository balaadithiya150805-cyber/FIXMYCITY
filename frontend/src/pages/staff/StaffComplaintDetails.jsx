import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { getComplaintById, updateComplaintStatus } from '../../../api/complaintApi';
import { API_BASE_URL, STATUS_LIST } from '../../utils/constants';
import StatusBadge from '../../components/StatusBadge';
import PriorityBadge from '../../components/PriorityBadge';

const StaffComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdate, setStatusUpdate] = useState({ status: '', remarks: '' });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const data = await getComplaintById(id);
      setComplaint(data);
      setStatusUpdate({ status: data.status, remarks: '' });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await updateComplaintStatus(id, statusUpdate.status, statusUpdate.remarks);
      await fetchComplaint();
      alert('Status updated successfully');
    } catch (error) {
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-8">Loading details...</div>;
  if (!complaint) return <div className="p-8">Complaint not found.</div>;

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Complaint Management</h1>
            <button onClick={() => navigate(-1)} className="text-slate-600 hover:text-slate-900 font-medium">
              &larr; Back
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{complaint.title}</h2>
                    <p className="text-slate-500 font-mono mt-1 text-sm">{complaint.complaint_code}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <PriorityBadge priority={complaint.priority} />
                    <StatusBadge status={complaint.status} />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-2">Description</h3>
                  <p className="text-slate-700 whitespace-pre-wrap text-sm">{complaint.description}</p>
                  
                  {complaint.image_path && (
                    <div className="mt-6">
                      <h3 className="font-bold text-slate-900 mb-2">Evidence Image</h3>
                      <img 
                        src={`${API_BASE_URL}/${complaint.image_path}`} 
                        alt="Issue" 
                        className="w-full max-h-96 object-contain rounded-lg border border-slate-200 bg-slate-100" 
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Actions & Logs */}
            <div className="space-y-6">
              
              {/* Status Update Form */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Update Status</h3>
                <form onSubmit={handleStatusUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">New Status</label>
                    <select 
                      value={statusUpdate.status} 
                      onChange={(e) => setStatusUpdate({...statusUpdate, status: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    >
                      {STATUS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Remarks / Action Taken</label>
                    <textarea 
                      rows={3}
                      value={statusUpdate.remarks} 
                      onChange={(e) => setStatusUpdate({...statusUpdate, remarks: e.target.value})}
                      placeholder="e.g., Visited site, patched pothole."
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-teal-500 focus:border-teal-500 text-sm"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={updating || statusUpdate.status === complaint.status}
                    className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition disabled:opacity-50"
                  >
                    {updating ? 'Updating...' : 'Save Update'}
                  </button>
                </form>
              </div>

              {/* Status Logs */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Activity History</h3>
                <div className="space-y-4">
                  {complaint.status_logs?.length === 0 ? (
                    <p className="text-sm text-slate-500">No activity yet.</p>
                  ) : (
                    complaint.status_logs?.slice().reverse().map(log => (
                      <div key={log.id} className="relative pl-4 border-l-2 border-slate-200 pb-4 last:border-0 last:pb-0">
                        <div className="absolute w-3 h-3 bg-teal-500 rounded-full -left-[7px] top-1"></div>
                        <p className="text-xs text-slate-400 mb-1">{new Date(log.created_at).toLocaleString()}</p>
                        <p className="text-sm">
                          Status changed from <span className="font-medium text-slate-600">{log.old_status}</span> to <span className="font-medium text-slate-900">{log.new_status}</span>
                        </p>
                        {log.remarks && (
                          <div className="mt-2 bg-slate-50 p-2 rounded text-sm text-slate-600 italic">
                            "{log.remarks}"
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffComplaintDetails;
