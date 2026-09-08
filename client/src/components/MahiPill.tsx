import React from 'react';
import { useMahi } from '../context/MahiContext';
import { Bot, Sparkles } from 'lucide-react';

interface MahiPillProps {
  label: string;
  contextPage?: string;
  customPrompt?: string;
  className?: string;
}

export const MahiPill: React.FC<MahiPillProps> = ({
  label,
  contextPage = 'current',
  customPrompt,
  className = '',
}) => {
  const { askMahiContext } = useMahi();

  const handleClick = () => {
    const promptToSend = customPrompt || label.replace('Ask Mahi', '').replace('?', '').trim();
    askMahiContext(promptToSend, contextPage);
  };

  return (
    <div className={`flex justify-center my-3 ${className}`}>
      <button
        onClick={handleClick}
        className="group inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full text-xs font-semibold shadow-sm hover:shadow transition transform active:scale-95 border border-blue-400/30"
      >
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
          <Bot className="w-3.5 h-3.5 text-white animate-pulse" />
        </div>
        <span>{label}</span>
        <Sparkles className="w-3 h-3 text-amber-300 opacity-80 group-hover:opacity-100" />
      </button>
    </div>
  );
};
