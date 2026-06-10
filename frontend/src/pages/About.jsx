import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 px-8 py-12 text-white text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">About FixMyCity AI</h1>
          <p className="text-xl text-slate-300">Making cities smarter, one complaint at a time.</p>
        </div>
        
        <div className="p-8 prose prose-slate max-w-none">
          <h2>Project Overview</h2>
          <p>
            FixMyCity AI is a smart civic complaint management platform designed to bridge the gap between citizens and local authorities. By leveraging AI image detection, the platform automatically categorizes and routes civic issues to the correct department, significantly reducing manual triage time and improving resolution speeds.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li><strong>AI-Powered Detection:</strong> Automatically identifies issues like potholes, garbage overflow, and water leaks from user-uploaded images.</li>
            <li><strong>Smart Priority Engine:</strong> Dynamically calculates priority based on issue type, AI confidence, and the number of duplicate reports.</li>
            <li><strong>Automated Routing:</strong> Complaints are instantly forwarded to the appropriate department (e.g., Road Dept, Water Board).</li>
            <li><strong>Interactive Map:</strong> A real-time geographical view of all reported issues.</li>
            <li><strong>Automated Reporting:</strong> PDF reports generated on-the-fly for administrators and officers.</li>
          </ul>

          <h2>Technology Stack</h2>
          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold mt-0 text-slate-800">Frontend</h3>
              <ul className="mt-2 mb-0 text-sm">
                <li>React.js (Vite)</li>
                <li>Tailwind CSS</li>
                <li>Recharts & React-Leaflet</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold mt-0 text-slate-800">Backend</h3>
              <ul className="mt-2 mb-0 text-sm">
                <li>FastAPI (Python)</li>
                <li>PostgreSQL & SQLAlchemy</li>
                <li>JWT Authentication</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
