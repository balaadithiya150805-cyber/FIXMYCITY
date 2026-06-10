import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { getComplaintById } from '../../../api/complaintApi';
import { API_BASE_URL } from '../../utils/constants';
import StatusBadge from '../../components/StatusBadge';
import PriorityBadge from '../../components/PriorityBadge';
import { format } from 'date-fns';

const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const data = await getComplaintById(id);
        setComplaint(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  if (loading) return <div className="p-8">Loading details...</div>;
  if (!complaint) return <div className="p-8">Complaint not found.</div>;

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{complaint.title}</h1>
              <p className="text-slate-500 font-mono mt-1">{complaint.complaint_code}</p>
            </div>
            <div className="flex gap-2">
              <StatusBadge status={complaint.status} />
              <PriorityBadge priority={complaint.priority} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-2">Description</h3>
                  <p className="text-slate-700 whitespace-pre-wrap">{complaint.description}</p>
                  
                  {complaint.image_path && (
                    <div className="mt-6">
                      <h3 className="font-bold text-slate-900 mb-2">Uploaded Image</h3>
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

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">AI Analysis</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Predicted Issue:</span>
                    <span className="font-medium capitalize">{complaint.predicted_issue_type?.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Confidence:</span>
                    <span className="font-medium text-teal-600">{(complaint.confidence_score * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Suggested Severity:</span>
                    <span className="font-medium capitalize">{complaint.severity}</span>
                  </div>
                  {complaint.duplicate_count > 0 && (
                    <div className="flex justify-between text-orange-600">
                      <span>Duplicates Found:</span>
                      <span className="font-bold">{complaint.duplicate_count}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Routing Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Department:</span>
                    <span className="font-medium text-right">{complaint.department?.name || 'Unassigned'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Submitted On:</span>
                    <span className="font-medium text-right">{format(new Date(complaint.created_at), 'MMM dd, yyyy p')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
