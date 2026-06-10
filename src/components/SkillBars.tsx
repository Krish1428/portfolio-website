import React, { useState } from 'react';
import { SKILLS_DATA } from '../data';
import { Skill } from '../types';
import { Shield, Crosshair, Wrench, Code, Layers } from 'lucide-react';

export const SkillBars: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'offensive' | 'defensive' | 'tools' | 'languages'>('all');

  const categories = [
    { id: 'all', name: 'ALL LOGS', icon: Layers },
    { id: 'offensive', name: 'OFFENSIVE', icon: Crosshair },
    { id: 'defensive', name: 'DEFENSIVE', icon: Shield },
    { id: 'tools', name: 'TOOLS & SEC', icon: Wrench },
    { id: 'languages', name: 'LANGUAGES', icon: Code },
  ];

  const filteredSkills = activeCategory === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(skill => skill.category === activeCategory);

  return (
    <div className="w-full flex flex-col gap-6" id="skills-bars-container">
      {/* Tab Selectors */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold rounded border transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'text-neon-green bg-neon-green/5 border-neon-green/40'
                  : 'text-gray-400 bg-transparent border-neutral-800 hover:text-white hover:bg-white/5'
              }`}
              id={`skill-filter-btn-${cat.id}`}
            >
              <Icon className="h-3.5 w-3.5" />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8 font-mono">
        {filteredSkills.map((skill: Skill, idx: number) => {
          return (
            <div key={idx} className="flex flex-col gap-1.5 group">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-200 group-hover:text-neon-green transition-colors">
                  {skill.name}
                </span>
                <span className="font-semibold text-neon-cyan select-none">{skill.level}%</span>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="w-full h-2.5 bg-cyber-black rounded overflow-hidden border border-neutral-800 relative">
                <div
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-green rounded-r transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(0,255,65,0.45)]"
                  style={{ width: `${skill.level}%` }}
                />
                
                {/* Visual ticks */}
                <div className="absolute inset-0 flex justify-between pointer-events-none opacity-40">
                  <span className="w-[1px] h-full bg-neutral-800"></span>
                  <span className="w-[1px] h-full bg-neutral-800"></span>
                  <span className="w-[1px] h-full bg-neutral-800"></span>
                  <span className="w-[1px] h-full bg-neutral-800"></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
