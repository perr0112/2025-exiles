import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  caption?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, caption }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full max-w-md bg-[#1C1C1E] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden group">
      <audio ref={audioRef} src={src} />
      
      {/* Glow effect behind */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}></div>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                    <Volume2 size={20} />
                </div>
                <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">Note Vocale</span>
            </div>
            <span className="text-xs font-mono text-gray-500">{formatTime(audioRef.current?.currentTime || 0)} / {formatTime(duration)}</span>
        </div>

        <div className="flex items-center gap-4">
            <button 
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0"
            >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>

            {/* Simulated Waveform */}
            <div className="flex-1 h-12 flex items-center gap-[3px] opacity-80">
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i} 
                        className="w-1 bg-blue-500 rounded-full transition-all duration-150"
                        style={{
                            height: isPlaying ? `${Math.max(20, Math.random() * 100)}%` : '20%',
                            opacity: (i / 20) * 100 > progress ? 0.3 : 1,
                            animation: isPlaying ? `wave 0.5s ease-in-out infinite ${i * 0.05}s` : 'none'
                        }}
                    ></div>
                ))}
            </div>
        </div>

        {caption && (
             <p className="text-sm text-gray-300 font-light italic border-l-2 border-blue-500 pl-3 mt-2">
                 "{caption}"
             </p>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;