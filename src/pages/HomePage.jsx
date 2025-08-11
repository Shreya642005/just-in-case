import { useRef } from "react";
import Hero from "@/components/Hero";
import About from "@/components/sections/About";
import MissionPreview from "@/components/sections/MissionPreview";

export default function HomePage() {
  const aboutRef = useRef(null);
  const missionsRef = useRef(null);
  const footerRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative bg-[#151414] min-h-screen">
      {/* Fixed Static Background Elements for Entire Home Page */}
      <img
        src="/images/BackgroundLogo.png"
        alt="Background Logo"
        className="background-logo-stable"
      />
      <img
        src="/images/web2.png"
        className="fixed top-0 left-0 w-[300px] opacity-90 z-0 pointer-events-none"
        alt="web-top-left"
      />
      <img
        src="/images/web1.png"
        className="fixed top-0 right-0 w-[200px] opacity-70 z-0 pointer-events-none"
        alt="web-top-right"
      />

      {/* All content sections with relative positioning over the fixed background */}
      <div className="relative z-10">
        <Hero
          scrollToAbout={() => scrollTo(aboutRef)}
          scrollToMissions={() => scrollTo(missionsRef)}
        />

        <section ref={aboutRef} className="scroll-mt-20">
          <About />
        </section>
        <section ref={missionsRef} className="scroll-mt-20">
          <MissionPreview />
        </section>


        <footer
          ref={footerRef}
          className="bg-black/30 text-gray-400 border-t border-gray-800 backdrop-blur-sm"
        >
          <div className="container mx-auto px-6 py-12 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-12">
            {/* Logo */}
            <div className="space-y-4 text-center md:text-left">
              <img src="/images/logo.png" alt="Spider-Verse Logo" className="h-14 w-auto mx-auto md:mx-0" />
              <p className="text-sm text-gray-400/80">
                Documenting Peter Parker's heroic journey since 2023.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <h3 className="text-white font-medium text-lg mb-3">Quick Links</h3>
              <ul className="space-y-2.5">
                <li>
                  <button onClick={() => scrollTo(aboutRef)} className="hover:text-red-400 transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo(missionsRef)} className="hover:text-red-400 transition-colors">
                    Missions
                  </button>
                </li>
                <li>
                  <a href="/map" className="hover:text-red-400 transition-colors">
                    Interactive Map
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h3 className="text-white font-medium text-lg mb-3">Contact</h3>
              <address className="not-italic space-y-2.5">
                <p className="text-sm text-gray-300/90">Queens, New York</p>
                <p className="text-sm text-gray-300/90">web@spiderverse.com</p>
                <p className="text-sm text-gray-300/90">Emergency: 555-SPIDER</p>
              </address>
            </div>
          </div>

          <div className="mt-14 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Spider-Verse Archives. All rights reserved.</p>
            <p className="mt-1 text-gray-600">Data encrypted with Stark Industries security protocols.</p>
          </div>
        </footer>

      </div>
    </div>
  );
}
