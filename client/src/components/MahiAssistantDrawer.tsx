import React, { useState, useRef, useEffect } from 'react';
import { useMahi } from '../context/MahiContext';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  X,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export const MahiAssistantDrawer: React.FC = () => {
  const {
    isOpen,
    toggleOpen,
    messages,
    isThinking,
    sendMessage,
    clearHistory
  } = useMahi();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isThinking]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isThinking) return;
    const text = input;
    setInput('');
    await sendMessage(text);
  };

  const tryAskingPrompts = [
    'How do I register as a startup?',
    'Show challenges related to AI & IoT',
    'How to submit a proposal?',
    'What documents are required?',
    'Explain the evaluation criteria',
    'Help me track my proposal',
    'What is the procurement process?',
    'Give a summary of this challenge',
  ];

  if (!isOpen) {
    return (
      <button
        onClick={toggleOpen}
        aria-label="Open Mahi AI Assistant"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-xl hover:shadow-2xl transition transform hover:scale-105 active:scale-95 group border-2 border-white/80"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white animate-bounce" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold leading-tight">Mahi AI Assistant</div>
          <div className="text-[10px] text-blue-200 leading-tight">Click to ask anything</div>
        </div>
        <Sparkles className="w-4 h-4 text-amber-300" />
      </button>
    );
  }

  return (
    <aside
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 md:w-[420px] bg-slate-50 border-l border-slate-300 shadow-2xl flex flex-col transition-all duration-300 animate-in slide-in-from-right"
    >
      {/* Drawer Header matching Reference Image */}
      <div className="bg-[#0b3b60] text-white p-3.5 flex items-center justify-between shadow">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-500/30 flex items-center justify-center border border-blue-300/40">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight">AI Assistant – Mahi (Chatbot)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={clearHistory}
            className="p-1 hover:bg-white/10 rounded text-blue-200 hover:text-white transition"
            title="Reset Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={toggleOpen}
            className="p-1 hover:bg-white/10 rounded text-blue-200 hover:text-white transition"
            title="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Assistant Body Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Waving Mascot & Welcome Card from Reference Image */}
        <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-8 -mt-8 pointer-events-none" />

          {/* Friendly Robot Avatar */}
          <div className="w-20 h-20 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-1 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#0d2137] rounded-xl flex flex-col items-center justify-center relative">
              {/* Robot Face */}
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
              </div>
              <div className="w-5 h-1 bg-cyan-300 rounded-full" />
              {/* Antenna */}
              <div className="absolute -top-3 w-1.5 h-3 bg-sky-300 rounded-full">
                <div className="w-3 h-3 -mt-1.5 -ml-[3px] rounded-full bg-amber-400 shadow" />
              </div>
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900">Hi! I'm Mahi 👋</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Your AI Assistant for MahInnovate
          </p>

          <div className="text-left mt-3 pt-3 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-600 mb-2">I can help you with:</p>
            <div className="grid grid-cols-1 gap-1 text-xs text-slate-700">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> Login & Registration
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> Find best challenges
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> Guide proposal submission
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> Explain evaluation process
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> Track application status
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> Answer procurement queries
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> Provide step-by-step support
              </span>
            </div>
          </div>
        </div>

        {/* Try asking me prompt section matching reference image */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Try asking me:</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {tryAskingPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(prompt)}
                className="text-left text-xs bg-white hover:bg-blue-600 hover:text-white text-slate-700 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-600 shadow-2xs transition flex items-center justify-between group"
              >
                <span>{prompt}</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-white transition" />
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Messages */}
        <div className="space-y-3 pt-1">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-xs shadow-sm font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-sm whitespace-pre-wrap'
                  }`}
                >
                  {m.text}
                </div>

                {/* Suggested Action Buttons if any */}
                {m.suggestedActions && m.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.suggestedActions.map((action, aidx) => (
                      <button
                        key={aidx}
                        onClick={() => {
                          if (action.path) {
                            navigate(action.path);
                            toggleOpen();
                          }
                        }}
                        className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full text-[11px] font-semibold flex items-center gap-1 transition shadow-2xs"
                      >
                        <span>{action.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
                <span className="text-[9px] text-slate-400 mt-0.5 px-1">{m.timestamp}</span>
              </div>
            );
          })}

          {isThinking && (
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 w-fit text-xs text-slate-500 shadow-sm">
              <Bot className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              <span>Mahi is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition shadow-sm"
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Callout from Reference Image */}
        <div className="mt-2 text-center text-[10px] text-indigo-700 font-semibold bg-indigo-50 py-1 rounded">
          🚀 Mahi is available on all pages!
        </div>
      </div>
    </aside>
  );
};
