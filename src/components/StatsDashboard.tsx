import React, { useState, useEffect, useRef } from 'react';
import { Shield, Award, Radio, Server, Activity, Cpu, Clock, Terminal, Wifi, WifiOff } from 'lucide-react';
import { USER_BIO } from '../data';

interface TelemetryLog {
  timestamp: string;
  type: 'info' | 'success' | 'warn' | 'system';
  message: string;
}

interface LiveMetrics {
  uptime: number;
  memoryUsage: string;
  memoryPercentage: number;
  cpuModel: string;
  cpuUsage: string;
  activeSessions: number;
  totalRequests: number;
  recentLogs: TelemetryLog[];
}

export const StatsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<LiveMetrics | null>(null);
  const [connection, setConnection] = useState<'connecting' | 'online' | 'offline'>('connecting');
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setConnection('connecting');
    
    // In production/Railway, it will fetch from the same origin.
    // In development (Vite), it will be proxied or connect directly to local port 3001.
    const eventSource = new EventSource('/api/metrics/live');

    eventSource.onopen = () => {
      setConnection('online');
    };

    eventSource.onmessage = (event) => {
      try {
        const data: LiveMetrics = JSON.parse(event.data);
        setMetrics(data);
      } catch (err) {
        console.error('Failed to parse SSE metrics data:', err);
      }
    };

    eventSource.onerror = () => {
      setConnection('offline');
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Auto scroll live log tail
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [metrics?.recentLogs]);

  // Format server uptime into readable string
  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const statItems = [
    {
      label: 'Systems Audited',
      value: USER_BIO.stats.systemsAudited,
      icon: Server,
      color: 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/5',
      desc: 'External/Internal endpoints mapped'
    },
    {
      label: 'Vulns Remediated',
      value: USER_BIO.stats.vulnsMitigated,
      icon: Shield,
      color: 'text-neon-green border-neon-green/30 bg-neon-green/5',
      desc: 'OWASP critical & high mitigations'
    },
    {
      label: 'CTF Standing',
      value: USER_BIO.stats.ctfRank,
      icon: Award,
      color: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
      desc: 'HackTheBox & TryHackMe ranking'
    },
    {
      label: 'Cyber Advisories',
      value: USER_BIO.stats.advisoriesPublished,
      icon: Radio,
      color: 'text-neon-red border-neon-red/30 bg-neon-red/5',
      desc: 'CVE & open-source disclosures'
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full" id="cyber-stats-dashboard">
      {/* 1. Milestones Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex flex-col justify-between p-4 rounded border ${item.color} glassmorphism hover:scale-[1.02] transform transition-transform duration-300 relative overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-5 pointer-events-none cyber-grid"></div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-mono font-bold text-gray-400 select-none">
                  {item.label}
                </span>
                <Icon className="h-5 w-5 opacity-80 animate-pulse-slow" />
              </div>

              <div className="mt-2">
                <span className="text-2xl md:text-3xl font-mono font-extrabold tracking-tight text-white block animate-glow">
                  {item.value}
                </span>
                <span className="text-[10px] text-gray-500 font-mono mt-0.5 block truncate">
                  {item.desc}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/10 animate-pulse"></div>
            </div>
          );
        })}
      </div>

      {/* 2. Real-Time Server Telemetry Console */}
      <div className="glassmorphism p-5 rounded-lg border border-neutral-800/80 relative" id="live-telemetry-console">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-green"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-green"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-green"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-green"></div>

        {/* Console Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-neutral-800 pb-3 mb-4 gap-2">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-neon-green animate-pulse" />
            <h4 className="font-mono text-xs font-bold text-neon-green uppercase tracking-wider">
              Live Security Server Telemetry (Railway Node)
            </h4>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Status indicator */}
            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              {connection === 'online' ? (
                <>
                  <Wifi className="h-3.5 w-3.5 text-neon-green" />
                  <span className="text-neon-green uppercase font-bold">SECURE_LINK: ACTIVE</span>
                </>
              ) : connection === 'connecting' ? (
                <>
                  <Activity className="h-3.5 w-3.5 text-neon-cyan animate-spin" />
                  <span className="text-neon-cyan uppercase font-bold">SSL_GATING: HANDSHAKING</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3.5 w-3.5 text-neon-red" />
                  <span className="text-neon-red uppercase font-bold">SECURE_LINK: DOWN</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Telemetry Stats Rows */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 font-mono text-xs select-none">
          <div className="bg-cyber-black/80 p-3 rounded border border-neutral-900 flex items-center gap-3">
            <Cpu className="h-5 w-5 text-neon-cyan" />
            <div>
              <span className="text-[9px] text-gray-500 block uppercase">CPU Load</span>
              <span className="text-sm text-white font-extrabold">{metrics ? metrics.cpuUsage : '0.0%'}</span>
            </div>
          </div>

          <div className="bg-cyber-black/80 p-3 rounded border border-neutral-900 flex items-center gap-3">
            <Server className="h-5 w-5 text-neon-purple" />
            <div>
              <span className="text-[9px] text-gray-500 block uppercase">Heap Mem</span>
              <span className="text-sm text-white font-extrabold">{metrics ? metrics.memoryUsage : '0.00 MB'}</span>
            </div>
          </div>

          <div className="bg-cyber-black/80 p-3 rounded border border-neutral-900 flex items-center gap-3">
            <Clock className="h-5 w-5 text-neon-green" />
            <div>
              <span className="text-[9px] text-gray-500 block uppercase">Uptime</span>
              <span className="text-sm text-white font-extrabold">{metrics ? formatUptime(metrics.uptime) : '00:00:00'}</span>
            </div>
          </div>

          <div className="bg-cyber-black/80 p-3 rounded border border-neutral-900 flex items-center gap-3">
            <Terminal className="h-5 w-5 text-neon-red" />
            <div>
              <span className="text-[9px] text-gray-500 block uppercase">Requests / Nodes</span>
              <span className="text-sm text-white font-extrabold">
                {metrics ? `${metrics.totalRequests} / ${metrics.activeSessions}` : '0 / 0'}
              </span>
            </div>
          </div>
        </div>

        {/* Real-time console logs stream */}
        <div className="bg-cyber-black/95 rounded border border-neutral-900 p-4 h-48 flex flex-col justify-between font-mono text-[11px] leading-relaxed">
          <div className="overflow-y-auto space-y-1 pr-2 max-h-[160px] scrollbar-thin select-text">
            {metrics?.recentLogs && metrics.recentLogs.length > 0 ? (
              metrics.recentLogs.map((log, index) => {
                let colorClass = 'text-gray-400';
                if (log.type === 'system') colorClass = 'text-purple-400 font-bold';
                else if (log.type === 'success') colorClass = 'text-neon-green font-bold';
                else if (log.type === 'warn') colorClass = 'text-neon-red font-bold';
                
                return (
                  <div key={index} className="flex gap-2.5">
                    <span className="text-gray-600 select-none">
                      [{new Date(log.timestamp).toLocaleTimeString()}]
                    </span>
                    <span className={colorClass}>{log.message}</span>
                  </div>
                );
              })
            ) : (
              <div className="text-gray-500 italic text-center py-10">
                Establishing communication gates. Listening for inbound traffic logs...
              </div>
            )}
            <div ref={logEndRef} />
          </div>

          <div className="flex items-center justify-between border-t border-neutral-900 pt-2 mt-2 text-[9px] text-gray-500 select-none">
            <span>AUDIT FRAMEWORK: COMPLIANT</span>
            <span>NODE_ID: {metrics?.cpuModel.split(' ')[0] || 'AMD/Intel'}_SEC_GW</span>
          </div>
        </div>
      </div>
    </div>
  );
};
