import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS_DATA } from '../data';
import { Terminal, Shield, BookOpen, Clock, X, TerminalSquare, AlertTriangle, CheckSquare } from 'lucide-react';

export const BlogAdvisories: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const getSeverityColor = (sev?: string) => {
    switch (sev) {
      case 'critical':
        return 'text-neon-red bg-neon-red/5 border-neon-red/30';
      case 'warning':
        return 'text-amber-400 bg-amber-400/5 border-amber-400/20';
      default:
        return 'text-neon-cyan bg-neon-cyan/5 border-neon-cyan/20';
    }
  };

  return (
    <div className="w-full" id="blog-advisories-section">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BLOG_POSTS_DATA.map((post) => {
          return (
            <div
              key={post.id}
              className="glassmorphism p-5 rounded-lg border border-neutral-800/85 hover:border-neon-cyan/30 flex flex-col justify-between group cursor-pointer transition duration-300"
              onClick={() => setSelectedPost(post)}
              id={`blog-card-${post.id}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-[10px] font-mono">
                  <span className={`px-2 py-0.5 rounded border uppercase text-[9px] font-bold ${getSeverityColor(post.severity)}`}>
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h4 className="font-sans font-bold text-base text-white group-hover:text-neon-cyan transition-colors leading-snug mb-2">
                  {post.title}
                </h4>

                <p className="font-sans text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-900 flex items-center justify-between text-xs font-mono">
                <span className="text-gray-500">{post.date}</span>
                <span className="text-neon-cyan group-hover:underline flex items-center gap-1">
                  READ REPORT <BookOpen className="h-3 w-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-black/85 backdrop-blur-md animate-fadeIn" id="blog-report-modal">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glassmorphism-cyber rounded-lg border border-neon-cyan/40 p-6 md:p-8 flex flex-col justify-between font-mono">
            {/* Corner decorator */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-neon-cyan"></div>
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-neon-cyan/20 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Terminal className="h-4 w-4 text-neon-cyan animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-neon-cyan font-bold">THREAT AUDIT DOSSIER // PORT 443</span>
                </div>
                <h3 className="font-sans font-extrabold text-xl text-white tracking-tight leading-snug">
                  {selectedPost.title}
                </h3>
                <div className="flex items-center gap-4 mt-2.5 text-[10px] text-gray-400">
                  <span>DISCLOSED: {selectedPost.date}</span>
                  <span>|</span>
                  <span>READ: {selectedPost.readTime}</span>
                  <span>|</span>
                  <span className="text-neon-cyan text-[11px] font-bold uppercase">[{selectedPost.category}]</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-neon-red hover:bg-neon-red/10 border border-neutral-800 hover:border-neon-red/30 p-1.5 rounded transition cursor-pointer"
                id="close-blog-modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Modal content body */}
            <div className="flex-1 text-sm font-sans text-gray-300 space-y-4 leading-relaxed pr-2 h-[45vh] overflow-y-auto">
              <div className="border-l-2 border-neon-cyan/40 pl-3.5 italic text-xs mb-4 text-gray-400">
                {selectedPost.excerpt}
              </div>
              
              {/* Process standard post contents safely without dependencies */}
              <div className="space-y-4 text-xs md:text-sm">
                {selectedPost.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h4 key={pIdx} className="font-mono text-base font-bold text-white uppercase tracking-wide border-b border-neutral-800 pb-1 mt-6 text-glow">
                        {paragraph.replace('###', '').trim()}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('####')) {
                    return (
                      <h5 key={pIdx} className="font-mono text-sm font-bold text-neon-cyan mt-4">
                        {paragraph.replace('####', '').trim()}
                      </h5>
                    );
                  }
                  if (paragraph.startsWith('`') || paragraph.includes('```')) {
                    // Extract code block simply
                    const lines = paragraph.replace(/```[a-z]*/g, '').replace(/```/g, '').trim();
                    return (
                      <pre key={pIdx} className="p-4 bg-cyber-black rounded border border-neutral-800 font-mono text-xs text-neon-green overflow-x-auto leading-relaxed max-w-full">
                        <code>{lines}</code>
                      </pre>
                    );
                  }
                  if (paragraph.startsWith('*') || paragraph.startsWith('-')) {
                    // List rendering helper
                    return (
                      <ul key={pIdx} className="list-disc pl-5 space-y-2 mt-2 font-mono text-xs text-gray-300">
                        {paragraph.split('\n').map((item, iIdx) => (
                          <li key={iIdx}>{item.replace(/^[\s*-]+/, '').trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.startsWith('|')) {
                    // Simplified Table viewer
                    const rows = paragraph.split('\n').filter(r => r.trim().startsWith('|'));
                    return (
                      <div key={pIdx} className="overflow-x-auto bg-cyber-black/80 rounded border border-neutral-800/80 p-3 mt-4">
                        <table className="w-full text-left font-mono text-[11px] border-collapse leading-relaxed">
                          <tbody>
                            {rows.map((row, rIdx) => {
                              const cols = row.split('|').map(c => c.trim()).filter((_, colIdx) => colIdx > 0 && colIdx < row.split('|').length - 1);
                              if (rIdx === 1) return null; // skip dividing format row
                              return (
                                <tr key={rIdx} className={rIdx === 0 ? "border-b border-neutral-700/80 font-bold text-neon-cyan" : "border-b border-neutral-800/30 hover:bg-neutral-900/40"}>
                                  {cols.map((col, cIdx) => (
                                    <td key={cIdx} className="p-2 align-top">{col}</td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  return (
                    <p key={pIdx} className="font-sans leading-relaxed text-gray-300">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Modal foot actions */}
            <div className="mt-6 pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-neon-green text-[10px]">
                <Shield className="h-3.5 w-3.5" />
                <span>INTEGRITY VERIFIED // KBK-SIGNATURE DISCLOSED</span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="w-full sm:w-auto px-4 py-2 bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 rounded font-semibold transition cursor-pointer"
                id="close-blog-footer"
              >
                DISMISS BRIEFING
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
