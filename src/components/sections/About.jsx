import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const About = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Heading with matching red gradient from Hero.jsx */}
          <h2 className="text-[2.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a62121] to-[#ff3131] mb-4 font-['Anton'] tracking-wider drop-shadow-lg">
            ABOUT THE DIARIES
          </h2>
          <div className="w-20 h-1 bg-red-500 mb-8 rounded"></div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="animate-fadeIn">
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                After Doctor Strange's spell made the world forget Peter Parker, 
                these digital records became the only proof of his heroism. 
                Every saved life, every thwarted villain – documented in secret.
              </p>
              
              <div className="flex items-start gap-4 mt-8">
                <div className="bg-red-500/20 p-3 rounded-full">
                  <Clock className="text-red-400" size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Last Updated</h3>
                  <p className="text-gray-400 text-base">3 hours ago</p>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              <div className="bg-black/30 border border-gray-700 rounded-xl p-6 backdrop-blur-sm shadow-lg hover:shadow-red-500/20 transition">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="text-red-400" size={26} /> CURRENT LOCATION
                </h3>
                <p className="text-gray-300 text-base">
                  Queens, New York <br />
                  Coordinates: 40.7282° N, 73.7949° W
                </p>
                
                <div className="mt-6">
                  <button className="text-red-400 hover:text-red-300 flex items-center gap-2 transition text-base">
                    View Full Activity Map →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
};

export default About;
