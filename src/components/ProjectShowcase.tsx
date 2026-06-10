import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data';
import { FolderGit, Filter, ChevronDown, ChevronUp, Github, ExternalLink, ShieldCheck, AlertOctagon } from 'lucide-react';

export const ProjectShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'tools' | 'research' | 'ctf' | 'blue-team'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Codebases' },
    { id: 'tools', label: 'Security Tools' },
    { id: 'research', label: 'Honeypots & Research' },
    { id: 'ctf', label: 'CTF Write-ups' },
    { id: 'blue-team', label: 'Defensive / Blue Team' },
  ];

  const filteredProjects = activeTab === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeTab);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getSeverityStyle = (severity?: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-neon-red/10 text-neon-red border-neon-red/40';
      case 'high':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/40';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/40';
      case 'low':
        return 'bg-neon-blue/10 text-neon-blue border-neon-blue/40';
      default:
        return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };

  return (
    <div className="w-full flex flex-col gap-6" id="project-showcase-container">
      {/* Filtering Navigation Row */}
      <div className="flex flex-wrap gap-2.5 items-center justify-start border-b border-neutral-800 pb-3" id="project-tabs">
        <Filter className="h-4 w-4 text-neon-green/60 hidden sm:inline-block mr-1" />
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setExpandedId(null);
            }}
            className={`text-xs font-mono font-bold px-3 py-1.5 rounded transition border cursor-pointer ${
              activeTab === tab.id
                ? 'text-neon-cyan bg-neon-cyan/5 border-neon-cyan/40'
                : 'text-gray-400 bg-transparent border-transparent hover:text-white hover:bg-white/5'
            }`}
            id={`project-tab-btn-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Project Deck Grid */}
      <div className="grid grid-cols-1 gap-4" id="project-showcase-grid">
        {filteredProjects.map((proj: Project) => {
          const isExpanded = expandedId === proj.id;
          return (
            <div
              key={proj.id}
              className={`glassmorphism rounded-lg border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'border-neon-green/45 shadow-[0_0_15px_rgba(0,255,65,0.2)]'
                  : 'border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              {/* Card Header clickable to toggle expand details */}
              <div
                onClick={() => toggleExpand(proj.id)}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 gap-4 cursor-pointer select-none"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <FolderGit className="h-4 w-4 text-neon-green flex-shrink-0" />
                    <h4 className="font-mono text-base font-bold text-white tracking-tight truncate hover:text-neon-green transition">
                      {proj.title}
                    </h4>
                    {proj.severity && (
                      <span className={`text-[9px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded border ${getSeverityStyle(proj.severity)}`}>
                        {proj.severity} severity
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-2 font-sans line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-transparent pt-3 md:pt-0 border-neutral-800">
                  <div className="flex gap-1.5 flex-wrap">
                    {proj.languages.map((lang, lIdx) => (
                      <span key={lIdx} className="text-[10px] font-mono text-neon-cyan px-2 py-0.5 rounded bg-neon-cyan/5 border border-neon-cyan/15 select-none">
                        {lang}
                      </span>
                    ))}
                  </div>
                  <button className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-neutral-900 transition">
                    {isExpanded ? <ChevronUp className="h-5 w-5 text-neon-green" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Collapsible details pane */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-neutral-900 bg-cyber-black/40 font-mono text-xs leading-relaxed space-y-4 animate-slideDown">
                  <div>
                    <h5 className="text-neon-green font-bold uppercase tracking-wider mb-1">Architecture Summary</h5>
                    <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                      {proj.longDescription || proj.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 bg-cyber-black/70 p-3.5 rounded border border-neutral-800">
                    <div>
                      <div className="flex items-center gap-1.5 text-neon-red font-bold mb-1 uppercase">
                        <AlertOctagon className="h-3.5 w-3.5" />
                        <span>Security Auditing Metric / Impact</span>
                      </div>
                      <p className="text-gray-300 text-[11px] font-sans">
                        {proj.impact || "Evaluated code flows for standard network intrusion vectors and authorization vulnerabilities."}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-neon-green font-bold mb-1 uppercase">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Remediation Directive</span>
                      </div>
                      <p className="text-gray-300 text-[11px] font-sans">
                        {proj.remediation || "Isolate development servers and compile web endpoints using secure parameterized bindings."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80">
                    <span className="text-[10px] text-gray-500">AUDIT DATE: {proj.date}</span>
                    <div className="flex items-center gap-3">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center gap-1.5 text-gray-400 hover:text-neon-green transition"
                          id={`proj-github-link-${proj.id}`}
                        >
                          <Github className="h-4 w-4" /> CODEBASE
                        </a>
                      )}
                      {proj.demoUrl && (
                        <a
                          href={proj.demoUrl}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center gap-1.5 text-neon-cyan hover:text-white transition"
                          id={`proj-demo-link-${proj.id}`}
                        >
                          LIVE DEMO <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
