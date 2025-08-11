import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, MapPin, Calendar } from 'lucide-react';

const MissionPreview = () => {
  const previewMissions = [
    {
      id: 1,
      title: "Bank Robbery Intervention",
      status: "completed",
      urgency: "high",
      date: "2023-11-15",
      location: "Manhattan"
    },
    {
      id: 2,
      title: "Rhino Rampage",
      status: "active",
      urgency: "critical",
      date: "2023-11-16",
      location: "Queens"
    }
  ];

  return (
    <section className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-12">
  {/* Dark grey → white gradient heading */}
  <h2 className="text-[2.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-300 to-white font-['Anton'] tracking-wider drop-shadow-lg">
    RECENT MISSIONS
  </h2>
  <Link 
    to="/missions" 
    className="text-white-500 font-bold drop-shadow-md hover:text-red-300 hover:underline underline-offset-4 transition flex items-center gap-2 text-base"
  >
    View All Archives →
  </Link>
</div>

          
          <div className="grid md:grid-cols-2 gap-6">
            {previewMissions.map(mission => (
              <div 
                key={mission.id} 
                className="bg-black/30 border border-gray-800 rounded-xl p-6 hover:border-red-400/30 hover:shadow-lg hover:shadow-red-500/10 transition-all backdrop-blur-sm animate-fadeIn"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{mission.title}</h3>
                  <Badge 
                    variant={mission.urgency === "critical" ? "destructive" : "secondary"}
                    className="flex items-center gap-1 text-sm px-2 py-1"
                  >
                    {mission.status === "active" ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    <span className="capitalize">{mission.status}</span>
                  </Badge>
                </div>
                
                <div className="flex gap-4 text-sm text-gray-400 mt-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-red-400" />
                    {mission.date}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-red-400" />
                    {mission.location}
                  </div>
                </div>
                
                <Link 
                  to={`/missions/${mission.id}`} 
                  className="inline-block mt-6 text-red-400 hover:text-red-300 text-sm font-medium"
                >
                  View Mission Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fade-in animation */}
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

export default MissionPreview;
