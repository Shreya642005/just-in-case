import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4">
      <div className="p-[1.3px] bg-gradient-to-r from-red-600/80 via-[#4d0000]/60 to-transparent rounded-md shadow-lg max-w-[1100px] mx-auto mt-8">
        <header className="bg-gradient-to-r from-red-950/95 via-black/95 to-black/90 rounded-md backdrop-blur-sm">
          <nav className="px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" aria-label="Brand" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Spider Logo"
                className="w-10 h-10" 
              />
            </Link>

            {/* Navigation Links */}
            <div className="hidden sm:flex gap-10 text-white text-sm font-light font-['Anton'] tracking-wider opacity-90 transform scale-x-95">
              <Link to="/" className="hover:text-red-500 transition-colors duration-300">Home</Link>
              <Link to="/new-mission" className="hover:text-red-500 transition-colors duration-300">Mission Log</Link>
              <Link to="/missions" className="hover:text-red-500 transition-colors duration-300">All Missions</Link>
              <Link to="/map-view" className="hover:text-red-500 transition-colors duration-300">Map View</Link>
            </div>

            {/* Mobile menu icon */}
            <div className="sm:hidden">
              <button type="button" className="text-white" aria-label="Toggle navigation">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}