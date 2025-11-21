import React, { useState } from "react";
import { PROFILES } from "../constants";
import { Person } from "../types";
import FadeIn from "./FadeIn";

interface LandingProps {
  onSelectProfile: (profile: Person) => void;
}

const Landing: React.FC<LandingProps> = ({ onSelectProfile }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Position logic to simulate the "scattered" look from the mockup
  // We use absolute positioning percentages for the cloud effect
  const positions = [
    { top: "10%", left: "15%", size: "w-32 h-40 md:w-48 md:h-64" },
    { top: "8%", left: "70%", size: "w-24 h-32 md:w-40 md:h-52" },
    { top: "25%", left: "45%", size: "w-24 h-24 md:w-32 md:h-32" }, // Top center small
    { top: "55%", left: "10%", size: "w-40 h-40 md:w-56 md:h-56" },
    { top: "60%", left: "75%", size: "w-28 h-28 md:w-44 md:h-44" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Gradient Spot */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-white opacity-[0.03] rounded-full blur-3xl animate-pulse duration-[4s]"></div>
      </div>

      {/* Main Title */}
      <div className="z-20 text-center mix-blend-difference mb-12 md:mb-0">
        <FadeIn variant="blur" duration={1.2}>
          <h1 className="text-7xl md:text-[10rem] font-display tracking-normal text-white leading-none drop-shadow-2xl">
            EXILÉS
          </h1>
        </FadeIn>
        <FadeIn variant="up" delay={0.5}>
          <p className="text-gray-400 text-xs md:text-sm tracking-widest mt-4 uppercase">
            Choisissez un parcours à découvrir
          </p>
        </FadeIn>
      </div>

      {/* Floating Portraits */}
      <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto pointer-events-none">
        {PROFILES.map((profile, index) => {
          const pos = positions[index % positions.length];
          const isHovered = hoveredId === profile.id;
          const isDimmed = hoveredId !== null && hoveredId !== profile.id;

          // Staggered delay for each portrait entry
          const entryDelay = 0.8 + index * 0.1;

          return (
            <div
              key={profile.id}
              className={`absolute pointer-events-auto transition-all duration-500 ease-out cursor-pointer group ${pos.size}`}
              style={{
                top: pos.top,
                left: pos.left,
                transform: isHovered ? "scale(1.1)" : "scale(1)",
                opacity: isDimmed ? 0.3 : 1,
                zIndex: isHovered ? 50 : 10,
              }}
              onMouseEnter={() => setHoveredId(profile.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectProfile(profile)}
            >
              <FadeIn
                variant="scale"
                delay={entryDelay}
                duration={1}
                className="w-full h-full"
              >
                <div className="relative w-full h-full overflow-hidden bg-gray-900 rounded-sm shadow-2xl border border-white/5">
                  <img
                    src={profile.thumbnail}
                    alt={profile.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                  />

                  {/* Checkmark Badge - Only visible on hover */}
                  <div
                    className={`absolute bottom-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black transition-all duration-300 transform ${
                      isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  >
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Name Reveal */}
                <div
                  className={`absolute -bottom-8 left-0 w-full text-center transition-all duration-300 transform ${
                    isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  <span className="font-display person-name text-xl uppercase tracking-wider text-white drop-shadow-lg">
                    {profile.name}
                  </span>
                </div>
              </FadeIn>
            </div>
          );
        })}
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 text-center w-full pointer-events-none">
        <FadeIn delay={1.5}>
          <span className="text-white font-bold tracking-tight">
            france<span className="text-blue-500">•</span>tv
          </span>
        </FadeIn>
      </div>
    </div>
  );
};

export default Landing;
