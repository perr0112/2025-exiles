import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

interface GlobeMessage {
  id: number;
  lat: number;
  long: number;
  text: string;
  location: string;
}

const INITIAL_MESSAGES: GlobeMessage[] = [
  {
    id: 1,
    lat: 46.2,
    long: 2.2,
    text: "Bienvenue en sécurité.",
    location: "France",
  },
  {
    id: 2,
    lat: 34.8,
    long: 38.0,
    text: "Prenez soin de vous je vous aime fort!",
    location: "Syrie",
  },
  {
    id: 3,
    lat: 15.0,
    long: 30.0,
    text: "Le voyage est long mais je tiens bon.",
    location: "Soudan",
  },
  {
    id: 4,
    lat: 48.3,
    long: 31.1,
    text: "On espère vous revoir un jour.",
    location: "Ukraine",
  },
  {
    id: 5,
    lat: 33.9,
    long: 67.7,
    text: "Je pense à vous chaque jour.",
    location: "Afghanistan",
  },
  {
    id: 6,
    lat: 15.1,
    long: 39.0,
    text: "Ne vous inquiétez pas pour moi.",
    location: "Erythrée",
  },
  {
    id: 7,
    lat: 40.7,
    long: -74.0,
    text: "Loin des yeux, près du cœur.",
    location: "USA",
  },
  {
    id: 8,
    lat: -22.9,
    long: -43.1,
    text: "Un jour nous serons réunis.",
    location: "Brésil",
  },
];

interface InteractiveGlobeProps {
  customMessage?: string | null;
}

const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  customMessage,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // We now track an array of active messages (the 2 closest)
  const [activeMessages, setActiveMessages] = useState<GlobeMessage[]>([
    INITIAL_MESSAGES[0],
    INITIAL_MESSAGES[1],
  ]);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);

  // Combine initial messages with potential custom message
  const [currentMessages, setCurrentMessages] =
    useState<GlobeMessage[]>(INITIAL_MESSAGES);

  useEffect(() => {
    if (customMessage) {
      const newUserMsg: GlobeMessage = {
        id: 999,
        lat: 48.8566, // Paris
        long: 2.3522,
        text: customMessage,
        location: "VOUS",
      };
      // Add new message to the start of the array and update state
      const newColors = [newUserMsg, ...INITIAL_MESSAGES];
      setCurrentMessages(newColors);
      // Reset rotation to start near Europe roughly where the user message likely is
      phiRef.current = 5.8;
    }
  }, [customMessage]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0, 0.6, 1],
      glowColor: [0.1, 0.1, 0.1],
      opacity: 0.8,
      markers: currentMessages.map((m) => ({
        location: [m.lat, m.long],
        size: m.id === 999 ? 0.15 : 0.08,
      })),
      onRender: (state) => {
        // 1. Slow rotation
        if (!pointerInteracting.current) {
          phiRef.current += 0.001;
        }
        state.phi = phiRef.current + pointerInteractionMovement.current;

        // 2. Precise calculation of visible longitude at center
        const rot = state.phi % (2 * Math.PI);
        const viewLong = -((rot * 180) / Math.PI);

        // Find the 2 messages closest to the screen center
        // Sort by distance to viewLong
        const sorted = currentMessages
          .map((msg) => {
            let diff = (msg.long - viewLong) % 360;
            // Normalise diff to -180 to 180
            if (diff < -180) diff += 360;
            if (diff > 180) diff -= 360;
            return { msg, dist: Math.abs(diff) };
          })
          .sort((a, b) => a.dist - b.dist);

        const top2 = [sorted[0].msg, sorted[1].msg];

        setActiveMessages((prev) => {
          // Only update state if the top 2 have changed to avoid thrashing
          if (prev[0]?.id === top2[0].id && prev[1]?.id === top2[1].id) {
            return prev;
          }
          return top2;
        });
      },
    });

    return () => {
      globe.destroy();
    };
  }, [currentMessages]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center">
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "600px",
            maxHeight: "600px",
            objectFit: "contain",
          }}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current;
            canvasRef.current!.style.cursor = "grabbing";
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            canvasRef.current!.style.cursor = "grab";
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            canvasRef.current!.style.cursor = "grab";
          }}
          onPointerMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta * 0.005;
            }
          }}
        />
      </div>

      {/* Floating Message Bubbles */}
      {activeMessages.map((msg, index) => {
        // Position Logic: 0 = Top Right, 1 = Bottom Left
        const isTopRight = index === 0;

        return (
          <div
            key={`${msg.id}-${index}`}
            className={`absolute pointer-events-none transition-all duration-700 ease-in-out
                  ${
                    isTopRight
                      ? "top-[30%] right-[15%] md:right-[28%] z-30 origin-bottom-left"
                      : "bottom-[15%] left-[5%] md:left-[10%] z-30 origin-top-right"
                  }
                  ${
                    msg.id === 999
                      ? "scale-110 !opacity-100 z-40"
                      : "scale-100 opacity-90"
                  }
              `}
          >
            <div
              className={`
                      p-4 rounded-2xl shadow-[0_0_30px_rgba(0,153,255,0.3)] 
                      max-w-[260px] md:max-w-xs backdrop-blur-sm border transition-colors duration-500
                      ${
                        msg.id === 999
                          ? "bg-white text-black border-white"
                          : "bg-[#0099FF]/90 text-white border-[#0099FF]/30"
                      }
                      ${
                        isTopRight
                          ? "rounded-bl-none" // Sharp bottom-left corner pointing to center (from top right)
                          : "rounded-tr-none" // Sharp top-right corner pointing to center (from bottom left)
                      }
                  `}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    msg.id === 999 ? "bg-blue-500" : "bg-green-400"
                  }`}
                ></div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-90">
                  {msg.location}
                </p>
              </div>
              <p className="text-sm font-medium leading-snug italic animate-in fade-in slide-in-from-bottom-1 duration-300">
                "{msg.text}"
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InteractiveGlobe;
