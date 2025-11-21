import React from 'react';
import { ArrowUp } from 'lucide-react';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder = "iMessage",
  disabled = false
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled && value.trim()) {
      onSend();
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-[#2C2C2E] text-white rounded-full py-3.5 pl-6 pr-12 text-[17px] placeholder-[#8E8E93] border border-[#3A3A3C] focus:outline-none focus:border-[#48484A] focus:bg-[#1C1C1E] transition-all duration-300"
        />
        <button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className={`absolute right-1.5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 transform ${
            value.trim() && !disabled
              ? 'bg-[#007AFF] text-white opacity-100 scale-100 hover:bg-[#0062cc]'
              : 'bg-[#3A3A3C] text-[#8E8E93] opacity-0 scale-75 cursor-not-allowed'
          }`}
          aria-label="Envoyer"
        >
          <ArrowUp size={18} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;