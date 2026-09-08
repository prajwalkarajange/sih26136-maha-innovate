import React, { createContext, useContext, useState } from 'react';
import { MahiChatMessage } from '../types';
import { api } from '../services/api';

interface MahiContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
  messages: MahiChatMessage[];
  isThinking: boolean;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  sendMessage: (text: string) => Promise<void>;
  askMahiContext: (prompt: string, pageContext?: string) => void;
  clearHistory: () => void;
}

const MahiContext = createContext<MahiContextType | undefined>(undefined);

export const MahiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<MahiChatMessage[]>([
    {
      id: 'welcome',
      sender: 'mahi',
      text: `Hi! I'm **Mahi** 👋\nYour AI Assistant for **MahInnovate**.\n\nI can help you navigate Maharashtra's startup public procurement lifecycle: from requirement analysis and AI matching to pilot monitoring, direct procurement, and state-wide scaling!`,
      timestamp: 'Just now',
      suggestedActions: [
        { label: 'Find Best Challenges', action: 'NAVIGATE', path: '/marketplace' },
        { label: 'Explain Evaluation', action: 'NAVIGATE', path: '/evaluations/1' },
      ],
    },
  ]);

  const toggleOpen = () => setIsOpen(prev => !prev);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: MahiChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const response = await api.mahiChat(text, { page: currentPage });
      const mahiReply: MahiChatMessage = {
        id: `mahi-${Date.now()}`,
        sender: 'mahi',
        text: response.reply,
        timestamp: 'Just now',
        suggestedActions: response.suggestedActions,
      };
      setMessages(prev => [...prev, mahiReply]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'mahi',
          text: 'I am here to help! Could you please repeat that or select one of the suggested prompts below?',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const askMahiContext = (prompt: string, pageContext?: string) => {
    if (pageContext) setCurrentPage(pageContext);
    setIsOpen(true);
    sendMessage(prompt);
  };

  const clearHistory = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'mahi',
        text: `Hi! I'm **Mahi** 👋\nHow can I help you today?`,
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <MahiContext.Provider
      value={{
        isOpen,
        setIsOpen,
        toggleOpen,
        messages,
        isThinking,
        currentPage,
        setCurrentPage,
        sendMessage,
        askMahiContext,
        clearHistory,
      }}
    >
      {children}
    </MahiContext.Provider>
  );
};

export const useMahi = () => {
  const context = useContext(MahiContext);
  if (!context) throw new Error('useMahi must be used within a MahiProvider');
  return context;
};
