import React, { useState, useEffect, useRef } from "react";
import { ChatMessage } from "../types";
import { ChevronLeft, Video, Plus, Mic, ChevronRight } from "lucide-react";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  contactName: string;
  avatar: string;
  draftText?: string;
}

const TypingIndicator = () => (
  <div className="flex gap-1 py-3 px-4">
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "0ms" }}
    ></div>
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "150ms" }}
    ></div>
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "300ms" }}
    ></div>
  </div>
);

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  contactName,
  avatar,
  draftText,
}) => {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
      }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let currentIndex = 0;

    const showNextMessage = () => {
      if (currentIndex >= messages.length) return;

      const currentMessage = messages[currentIndex];

      // Show typing indicator for "them" messages
      if (currentMessage.sender === "them") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages((prev) => [...prev, currentMessage]);
          currentIndex++;

          // Schedule next message
          setTimeout(showNextMessage, 800);
        }, 1500); // Typing duration
      } else {
        // Show "me" messages immediately
        setVisibleMessages((prev) => [...prev, currentMessage]);
        currentIndex++;
        setTimeout(showNextMessage, 600);
      }
    };

    // Start the animation after a short delay
    const timer = setTimeout(showNextMessage, 1000);

    return () => clearTimeout(timer);
  }, [hasStarted, messages]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[375px] mx-auto h-[812px] bg-black border-[6px] border-[#1a1a1a] rounded-[3.5rem] overflow-hidden shadow-2xl relative flex flex-col font-sans select-none"
    >
      {/* Dynamic Island & Status Bar */}
      <div className="absolute top-0 left-0 w-full h-14 z-30 px-6 pt-4 flex justify-between items-start text-white font-medium text-[15px]">
        <span className="pl-2 tracking-wide">9:41</span>
        <div className="flex gap-1.5 pt-1">
          <svg className="w-4 h-3" viewBox="0 0 20 12" fill="currentColor">
            <path d="M1 10h3V5H1v5zm5 0h3V3H6v7zm5 0h3V0h-3v10zm5 0h3V7h-3v3z" />
          </svg>
          <svg className="w-4 h-3" viewBox="0 0 18 12" fill="currentColor">
            <path d="M9 0C4.5 0 1 3 1 3s2.5 8 8 8 8-8 8-8-3.5-3-8-3z" />
          </svg>
          <svg className="w-5 h-3" viewBox="0 0 24 12" fill="currentColor">
            <rect
              x="1"
              y="1"
              width="18"
              height="10"
              rx="2"
              stroke="currentColor"
              fill="none"
            />
            <rect
              x="3"
              y="3"
              width="14"
              height="6"
              rx="1"
              fill="currentColor"
            />
            <path d="M22 4h1v4h-1z" />
          </svg>
        </div>
      </div>

      {/* Dynamic Island Cutout */}
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-40 pointer-events-none"></div>

      {/* Header */}
      <div className="pt-14 pb-2 px-2 bg-black/80 backdrop-blur-xl flex items-center justify-between z-20 border-b border-white/5">
        <div className="flex items-center text-[#007AFF] -ml-1">
          <ChevronLeft size={32} strokeWidth={2} />
        </div>

        <div className="flex flex-col items-center justify-center -ml-4">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 mb-1 relative">
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-0.5 text-white text-xs font-medium">
            <span>{contactName}</span>
            <ChevronRight size={10} className="text-gray-500 mt-[1px]" />
          </div>
        </div>

        <div className="w-10 h-10 flex items-center justify-center text-[#007AFF] bg-[#1C1C1E] rounded-full mr-2">
          <Video size={20} fill="currentColor" className="opacity-90" />
        </div>
      </div>

      {/* Messages Body */}
      <div className="flex-1 bg-black overflow-y-auto p-4 space-y-6 scrollbar-hide pb-20">
        {visibleMessages.map((msg, idx) => (
          <div
            key={msg.id}
            className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            {/* Date/Time Header */}
            {msg.time && (
              <div className="text-center text-[#8E8E93] text-[11px] font-medium mb-3 tracking-wide">
                {msg.time}
              </div>
            )}

            <div
              className={`flex w-full ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] py-2 px-4 text-[17px] leading-[1.3] tracking-tight ${
                  msg.sender === "me"
                    ? "bg-[#007AFF] text-white rounded-[20px] rounded-br-sm"
                    : "bg-[#262626] text-white rounded-[20px] rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>

            {msg.sender === "me" && idx === visibleMessages.length - 1 && (
              <div className="text-right text-[#8E8E93] text-[10px] font-medium mt-1 mr-1">
                Distribué
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex w-full justify-start animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="bg-[#262626] rounded-[20px] rounded-bl-sm">
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-3 pb-8 pt-2 bg-black absolute bottom-0 w-full z-20">
        <div className="flex items-end gap-3">
          <div className="w-8 h-8 bg-[#3A3A3C] rounded-full flex items-center justify-center text-[#8E8E93] mb-[2px] shrink-0">
            <Plus size={20} />
          </div>

          <div className="flex-1 min-h-[36px] border border-[#3A3A3C] rounded-[18px] px-4 py-1.5 flex items-center justify-between bg-[#1C1C1E]">
            {draftText ? (
              <span className="text-white text-[17px] leading-snug pr-2">
                {draftText}
              </span>
            ) : (
              <span className="text-[#8E8E93] text-[17px]">iMessage</span>
            )}
            {!draftText && (
              <div className="w-4 h-4 rounded-full border border-[#8E8E93]"></div>
            )}
          </div>

          <div className="text-[#8E8E93] mb-[2px] shrink-0">
            <Mic size={24} />
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[134px] h-[5px] bg-white rounded-full z-50 pointer-events-none"></div>
    </div>
  );
};

export default ChatInterface;
