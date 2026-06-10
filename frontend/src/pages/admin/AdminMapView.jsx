import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ComplaintMap from '../../components/ComplaintMap';
import { getMapComplaints } from '../../../api/complaintApi';

const AdminMapView = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const data = await getMapComplaints();
        setComplaints(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMapData();
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4 bg-slate-50">
        <div className="mb-4 flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-slate-900">Interactive Map View</h1>
          <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg shadow-sm">
            Showing {complaints.length} mapped complaints
          </div>
        </div>
        
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative z-0">
          {loading ? (
            <div className="flex items-center justify-center h-full">Loading map data...</div>
          ) : (
            <ComplaintMap complaints={complaints} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMapView;
