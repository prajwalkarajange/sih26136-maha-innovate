import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MahiAssistantDrawer } from './MahiAssistantDrawer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Official Government Header */}
      <Header />

      {/* Main Body Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Official Government Footer */}
      <Footer />

      {/* Floating AI Assistant Drawer */}
      <MahiAssistantDrawer />
    </div>
  );
};
