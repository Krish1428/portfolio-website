import React from 'react';
import { CERTIFICATIONS_DATA } from '../data';
import { Award, CheckCircle, ExternalLink, ShieldAlert } from 'lucide-react';

export const CertificationsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="certifications-grid-inner">
      {CERTIFICATIONS_DATA.map((cert) => {
        return (
          <div
            key={cert.id}
            className="glassmorphism p-5 rounded-lg border border-neutral-800/80 hover:border-neon-green/30 hover:shadow-green-glow transition duration-300 relative group flex flex-col justify-between"
          >
            {/* Corner Bracket Deco */}
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-neon-green opacity-30 group-hover:opacity-100 transition-opacity"></div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded bg-neon-green/5 border border-neon-green/10 text-neon-green group-hover:bg-neon-green/15 transition-all">
                  <Award className="h-4 w-4" />
                </div>
                <h4 className="font-mono text-[11px] uppercase tracking-wider font-bold text-gray-400">
                  {cert.issuer}
                </h4>
              </div>

              <h5 className="font-sans font-bold text-sm text-white group-hover:text-neon-green transition-colors leading-snug">
                {cert.name}
              </h5>

              {cert.credentialId && (
                <div className="mt-3.5 font-mono text-[9px] text-gray-500 bg-cyber-black p-2 rounded border border-neutral-900/60 flex items-center justify-between select-all">
                  <span>ID: {cert.credentialId}</span>
                  <CheckCircle className="h-3 w-3 text-neon-green" />
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-between">
              <span className="font-mono text-[10px] text-gray-500">ACQUIRED: {cert.date}</span>
              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="font-mono text-[10px] text-neon-green hover:text-white flex items-center gap-1 transition"
                  id={`cert-verify-${cert.id}`}
                >
                  VERIFY <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
