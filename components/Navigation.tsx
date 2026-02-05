'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Ghost, Book, Disc, User, Menu, X } from 'lucide-react';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  const NavItem = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => {
        router.push(href);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        isActive(href)
          ? 'bg-cosmic-gold text-black shadow-glow font-bold'
          : 'text-gray-400 hover:text-white hover:bg-white/10'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => router.push('/')}
          >
            <div className="relative">
              <Disc className="w-8 h-8 text-cosmic-gold animate-spin-slow group-hover:shadow-glow rounded-full transition" />
              <div className="absolute inset-0 bg-cosmic-purple blur opacity-40 group-hover:opacity-70 transition"></div>
            </div>
            <span className="font-serif text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cosmic-gold">
              THE COSMIC WEAVER
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <NavItem href="/" icon={<Disc className="w-4 h-4"/>} label="หน้าหลัก" />
            <NavItem href="/tarot" icon={<Ghost className="w-4 h-4"/>} label="ดูดวงไพ่" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 absolute w-full pb-4 px-4 flex flex-col gap-2 shadow-2xl">
          <NavItem href="/" icon={<Disc className="w-4 h-4"/>} label="หน้าหลัก" />
          <NavItem href="/tarot" icon={<Ghost className="w-4 h-4"/>} label="ดูดวงไพ่" />
        </div>
      )}
    </nav>
  );
}
