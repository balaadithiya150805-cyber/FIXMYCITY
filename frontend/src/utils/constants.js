export const API_BASE_URL = 'http://localhost:8000';

export const STATUS_COLORS = {
  'Pending': 'bg-red-100 text-red-800',
  'Assigned': 'bg-orange-100 text-orange-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  'Solved': 'bg-green-100 text-green-800',
  'Rejected': 'bg-gray-100 text-gray-800',
  'Reopened': 'bg-yellow-100 text-yellow-800',
  'Escalated': 'bg-purple-100 text-purple-800'
};

export const PRIORITY_COLORS = {
  'Low': 'bg-green-100 text-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'High': 'bg-orange-100 text-orange-800',
  'Urgent': 'bg-red-100 text-red-800'
};

export const ISSUE_TYPES = [
  'pothole', 'garbage', 'water_leakage', 'drainage_block', 
  'streetlight_damage', 'road_damage', 'illegal_dumping', 
  'broken_sign_board', 'unknown'
];

export const STATUS_LIST = [
  'Pending', 'Assigned', 'In Progress', 'Solved', 'Rejected', 'Reopened', 'Escalated'
];

export const PRIORITY_LIST = [
  'Low', 'Medium', 'High', 'Urgent'
];
