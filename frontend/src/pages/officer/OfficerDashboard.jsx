import React from 'react';
import AdminDashboard from '../admin/AdminDashboard';

// Officer Dashboard is essentially the same high-level view as Admin Dashboard 
// in this simplified structure. We can reuse the AdminDashboard component.
const OfficerDashboard = () => {
  return <AdminDashboard />;
};

export default OfficerDashboard;
