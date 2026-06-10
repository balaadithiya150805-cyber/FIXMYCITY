import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getDepartments, createDepartment } from '../../../api/adminApi';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDept, setNewDept] = useState({ name: '', description: '', email: '', phone: '' });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createDepartment(newDept);
      setIsModalOpen(false);
      setNewDept({ name: '', description: '', email: '', phone: '' });
      fetchDepartments();
    } catch (error) {
      alert('Failed to create department');
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Departments Management</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            + Add Department
          </button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map(dept => (
              <div key={dept.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{dept.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{dept.description || 'No description provided.'}</p>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Email:</span> {dept.email || 'N/A'}</p>
                  <p><span className="font-medium">Phone:</span> {dept.phone || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Add New Department</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input required type="text" value={newDept.name} onChange={e => setNewDept({...newDept, name: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea value={newDept.description} onChange={e => setNewDept({...newDept, description: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" value={newDept.email} onChange={e => setNewDept({...newDept, email: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input type="text" value={newDept.phone} onChange={e => setNewDept({...newDept, phone: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Departments;
