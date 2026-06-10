import React from 'react';

export const CyberAvatar: React.FC = () => {
  return (
    <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto flex items-center justify-center select-none" id="cyber-interactive-avatar">
      {/* Outer Radar Target Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-neon-green/30 animate-spin" style={{ animationDuration: '24s' }}></div>
      
      {/* Hexagon tech Ring */}
      <div className="absolute inset-2 rounded-full border border-neon-cyan/20 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>

      {/* Crosshairs & Target Scopes */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neon-green"></div>
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neon-green"></div>
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neon-green"></div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neon-green"></div>

      {/* Sweep Scanner line */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-neon-green/5 to-transparent origin-center animate-spin" style={{ animationDuration: '4s' }}></div>

      {/* Cybernetic Grid Emblem */}
      <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-cyber-black flex flex-col items-center justify-center border border-neon-green/40 relative overflow-hidden glassmorphism-cyber group">
        <div className="absolute inset-0 opacity-15 cyber-grid"></div>
        
        {/* Abstract secure bio code avatar */}
        <svg className="w-20 h-20 text-neon-green/80 group-hover:text-neon-green transition-colors duration-300 filter drop-shadow-[0_0_8px_rgba(0,255,65,0.35)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>

        <div className="mt-2 text-center relative z-10 font-mono">
          <span className="text-white text-xs font-bold tracking-widest block uppercase text-glow">KRISHNA B.K.</span>
          <span className="text-neon-cyan text-[9px] block tracking-tighter uppercase mt-0.5 animate-pulse">0xFA28 // ADMIN</span>
        </div>

        {/* Security Scan line moving up and down */}
        <div className="absolute left-0 right-0 h-0.5 bg-neon-green/40 shadow-[0_0_10px_rgba(0,255,65,0.85)] animate-bounce" style={{ animationDuration: '3s' }}></div>
      </div>

      {/* Mini telemetry readouts floating next to avatar */}
      <div className="absolute -left-12 top-10 font-mono text-[9px] text-neon-cyan/70 space-y-1">
        <div>SYS_LOC: NP_KTM</div>
        <div>IP_GATE: 19.3.2</div>
      </div>
      <div className="absolute -right-12 bottom-10 font-mono text-[9px] text-neon-green/70 space-y-1 text-right">
        <div>PORT: 3000</div>
        <div>THREAT: ZERO</div>
      </div>
    </div>
  );
};
