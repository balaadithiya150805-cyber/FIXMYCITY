import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-teal-900 text-white flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-[fadeIn_1s_ease-out]">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Report. Detect. <br/>
              <span className="text-teal-400">Route. Resolve.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0">
              FixMyCity AI empowers citizens and local authorities to collaborate efficiently. Simply upload an image, and our AI does the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register" className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white rounded-lg font-bold text-lg shadow-lg shadow-teal-500/30 transition transform hover:-translate-y-1">
                Report an Issue
              </Link>
              <Link to="/track" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 rounded-lg font-bold text-lg transition transform hover:-translate-y-1">
                Track Complaint
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative animate-[slideUp_1s_ease-out]">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
              <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                <h3 className="font-bold text-lg">AI Issue Detection</h3>
                <span className="bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-xs font-bold">LIVE</span>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-slate-700 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
                  <span className="text-4xl">📸</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Predicted Type:</span>
                    <span className="font-mono text-teal-400">Pothole</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-[92%]"></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Confidence</span>
                    <span>92%</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Priority</p>
                    <p className="font-bold text-orange-400 text-sm">High</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Department</p>
                    <p className="font-bold text-slate-200 text-sm">Road Dept</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-slate-500">A seamless process from reporting to resolution.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <FeatureCard 
              step="1"
              icon="📸" 
              title="Upload Image" 
              desc="Citizen snaps a photo of the civic issue and uploads it via the portal." 
            />
            <FeatureCard 
              step="2"
              icon="🧠" 
              title="AI Detection" 
              desc="Our AI instantly identifies the issue type and calculates severity." 
            />
            <FeatureCard 
              step="3"
              icon="🚦" 
              title="Smart Routing" 
              desc="The complaint is prioritized and sent to the exact responsible department." 
            />
            <FeatureCard 
              step="4"
              icon="✅" 
              title="Quick Resolve" 
              desc="Authorities fix the issue and update the status in real-time." 
            />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-center text-slate-400 border-t border-slate-800">
        <p className="flex items-center justify-center gap-2">
          <span className="text-2xl">🏙️</span> 
          <span className="font-bold text-white">FixMyCity AI</span> &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ step, icon, title, desc }) => (
  <div className="bg-slate-50 rounded-2xl p-8 text-center relative border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">
      {step}
    </div>
    <div className="text-5xl mb-6 mt-4">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default Home;
