import React, { useRef, useEffect, useState } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, alt, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (containerRef.current) observer.unobserve(containerRef.current);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
    >
      {/* The Image Wrapper scales down from 1.2 to 1.0 */}
      <div 
        className="w-full h-full transition-transform duration-[1.5s] ease-out will-change-transform"
        style={{
          transform: isVisible ? 'scale(1)' : 'scale(1.2)'
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Optional: A subtle shine effect passing through on reveal */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        style={{
          transform: isVisible ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 1.5s ease-in-out'
        }}
      />
    </div>
  );
};

export default ParallaxImage;