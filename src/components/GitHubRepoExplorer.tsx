import React, { useState, useEffect } from 'react';
import { Github, Search, RefreshCw, Star, Shield, Lock, Terminal, ExternalLink } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  created_at: string;
  updated_at: string;
}

export const GitHubRepoExplorer: React.FC = () => {
  const [username, setUsername] = useState('kk2836559');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedCount, setScannedCount] = useState(0);

  const fetchUserRepos = async (userToFetch: string) => {
    if (!userToFetch.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/users/${userToFetch}/repos?sort=updated&per_page=6`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Profile "${userToFetch}" not found on GitHub.`);
        } else if (response.status === 403) {
          throw new Error("GitHub telemetry rate limit surpassed. Showing simulator mode.");
        } else {
          throw new Error("API Connection compromised.");
        }
      }
      const data: GitHubRepo[] = await response.json();
      setRepos(data);
      setScannedCount(data.length);
    } catch (err: any) {
      setError(err.message || 'Unknown network error');
      // Fallback: load standard simulated repo structures so page never breaks
      loadSimulatedRepos();
    } finally {
      setLoading(false);
    }
  };

  const loadSimulatedRepos = () => {
    const mockRepos: GitHubRepo[] = [
      {
        id: 11,
        name: 'aegis-sentinel',
        description: 'Passive subdomain and active asset threat scraping orchestrator.',
        html_url: 'https://github.com/kk2836559/aegis-sentinel',
        stargazers_count: 124,
        forks_count: 32,
        language: 'Python',
        created_at: '2024-05-10',
        updated_at: '2025-06-02'
      },
      {
        id: 22,
        name: 'vuln-honeypot',
        description: 'Docker-composed interactive Honeypot logging malicious payload telemetry.',
        html_url: 'https://github.com/kk2836559/vuln-honeypot',
        stargazers_count: 87,
        forks_count: 18,
        language: 'TypeScript',
        created_at: '2024-11-20',
        updated_at: '2025-05-18'
      },
      {
        id: 33,
        name: 'ironwall-zero-trust',
        description: 'Tailscale node-proxy with custom auth wrapper rules.',
        html_url: 'https://github.com/kk2836559/ironwall',
        stargazers_count: 145,
        forks_count: 41,
        language: 'Rust',
        created_at: '2024-02-15',
        updated_at: '2025-04-10'
      }
    ];
    setRepos(mockRepos);
    setScannedCount(mockRepos.length);
  };

  useEffect(() => {
    fetchUserRepos(username);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserRepos(username);
  };

  return (
    <div className="w-full glassmorphism mt-6 p-6 rounded-lg neon-border-cyan group" id="github-explorer-section">
      {/* Grid Headers */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neon-cyan/20 pb-4">
        <div>
          <div className="flex items-center gap-2 text-neon-cyan mb-1">
            <Github className="h-5 w-5 animate-pulse" />
            <h3 className="text-lg font-mono font-bold uppercase tracking-wider">GitHub API Port Mapping</h3>
          </div>
          <p className="text-xs text-gray-400">
            Live querying repository statuses from GitHub Core API servers.
          </p>
        </div>

        {/* Dynamic Search Box */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neon-cyan/50" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-cyber-black text-xs font-mono text-neon-cyan rounded border border-neon-cyan/30 focus:border-neon-cyan outline-none transition"
              placeholder="Query GitHub Handle..."
              id="github-search-input"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-1.5 bg-neon-cyan/10 hover:bg-neon-cyan/25 text-neon-cyan text-xs font-mono border border-neon-cyan/30 rounded flex items-center gap-1.5 transition cursor-pointer"
            id="github-search-btn"
          >
            {loading ? <RefreshCw className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
            SYNC
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-neon-red/10 border border-neon-red/40 px-3 py-2 rounded text-xs text-neon-red font-mono mt-4 flex items-center gap-2">
          <Lock className="h-3.5 w-3.5" />
          <span>Notice: {error} Loading local security profiles instead.</span>
        </div>
      )}

      {/* Grid List representation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="flex flex-col justify-between p-4 bg-cyber-black/70 rounded border border-neon-cyan/10 hover:border-neon-cyan/40 hover:shadow-cyan-glow transition duration-300 relative overflow-hidden group/card"
          >
            {/* Corner Cyber Accent */}
            <div className="absolute top-0 right-0 w-2 h-2 bg-neon-cyan opacity-40 group-hover/card:opacity-100 transition-opacity"></div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest font-mono text-neon-cyan px-1.5 py-0.5 rounded bg-neon-cyan/10">
                  {repo.language || 'Documentation'}
                </span>
                <span className="text-[10px] font-mono text-gray-500">ID: {repo.id % 1000}</span>
              </div>
              
              <h4 className="font-mono text-sm font-bold text-white group-hover/card:text-neon-cyan transition truncate mb-2">
                {repo.name}
              </h4>
              
              <p className="text-xs text-gray-400 line-clamp-2 h-8 leading-snug mb-4">
                {repo.description || 'Dedicated security code repository containing diagnostic scripting interfaces.'}
              </p>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-800/60 font-mono text-xs">
              <div className="flex items-center gap-3 text-gray-500">
                <span className="flex items-center gap-1 hover:text-neon-cyan transition">
                  <Star className="h-3 w-3 text-amber-400" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <Terminal className="h-3 w-3 text-neon-green" />
                  {repo.forks_count > 0 ? repo.forks_count : 0}
                </span>
              </div>
              
              <a
                href={repo.html_url}
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-neon-cyan/80 hover:text-white flex items-center gap-1 transition"
                id={`repo-link-${repo.id}`}
              >
                DEPLOY <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
