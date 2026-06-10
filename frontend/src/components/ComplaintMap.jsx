import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { format } from 'date-fns';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (status) => {
  const colorMap = {
    'Pending': '#ef4444',     // red-500
    'Assigned': '#f97316',    // orange-500
    'In Progress': '#3b82f6', // blue-500
    'Solved': '#22c55e',      // green-500
    'Rejected': '#6b7280',    // gray-500
    'Reopened': '#eab308',    // yellow-500
    'Escalated': '#a855f7'    // purple-500
  };

  const color = colorMap[status] || '#3b82f6';
  
  const markerHtmlStyles = `
    background-color: ${color};
    width: 20px;
    height: 20px;
    display: block;
    left: -10px;
    top: -10px;
    position: relative;
    border-radius: 50%;
    border: 2px solid #FFFFFF;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  `;

  return L.divIcon({
    className: 'custom-pin',
    iconAnchor: [0, 10],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -15],
    html: `<span style="${markerHtmlStyles}" />`
  });
};

// Component to auto-fit bounds when markers change
const MapBounds = ({ complaints }) => {
  const map = useMap();
  
  useEffect(() => {
    if (complaints.length > 0) {
      const bounds = L.latLngBounds(complaints.map(c => [c.lat, c.lon]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [complaints, map]);

  return null;
};

const ComplaintMap = ({ complaints = [] }) => {
  // Default center (India roughly)
  const defaultCenter = [20.5937, 78.9629];
  const validComplaints = complaints.filter(c => c.lat && c.lon);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-md border border-gray-200 map-container relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {validComplaints.length > 0 && <MapBounds complaints={validComplaints} />}
        
        {validComplaints.map((complaint) => (
          <Marker 
            key={complaint.id} 
            position={[complaint.lat, complaint.lon]}
            icon={createCustomIcon(complaint.status)}
          >
            <Popup className="rounded-lg shadow-sm">
              <div className="p-1 min-w-[200px]">
                <h3 className="font-bold text-gray-900 mb-1">{complaint.title}</h3>
                <p className="text-xs text-gray-500 mb-2 font-mono">{complaint.complaint_code}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <span className="text-gray-500">Status:</span>
                  <StatusBadge status={complaint.status} />
                  
                  <span className="text-gray-500">Priority:</span>
                  <PriorityBadge priority={complaint.priority} />
                  
                  <span className="text-gray-500">Issue:</span>
                  <span className="capitalize font-medium text-gray-900">
                    {complaint.issue_type?.replace('_', ' ') || 'Unknown'}
                  </span>
                  
                  <span className="text-gray-500">Dept:</span>
                  <span className="font-medium text-gray-900">{complaint.department_name}</span>
                </div>
                
                <div className="text-xs text-gray-400 mt-2 text-right">
                  {format(new Date(complaint.created_at), 'MMM dd, yyyy h:mm a')}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ComplaintMap;
