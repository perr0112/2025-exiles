import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface PhotoGalleryProps {
  images: string[];
  title?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {title && (
        <div className="flex items-center justify-between mb-4 px-1">
             <h4 className="text-sm font-display uppercase tracking-widest text-gray-400">{title}</h4>
             <Camera size={16} className="text-gray-500" />
        </div>
      )}
      
      <div className="relative bg-black rounded-[2.5rem] border-[8px] border-[#1a1a1a] shadow-2xl overflow-hidden aspect-[4/5]">
        {/* Photo Counter Badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full z-20 border border-white/10">
            <span className="text-xs font-medium text-white">
                {currentIndex + 1} / {images.length}
            </span>
        </div>

        {/* Scroll Container */}
        <div 
            className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            onScroll={handleScroll}
        >
            {images.map((src, idx) => (
                <div key={idx} className="w-full flex-shrink-0 h-full snap-center relative">
                    <img 
                        src={src} 
                        alt={`Gallery ${idx + 1}`} 
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
            ))}
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-20">
            {images.map((_, idx) => (
                <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'bg-white w-4' : 'bg-white/30'
                    }`}
                ></div>
            ))}
        </div>
      </div>
      
      <p className="text-center text-xs text-gray-500 mt-3 uppercase tracking-wider flex items-center justify-center gap-2">
         <span className="animate-pulse">←</span> Swipe <span className="animate-pulse">→</span>
      </p>
    </div>
  );
};

export default PhotoGallery;