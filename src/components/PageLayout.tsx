import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import { motion } from 'motion/react';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-bg text-white selection:bg-accent selection:text-bg overflow-x-hidden dot-matrix relative font-sans">
      <CustomCursor />
      
      {/* Background Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="grid-line v-line left-6 md:left-20 top-0 opacity-100" />
        <div className="grid-line v-line left-1/2 top-0 opacity-30" />
        <div className="grid-line h-line top-16 md:top-20 left-0 opacity-100" />
        <div className="grid-line h-line bottom-16 md:bottom-20 left-0 opacity-100" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
