import React, { useRef, useEffect, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: 'up' | 'blur' | 'scale' | 'left' | 'right';
  duration?: number;
  threshold?: number;
}

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  className = '', 
  variant = 'up',
  duration = 0.8,
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  const getStyles = () => {
    const baseTransition = `all ${duration}s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`;
    
    let transform = 'none';
    let opacity = isVisible ? 1 : 0;
    let filter = 'none';

    if (!isVisible) {
      switch (variant) {
        case 'up':
          transform = 'translateY(40px)';
          break;
        case 'blur':
          transform = 'translateY(20px) scale(0.98)';
          filter = 'blur(10px)';
          break;
        case 'scale':
          transform = 'scale(1.1)'; // Zooms out to 1
          break;
        case 'left':
          transform = 'translateX(-40px)';
          break;
        case 'right':
          transform = 'translateX(40px)';
          break;
      }
    }

    return {
      opacity,
      transform,
      filter,
      transition: baseTransition,
      willChange: 'transform, opacity, filter',
    };
  };

  return (
    <div
      ref={ref}
      className={className}
      style={getStyles()}
    >
      {children}
    </div>
  );
};

export default FadeIn;