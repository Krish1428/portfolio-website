import React, { useState } from 'react';
import {
  Linkedin,
  MessageCircle,
  Mail,
  Facebook,
  Video,
  FileText,
  ArrowUpRight,
  Shield,
  Lock,
  Cpu,
  Terminal,
  Activity,
  CheckCircle,
  Clock
} from 'lucide-react';
import { USER_BIO } from '../data';

interface Channel {
  id: string;
  name: string;
  codename: string;
  iconName: 'linkedin' | 'whatsapp' | 'gmail' | 'facebook' | 'tiktok' | 'cv';
  url: string;
  status: 'ACTIVE' | 'ENCRYPTED' | 'STANDBY';
  latency: string;
  description: string;
  techLabel: string;
}

export const IdentityChannels: React.FC = () => {
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const [logSteps, setLogSteps] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const channels: Channel[] = [
    {
      id: 'ch-linkedin',
      name: 'LinkedIn Direct Link',
      codename: 'SEC-RECON-LINKEDIN',
      iconName: 'linkedin',
      url: USER_BIO.socials.linkedin || 'https://linkedin.com/in/krishnabk-security',
      status: 'ACTIVE',
      latency: '24ms',
      description: 'Professional networking node. Connect here for corporate engagement, incident response auditing collaborations, and security contract requests.',
      techLabel: 'TLS_1.3 // HANDSHAKE_GRANTED',
    },
    {
      id: 'ch-whatsapp',
      name: 'WhatsApp Secure Relay',
      codename: 'SEC-PHONE-WHATSAPP',
      iconName: 'whatsapp',
      url: 'https://wa.me/9779813583274', // Real user number prefix or custom contact gateway
      status: 'ACTIVE',
      latency: '15ms',
      description: 'End-to-end encrypted direct chat socket. Deploy an active session for rapid security escalation or high-priority triage discussions.',
      techLabel: 'NO_LOGS // SESSION_EPHEMERAL',
    },
    {
      id: 'ch-gmail',
      name: 'Gmail Secure Inbox',
      codename: 'SEC-SMTP-GMAIL',
      iconName: 'gmail',
      url: `mailto:${USER_BIO.socials.email || 'kk2836559@gmail.com'}`,
      status: 'ACTIVE',
      latency: '45ms',
      description: 'Direct transaction mailbox. Send raw cryptographic keys, vulnerability reports, or detailed contract proposals safely.',
      techLabel: 'GPG_SIGNED // TTL_INFINITY',
    },
    {
      id: 'ch-facebook',
      name: 'Facebook Identity Portal',
      codename: 'SEC-SOCIAL-FACEBOOK',
      iconName: 'facebook',
      url: 'https://facebook.com/kk2836559',
      status: 'STANDBY',
      latency: '32ms',
      description: 'Social verification ledger. Operational channel utilized for persistent community feedback, technical updates, and non-sensitive dispatches.',
      techLabel: 'SSL_OFFERED // COMPLIANCE_OK',
    },
    {
      id: 'ch-tiktok',
      name: 'TikTok Video Dispatch',
      codename: 'SEC-MEDIA-TIKTOK',
      iconName: 'tiktok',
      url: 'https://tiktok.com/@kk2836559',
      status: 'STANDBY',
      latency: '58ms',
      description: 'Creative threat demonstrations channel. Highlights cyber research overviews, walkthrough summaries, and practical cyber tips in visual formats.',
      techLabel: 'CDN_GEOLOCATION_ROUTED',
    },
    {
      id: 'ch-cv',
      name: 'Secure CV / Resume Profile',
      codename: 'SEC-PAYLOAD-CV.PDF',
      iconName: 'cv',
      url: 'https://raw.githubusercontent.com/kk2836559/portfolio/main/resume_krishnabk_sec.pdf',
      status: 'ENCRYPTED',
      latency: '8ms',
      description: 'Full verified professional biography, security audit checklists, and corporate contribution highlights. Compiled to single high-fidelity container.',
      techLabel: 'SHA256_VERIFIED // DISPOSITION_ATTACH',
    },
  ];

  const triggerChannelTrace = (channel: Channel) => {
    if (isProcessing) return;
    setActiveChannelId(channel.id);
    setIsProcessing(true);
    setLogSteps([]);

    const traces = [
      `[*] INITIALIZING CODES: Initiating secure outbound trace to ${channel.codename}...`,
      `[*] SECURITY PROTOCOL: Enforcing ephemeral AES-256 key exchange...`,
      `[+] TLS TUNNEL: Established SSL/TLS session with latency: ${channel.latency}.`,
      `[+] INTEGRITY ATTEST: Remote certificate verified by root local authority.`,
      channel.id === 'ch-cv'
        ? `[*] CV COMPILER: Decrypting SHA256-verified resume payload container...`
        : `[*] REDIRECT GATE: Injecting payload request headers for remote routing...`,
      `[+] SUCCESS: Connection dispatch authenticated. Dispatching client request...`
    ];

    traces.forEach((step, index) => {
      setTimeout(() => {
        setLogSteps(prev => [...prev, step]);
        if (index === traces.length - 1) {
          setTimeout(() => {
            setIsProcessing(false);
            if (channel.id === 'ch-cv') {
              // CV compile and download action
              const dummyLink = document.createElement('a');
              dummyLink.href = channel.url;
              dummyLink.target = '_blank';
              dummyLink.referrerPolicy = 'no-referrer';
              dummyLink.setAttribute('download', 'CV_Krishna_BK_Sec.pdf');
              document.body.appendChild(dummyLink);
              dummyLink.click();
              document.body.removeChild(dummyLink);
            } else {
              window.open(channel.url, '_blank', 'noreferrer,noopener');
            }
          }, 800);
        }
      }, (index + 1) * 350);
    });
  };

  const renderIcon = (name: string) => {
    const cls = "h-6 w-6 text-neon-green group-hover:text-white transition-colors duration-300";
    switch (name) {
      case 'linkedin':
        return <Linkedin className={cls} id="icon-linkedin-channel" />;
      case 'whatsapp':
        return <MessageCircle className={cls} id="icon-whatsapp-channel" />;
      case 'gmail':
        return <Mail className={cls} id="icon-gmail-channel" />;
      case 'facebook':
        return <Facebook className={cls} id="icon-facebook-channel" />;
      case 'tiktok':
        return <Video className={cls} id="icon-tiktok-channel" />;
      case 'cv':
        return <FileText className="h-6 w-6 text-neon-cyan group-hover:text-white transition-colors duration-300" id="icon-cv-channel" />;
      default:
        return <Cpu className={cls} />;
    }
  };

  return (
    <div className="space-y-8" id="secure-identity-channels-section">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((ch) => {
          const isSelected = activeChannelId === ch.id;
          return (
            <div
              key={ch.id}
              onClick={() => triggerChannelTrace(ch)}
              className={`glassmorphism-cyber p-5 rounded-lg border cursor-pointer hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                isSelected 
                  ? 'border-neon-green shadow-[0_0_15px_rgba(0,255,65,0.25)]' 
                  : 'border-neutral-800/80 hover:border-neon-cyan/50'
              }`}
              id={`card-${ch.id}`}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-bl from-neon-green to-transparent opacity-60"></div>
              
              <div className="space-y-4">
                {/* Header status bar */}
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span className="bg-neutral-950/80 p-1 px-2 rounded border border-neutral-800 text-[9px] text-gray-400">
                    {ch.codename}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      ch.status === 'ACTIVE' 
                        ? 'bg-neon-green animate-pulse' 
                        : ch.status === 'ENCRYPTED' 
                        ? 'bg-neon-cyan' 
                        : 'bg-yellow-500'
                    }`} />
                    <span className={`${
                      ch.status === 'ACTIVE' 
                        ? 'text-neon-green' 
                        : ch.status === 'ENCRYPTED' 
                        ? 'text-neon-cyan' 
                        : 'text-yellow-500 font-medium'
                    }`}>
                      {ch.status}
                    </span>
                  </div>
                </div>

                {/* Core title row */}
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg bg-neutral-950 border ${
                    ch.id === 'ch-cv' ? 'border-neon-cyan/20' : 'border-neon-green/20'
                  } group-hover:bg-neon-green/10 transition-all duration-300`}>
                    {renderIcon(ch.iconName)}
                  </div>
                  <div>
                    <h4 className="font-sans font-extrabold text-sm text-white group-hover:text-neon-green transition-colors leading-tight">
                      {ch.name}
                    </h4>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block mt-0.5">
                      {ch.techLabel}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-sans text-xs text-gray-400 leading-relaxed min-h-[48px]">
                  {ch.description}
                </p>
              </div>

              {/* Footer trace parameters / actions */}
              <div className="mt-5 pt-3.5 border-t border-neutral-900 flex items-center justify-between font-mono text-[10px]">
                <div className="flex items-center gap-3 text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {ch.latency}
                  </span>
                  <span>SSL_SECURE</span>
                </div>

                <div className={`flex items-center gap-1 ${
                  ch.id === 'ch-cv' ? 'text-neon-cyan group-hover:underline' : 'text-neon-green group-hover:underline'
                } font-bold`}>
                  {ch.id === 'ch-cv' ? 'DOWNLOAD' : 'CONNECT'} <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal log trace monitor output */}
      {activeChannelId && (
        <div 
          className="glassmorphism p-5 rounded-lg border border-neutral-800 font-mono text-xs text-neon-green relative overflow-hidden backdrop-blur-md shadow-inner animate-fadeIn" 
          id="trace-tunnel-monitor"
        >
          {/* Decorative scanner line */}
          <div className="absolute top-0 right-0 p-3 flex items-center gap-1.5 text-[9px] text-gray-500">
            <Activity className="h-3 w-3 animate-pulse text-neon-green" /> LIVE TRACE COMPILATION MONITOR
          </div>

          <div className="flex items-center gap-2 text-white font-bold mb-3 border-b border-neutral-800 pb-2">
            <Terminal className="h-4 w-4 text-neon-green" /> 
            <span>SECURE SEC_SHELL LOGS // VERIFICATION LOOP</span>
          </div>

          <div className="space-y-1.5 leading-relaxed text-[11px] font-mono">
            {logSteps.map((log, i) => (
              <div key={i} className={`${
                log.startsWith('[+') 
                  ? 'text-neon-green font-bold' 
                  : log.startsWith('[-') 
                  ? 'text-neon-red' 
                  : 'text-gray-400'
              }`}>
                {log}
              </div>
            ))}
            {isProcessing && (
              <div className="flex items-center gap-1.5 pl-3 mt-1 text-neon-cyan">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping"></span>
                <span className="animate-pulse">Awaiting final gateway socket acknowledgement...</span>
              </div>
            )}
            {!isProcessing && logSteps.length > 0 && (
              <div className="text-white mt-1.5 pt-2 border-t border-neutral-900 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-neon-green" />
                <span>Payload routing processed. Virtual tunnel completed successfully!</span>
                <button 
                  onClick={() => setActiveChannelId(null)} 
                  className="ml-auto text-gray-500 hover:text-white border border-neutral-800 px-2 py-0.5 rounded text-[9px] cursor-pointer bg-neutral-950 hover:bg-neutral-900 transition"
                >
                  DISMISS LOGS
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
