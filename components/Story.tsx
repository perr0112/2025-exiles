import React, { useRef, useState, useEffect } from "react";
import { Person } from "../types";
import FadeIn from "./FadeIn";
import ChatInterface from "./ChatInterface";
import InteractiveGlobe from "./InteractiveGlobe";
import NotificationStream from "./NotificationStream";
import MessageInput from "./MessageInput";
import ParallaxImage from "./ParallaxImage";
import AudioPlayer from "./AudioPlayer";
import PhotoGallery from "./PhotoGallery";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import NewsFeed from "./NewsFeed";

interface StoryProps {
  person: Person;
  onBack: () => void;
}

const Story: React.FC<StoryProps> = ({ person, onBack }) => {
  const footerRef = useRef<HTMLElement>(null);
  const [userInputValue, setUserInputValue] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for Hero Parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSendMessage = () => {
    if (!userInputValue.trim()) return;

    setSubmittedMessage(userInputValue);

    // Smooth scroll to footer after a tiny delay
    setTimeout(() => {
      footerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Custom draft text mapping for each profile
  const getDraftMessage = (id: string) => {
    switch (id) {
      case "rand":
        return "Je t'aime maman, prends soin de toi. ne t'en fais pas pour moi.";
      case "omar":
        return "J'ai passé la frontière. Dis à père que je suis sauf.";
      case "sarah":
        return "On est dans le train. Léa dort. Je vous appelle dès qu'on arrive.";
      case "youssef":
        return "Je suis caché. Tout va bien se passer. Adieu.";
      case "elena":
        return "Je vois la côte italienne. Je suis vivante.";
      default:
        return "Je suis en sécurité.";
    }
  };

  const draftMessage = getDraftMessage(person.id);

  return (
    <div className="bg-black min-h-screen w-full relative selection:bg-blue-500/30">
      {/* Back Navigation */}
      <button
        onClick={onBack}
        className="fixed top-8 left-8 z-50 text-white mix-blend-difference opacity-80 hover:opacity-100 transition-opacity flex items-center gap-2 group"
      >
        <div className="p-2 border border-white/30 rounded-full group-hover:bg-white group-hover:text-black transition-colors duration-300">
          <ArrowLeft size={20} />
        </div>
        <span className="hidden md:inline font-display tracking-widest text-sm animate-in slide-in-from-left-2 duration-500">
          RETOUR
        </span>
      </button>

      {/* Hero Section with Parallax */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          {/* Parallax Image Background */}
          <div
            className="w-full h-[110%] absolute top-0 left-0"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <img
              src={person.heroImage}
              alt={person.name}
              className="w-full h-full object-cover opacity-80 scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
        </div>

        <div
          className="absolute bottom-20 right-8 md:right-20 text-right z-10"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: 1 - scrollY / 700,
          }}
        >
          <FadeIn delay={0.2} variant="blur">
            <h1 className="person-name text-8xl md:text-[12rem] font-display leading-none tracking-normal mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
              {person.name}
            </h1>
          </FadeIn>
          <FadeIn delay={0.4} variant="up">
            <div className="text-gray-300 text-lg md:text-xl font-light tracking-wide border-t border-gray-600 pt-4 inline-block text-right w-full">
              <p>
                {person.age} ans, {person.origin}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                En France depuis {person.yearsInFrance} ans
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Narrative Sections */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-40">
        {person.story.map((section, idx) => (
          <section
            key={idx}
            className={`flex flex-col md:flex-row gap-12 items-center ${
              section.alignment === "right" ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text Side */}
            <div className="flex-1 space-y-6 w-full">
              <FadeIn variant="blur" duration={1}>
                {section.title && (
                  <h2 className="text-4xl md:text-6xl font-display font-bold uppercase leading-tight mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                    {section.title}
                  </h2>
                )}

                {section.type === "quote" ? (
                  <blockquote className="text-3xl md:text-5xl font-display leading-tight text-white border-l-4 border-white pl-6 py-2">
                    "{section.content}"
                  </blockquote>
                ) : (
                  <div className="space-y-6">
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg font-light">
                      {section.content}
                    </p>
                    {/* Audio Player Integration */}
                    {section.type === "audio" && section.audioSrc && (
                      <div className="pt-4">
                        <AudioPlayer
                          src={section.audioSrc}
                          caption="Note vocale enregistrée"
                        />
                      </div>
                    )}
                  </div>
                )}
              </FadeIn>
            </div>

            {/* Visual Side */}
            <div className="flex-1 w-full flex justify-center">
              <FadeIn
                delay={0.2}
                variant="scale"
                className="relative group w-full"
              >
                {section.type === "video_placeholder" ? (
                  <div className="aspect-video bg-gray-800 flex items-center justify-center border border-gray-700">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm animate-pulse">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                ) : section.type === "carousel" && section.gallery ? (
                  <div className="w-full flex justify-center">
                    <PhotoGallery
                      images={section.gallery}
                      title={section.title}
                    />
                  </div>
                ) : (
                  <div
                    className={`relative ${
                      section.type === "quote"
                        ? "aspect-square"
                        : "aspect-[3/4]"
                    } w-full shadow-2xl max-w-md mx-auto`}
                  >
                    {section.type === "quote" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-black text-4xl font-display uppercase font-black text-center p-4 z-10 opacity-0 md:opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                        <span>{section.title}</span>
                      </div>
                    )}

                    {section.image && (
                      <ParallaxImage
                        src={section.image}
                        alt="Story visual"
                        className="w-full h-full"
                      />
                    )}
                  </div>
                )}

                {section.type === "quote" && (
                  <div className="absolute -right-10 top-1/2 md:w-40 text-right mix-blend-difference z-20 hidden md:block">
                    <span className="font-display text-4xl md:text-5xl uppercase leading-none block transform -rotate-90 md:rotate-0 origin-center text-white opacity-50">
                      {person.quote}
                    </span>
                  </div>
                )}
              </FadeIn>
            </div>
          </section>
        ))}
      </div>

      {/* Transition Section: Notification Stream */}
      <section className="w-full">
        <NotificationStream />
      </section>

      {/* NEW Video Section */}
      <section className="w-full bg-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn variant="blur">
            <h2 className="text-4xl md:text-6xl font-display uppercase mb-6 text-center">
              La Réalité du Terrain
            </h2>
          </FadeIn>

          {person.id === "rand" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 items-center">
              {/* Video */}
              <FadeIn delay={0.2} variant="left">
                <div className="relative aspect-video w-full bg-gray-900 rounded-sm overflow-hidden shadow-2xl border border-gray-800 group">
                  <video
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 scale-105 group-hover:scale-100 transition-transform duration-[2s]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://picsum.photos/id/15/1280/720"
                  >
                    <source src="/video.mov" type="video/mp4" />
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

                  <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                    <span className="text-white font-mono text-xs tracking-widest uppercase">
                      REC
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 z-20">
                    <p className="text-white font-mono text-xs md:text-sm tracking-widest uppercase mb-1 opacity-70">
                      04:23:12 • 36.2048° N, 37.1343° E
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Context Text */}
              <FadeIn delay={0.4} variant="right">
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl font-display uppercase text-white">
                    Un Pays Encore Instable
                  </h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Depuis la chute du régime en décembre 2024, la Syrie reste
                    divisée entre groupes armés. 16 millions de Syriens ont
                    besoin d'aide urgente. Les violences, déplacements forcés et
                    exactions alimentent la peur quotidienne. Malgré des
                    tentatives de reconstruction, la méfiance envers le
                    gouvernement de transition reste forte et l'avenir demeure
                    incertain.
                  </p>
                  <p className="text-gray-500 text-sm italic">
                    Images enregistrées quelques heures avant le passage de la
                    frontière.
                  </p>
                </div>
              </FadeIn>
            </div>
          )}
        </div>
      </section>

      <div className="w-full bg-black">
        {/* Interactive Component: Last Message */}
        <section className="py-20 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
          {/* Container unlocked from max-w-md to allow wider children */}
          <div className="relative w-full flex flex-col items-center">
            {/* Phone Container */}
            <FadeIn
              variant="up"
              className="relative z-10 scale-90 md:scale-100 w-full max-w-[400px] mx-auto"
            >
              <div className="relative">
                {/* Glow effect behind phone */}
                <div className="absolute inset-0 bg-blue-900 blur-[120px] opacity-20 rounded-full transform translate-y-20"></div>

                <ChatInterface
                  messages={person.chatMessages}
                  contactName="Maman"
                  avatar={person.thumbnail}
                  draftText={draftMessage}
                />

                {/* THE GRADIENT FADE OVERLAY - Fades the bottom of phone into black so text sits nicely */}
                <div className="absolute bottom-0 left-[-20%] right-[-20%] h-[500px] bg-gradient-to-t from-black via-black via-60% to-transparent z-20 pointer-events-none"></div>
              </div>
            </FadeIn>

            {/* TEXT OVERLAY */}
            <div className="relative z-30 -mt-56 md:-mt-64 text-center flex flex-col items-center w-full px-4 pb-10">
              <FadeIn
                delay={0.3}
                variant="blur"
                className="w-full max-w-6xl mx-auto"
              >
                <p className="text-gray-400 font-light tracking-[0.2em] uppercase text-sm md:text-base mb-2">
                  Et vous, quel serait
                </p>
                <h2 className="text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-display uppercase leading-none tracking-tight text-white mb-4 drop-shadow-2xl whitespace-nowrap">
                  Votre dernier message
                </h2>
                <p className="text-gray-400 font-light tracking-[0.2em] uppercase text-lg md:text-2xl mb-12">
                  avant l'exil ?
                </p>
              </FadeIn>
            </div>

            {/* USER INPUT SECTION */}
            <FadeIn
              delay={0.5}
              variant="scale"
              className="relative z-40 w-full max-w-2xl px-4 mt-4"
            >
              <MessageInput
                value={userInputValue}
                onChange={setUserInputValue}
                onSend={handleSendMessage}
                placeholder="Votre dernier message..."
              />
            </FadeIn>
          </div>
        </section>
      </div>

      {/* Footer Navigation */}
      <footer
        ref={footerRef}
        className="relative h-screen bg-black overflow-hidden flex flex-col justify-end pb-20"
      >
        {/* Background decorative blob */}
        <div className="absolute -bottom-[20vw] left-0 w-full h-[80vh] opacity-10 pointer-events-none bg-gradient-to-t from-gray-800 to-transparent"></div>

        {/* Interactive Globe with custom message prop */}
        <div className="absolute bottom-0 left-0 w-full h-full md:w-2/3 flex items-end justify-start z-10 opacity-80 hover:opacity-100 transition-opacity duration-1000">
          <div className="w-full h-[90%] -ml-[5%] mb-20">
            <InteractiveGlobe customMessage={submittedMessage} />
          </div>
        </div>

        <div className="relative z-20 container mx-auto px-6 flex flex-col md:flex-row justify-end items-center md:items-end gap-8 mb-40 pointer-events-none">
          <FadeIn
            variant="left"
            className="text-right pointer-events-auto flex flex-col items-end"
          >
            <h3 className="font-display text-5xl md:text-7xl uppercase mb-4 leading-none drop-shadow-xl">
              Découvrir
              <br />
              d'autres parcours
            </h3>
            <p className="text-gray-400 text-lg md:text-xl mb-10 font-light tracking-wide max-w-md ml-auto">
              Chaque histoire est unique. Continuez l'expérience.
            </p>

            <a
              href="https://www.france.tv/documentaires/documentaires-societe/a-l-epreuve-des-reseaux/4530658-exiles-le-documentaire.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm md:text-lg transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:bg-blue-50 inline-flex items-center"
            >
              <span className="relative z-10 flex items-center gap-4">
                Regarder le documentaire
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-45 group-hover:bg-blue-600 group-hover:scale-110">
                  <ArrowUpRight size={18} strokeWidth={3} />
                </div>
              </span>
            </a>

            <div className="mt-8 opacity-80">
              <span className="text-white font-bold tracking-tight text-xl">
                france<span className="text-blue-500">•</span>tv
              </span>
            </div>
          </FadeIn>
        </div>
      </footer>

      {/* News Feed Section */}
      <NewsFeed />
    </div>
  );
};

export default Story;
