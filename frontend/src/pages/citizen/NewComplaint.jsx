import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { createComplaint } from '../../../api/complaintApi';

const NewComplaint = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    address: ''
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          });
        },
        (err) => {
          setError('Could not get location. Please enter manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an image of the issue.');
      return;
    }

    setLoading(true);
    setError('');
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (formData.latitude) data.append('latitude', formData.latitude);
    if (formData.longitude) data.append('longitude', formData.longitude);
    if (formData.address) data.append('address', formData.address);
    data.append('file', file);

    try {
      const response = await createComplaint(data);
      setSuccess(`Complaint submitted successfully! AI identified it as: ${response.predicted_issue_type?.replace('_', ' ')}`);
      setTimeout(() => {
        navigate(`/citizen/complaints/${response.id}`);
      }, 3000);
    } catch (err) {
      setError('Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Report a New Issue</h1>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>}
              {success && <div className="bg-green-50 text-green-700 p-4 rounded-lg">{success}</div>}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Issue Title</label>
                <input required type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Large pothole on Main St"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea required name="description" rows={4} value={formData.description} onChange={handleInputChange} placeholder="Provide details about the issue..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Upload Photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {preview ? (
                      <div className="mb-4">
                        <img src={preview} alt="Preview" className="mx-auto h-32 object-contain" />
                      </div>
                    ) : (
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <div className="flex justify-center text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-slate-900">Location Details</h4>
                  <button type="button" onClick={getLocation} className="text-sm bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-md transition">
                    📍 Get Current Location
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Latitude</label>
                    <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Longitude</label>
                    <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Address / Landmark</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={loading} className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition disabled:opacity-50">
                  {loading ? 'Submitting & Analyzing...' : 'Submit Complaint'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewComplaint;
