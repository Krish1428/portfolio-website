import React, { useState, useEffect } from 'react';
import { ShieldAlert, Menu, X, Terminal, Radio, ShieldCheck } from 'lucide-react';

interface CyberNavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const CyberNavbar: React.FC<CyberNavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'about' },
    { label: 'SKILLS', id: 'skills' },
    { label: 'PROJECTS', id: 'projects' },
    { label: 'EXPERIENCE', id: 'experience' },
    { label: 'CERTIFICATIONS', id: 'certifications' },
    { label: 'BLOG', id: 'blog' },
    { label: 'GATES', id: 'channels' },
    { label: 'CONTACT', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      
      // Determine active section based on proximity
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 85,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        scrolled
          ? 'bg-cyber-black/85 backdrop-blur-md border-b border-neon-green/20 py-3 shadow-md'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
      id="cyber-app-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Name */}
          <div
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <ShieldCheck className="h-6 w-6 text-neon-green group-hover:rotate-12 transition-transform duration-300 filter drop-shadow-[0_0_8px_rgba(0,255,90,0.5)]" />
              <Radio className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 text-neon-cyan animate-ping" />
            </div>
            <div>
              <span className="text-white font-extrabold tracking-widest text-sm uppercase">
                KBK<span className="text-neon-green">.Sec</span>
              </span>
              <span className="text-[9px] text-neon-cyan font-semibold block uppercase tracking-tighter">
                PORT METRICS DECK
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-xs font-bold tracking-wider px-3 py-1.5 rounded transition relative cursor-pointer ${
                    activeSection === link.id
                      ? 'text-neon-green bg-neon-green/5 border border-neon-green/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                  id={`nav-link-${link.id}`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-neon-green opacity-80 rounded" />
                  )}
                </button>
              ))}
            </div>

            {/* Tunnel Status */}
            <div className="flex items-center gap-2 bg-cyber-dark px-3 py-1.5 rounded border border-neutral-800 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse"></span>
              <span className="text-gray-400">NODE STATUS:</span>
              <span className="text-neon-green font-bold">MUTEX SECURE</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center pr-1.5">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-neon-green p-1.5 rounded-md hover:bg-neutral-900 border border-neutral-800 transition"
              aria-label="Toggle Navigation"
              id="mobile-nav-toggle"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden bg-cyber-dark/95 backdrop-blur-lg border-b border-neon-green/20 py-4 px-6 animate-fadeIn">
          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left text-xs font-mono font-bold tracking-widest p-2.5 rounded transition ${
                  activeSection === link.id
                    ? 'text-neon-green bg-neon-green/10 border-l-2 border-neon-green'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                id={`mobile-nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse"></span>
                <span className="text-gray-500 uppercase">ACCESS PROTOCOL: ENFR-4</span>
              </div>
              <span className="text-neon-cyan font-bold">SECURE PORT 3000</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
