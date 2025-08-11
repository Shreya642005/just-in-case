import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = ({ scrollToAbout, scrollToMissions }) => {
  const [scrollY, setScrollY] = useState(0);
  const [footerTop, setFooterTop] = useState(Infinity);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (footer) {
      setFooterTop(footer.offsetTop);
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slow fall with full visibility
  const spiderHeight = 400;
  const buffer = 40;
  const maxScroll = footerTop - spiderHeight - buffer;

  const clampedScrollY = Math.min(scrollY, maxScroll);
  const spiderTranslateY = clampedScrollY * 0.01; // slower fall
  const spiderRotate = Math.min(clampedScrollY * 0.02, 8);
  const threadHeight = 128 + clampedScrollY * 0.15;

  return (
    <section className="relative min-h-screen pt-28 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 text-white overflow-hidden">
      
      {/* Text Content */}
      <div className="z-10 text-left max-w-xl mt-10 md:mt-0 transform translate-y-[-4.5rem] translate-x-2 md:translate-y-[-4.5rem] md:translate-x-4">
        <motion.h1
          className="text-[50px] md:text-[80px] leading-tight font-['Anton'] font-normal"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="block text-white">PETER'S</span>
          <span className="block text-[#a62121]">VICTORY DIARIES</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-gray-300"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          A web-slinger's chronicle of battles fought and lives saved.
          After the world forgot Peter Parker, this digital journal became his only record of the hero he still is.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <div className="relative">
            <img
              src="/images/twinwebleft.png"
              className="absolute -top-4 -left-6 w-16 opacity-70"
              alt="web left"
            />
            <button
              onClick={scrollToMissions}
              className="bg-[#213A8F] text-white px-6 py-2 font-bold uppercase text-sm shadow-md hover:bg-[#1a2f70] transition"
            >
              NEW MISSION LOG
            </button>
          </div>
          <div className="relative">
            <img
              src="/images/twinwebright.png"
              className="absolute -top-4 -right-6 w-16 opacity-70"
              alt="web right"
            />
            <button
              onClick={scrollToAbout}
              className="border border-red-600 text-white px-6 py-2 font-bold uppercase text-sm hover:bg-red-600 transition"
            >
              VIEW ARCHIVES
            </button>
          </div>
        </motion.div>
      </div>

      {/* Spiderman Animation */}
      <motion.div
        className="fixed top-[-30px] left-[63%] z-[-10] flex flex-col items-center pointer-events-none"
        style={{
          transform: `translateY(${spiderTranslateY}px) rotate(${spiderRotate}deg)`
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.img
          src="/images/thread.jpg"
          alt="Web Thread"
          className="object-contain"
          style={{ height: `${Math.min(threadHeight, 220)}px` }}
        />
        <motion.img
          src="/images/Spiderman.png"
          alt="Spiderman"
          className="w-[260px] md:w-[400px] ml-[-40px] md:ml-[-25px]"
          style={{
            filter: "drop-shadow(0 0 25px rgba(255,0,0,0.4))"
          }}
          animate={{
            y: [0, -9, 0],
            rotateY: [0, 2, 0, -2, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
