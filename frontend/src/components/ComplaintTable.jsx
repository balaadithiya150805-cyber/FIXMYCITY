import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { AuthContext } from '../context/AuthContext';

const ComplaintTable = ({ complaints = [], showActions = true, onStatusChange }) => {
  const { user } = useContext(AuthContext);

  if (!complaints.length) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        No complaints found matching your criteria.
      </div>
    );
  }

  const getDetailsLink = (id) => {
    switch (user?.role) {
      case 'citizen': return `/citizen/complaints/${id}`;
      case 'staff': return `/staff/complaints/${id}`;
      case 'admin': return `/admin/complaints/${id}`;
      case 'officer': return `/admin/complaints/${id}`;
      default: return `/track?code=${id}`; // Fallback
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / Code</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              {showActions && <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complaints.map((complaint) => (
              <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {complaint.complaint_code}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {complaint.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {complaint.predicted_issue_type?.replace('_', ' ') || 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={complaint.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PriorityBadge priority={complaint.priority} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {complaint.department?.name || 'Unassigned'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(complaint.created_at), 'MMM dd, yyyy')}
                </td>
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      to={getDetailsLink(complaint.id)}
                      className="text-teal-600 hover:text-teal-900 mr-4"
                    >
                      View
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintTable;
