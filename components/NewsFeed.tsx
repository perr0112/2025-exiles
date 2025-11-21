import React from "react";
import FadeIn from "./FadeIn";
import { Instagram } from "lucide-react";

const POSTS = [
  { id: 1, image: "/images/post1.png" },
  { id: 2, image: "/images/post2.png" },
  { id: 3, image: "/images/post3.png" },
];

const NewsFeed: React.FC = () => {
  return (
    <section className="w-full bg-black py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <FadeIn variant="right">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase text-white leading-none">
              Pour suivre les exilés...
            </h2>
          </FadeIn>

          <FadeIn variant="left" delay={0.2}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-white border border-white/20 px-6 py-3 rounded-full hover:scale-110 transition-all duration-300"
            >
              <Instagram
                size={24}
                className="group-hover:rotate-12 transition-transform duration-300"
              />
              <span className="uppercase tracking-widest text-sm font-bold hidden md:inline">
                Instagram
              </span>
            </a>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post, index) => (
            <FadeIn
              key={post.id}
              delay={0.2 + index * 0.1}
              variant="up"
              className="h-full"
            >
              <article className="group relative h-full flex flex-col cursor-pointer transition-transform duration-500 hover:-translate-y-2">
                {/* Image Container - Full Poster Display */}
                <div className="relative w-full rounded-sm overflow-hidden shadow-2xl border border-white/5">
                  <img
                    src={post.image}
                    alt="Instagram Post"
                    className="w-full h-auto object-contain"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Instagram
                      className="text-white drop-shadow-lg transform scale-0 group-hover:scale-125 transition-transform duration-300"
                      size={48}
                    />
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsFeed;
