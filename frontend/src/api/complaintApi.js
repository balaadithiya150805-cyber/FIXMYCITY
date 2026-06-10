import axios from './axios';

export const createComplaint = async (formData) => {
  const response = await axios.post('/complaints/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getMyComplaints = async () => {
  const response = await axios.get('/complaints/my');
  return response.data;
};

export const getAllComplaints = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`/complaints/all?${params}`);
  return response.data;
};

export const getComplaintById = async (id) => {
  const response = await axios.get(`/complaints/${id}`);
  return response.data;
};

export const updateComplaintStatus = async (id, status, remarks) => {
  const response = await axios.put(`/complaints/${id}/status`, { status, remarks });
  return response.data;
};

export const getComplaintsByDepartment = async (departmentId) => {
  const response = await axios.get(`/complaints/department/${departmentId}`);
  return response.data;
};

export const getMapComplaints = async () => {
  const response = await axios.get('/complaints/map');
  return response.data;
};

export const detectImage = async (formData) => {
  const response = await axios.post('/ai/detect', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
