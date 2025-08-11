import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HomePage from '@/pages/HomePage';
import AllMissionsPage from '@/pages/AllMissionsPage';
import MissionFormPage from '@/pages/MissionFormPage';
import MapViewPage from '@/pages/MapViewPage';

function App() {
  return (
    <Router>
      <div className="bg-[#151414] text-white min-h-screen">
        {/* Global spider background elements */}
        <div className="spider-background"></div>
        
        <Navbar />
        <main className="pt-20 relative z-10"> {/* Increased padding for repositioned navbar */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/missions" element={<AllMissionsPage />} />
            <Route path="/new-mission" element={<MissionFormPage />} />
            <Route path="/map-view" element={<MapViewPage />} />
            {/* Add a fallback route */}
            <Route path="*" element={<div className="p-4">Page not found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;