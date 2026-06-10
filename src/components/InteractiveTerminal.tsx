import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, Play, ChevronRight, CheckCircle, AlertTriangle, Cpu } from 'lucide-react';
import { TerminalLine } from '../types';
import { USER_BIO, SKILLS_DATA, PROJECTS_DATA, CERTIFICATIONS_DATA } from '../data';

export const InteractiveTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      text: 'SECURE ADMINISTRATIVE GATEWAY v4.19 - KRISHNA_BK_RECON_UNIT',
      type: 'system',
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      text: 'Type "help" to explore available security protocols.',
      type: 'success',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isHackingState, setIsHackingState] = useState(false);
  
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines, isHackingState]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputVal.trim().toLowerCase();
    if (!command) return;

    // Add input to display lines
    const timestamp = new Date().toLocaleTimeString();
    const newLines = [...lines, { text: `guest@krishnabk:~$ ${inputVal}`, type: 'input' as const, timestamp }];
    
    // Manage command history
    const updatedHistory = [inputVal, ...history];
    setHistory(updatedHistory);
    setHistoryIndex(-1);
    setInputVal('');

    if (isHackingState) {
      setLines([...newLines, { text: 'TERMINAL LOCKED: Threat assessment simulation in progression...', type: 'error', timestamp }]);
      return;
    }

    // Process general command
    const parts = command.split(' ');
    const baseCommand = parts[0];

    switch (baseCommand) {
      case 'help':
        setLines([
          ...newLines,
          { text: '===================================================================', type: 'system', timestamp },
          { text: 'AVAILABLE KERNEL PROTOCOLS & COMMANDS', type: 'success', timestamp },
          { text: '===================================================================', type: 'system', timestamp },
          { text: '  about          - Display Krishna BK\'s profile & objective briefing', type: 'output', timestamp },
          { text: '  skills         - List key offensive, defensive, and language skill meters', type: 'output', timestamp },
          { text: '  projects       - Reveal primary audited projects and security tools', type: 'output', timestamp },
          { text: '  certs          - Show cybersecurity certifications & IDs', type: 'output', timestamp },
          { text: '  contact        - Access verified encrypted communications index', type: 'output', timestamp },
          { text: '  whoami         - Query client connection telemetry & host data', type: 'output', timestamp },
          { text: '  hack           - Trigger simulated penetration defense test', type: 'warning', timestamp },
          { text: '  linkedin       - Open verified LinkedIn profile in trace portal', type: 'output', timestamp },
          { text: '  whatsapp       - Socket direct WhatsApp end-to-end transceiver', type: 'output', timestamp },
          { text: '  gmail          - Connect to direct SMTP security mail receiver', type: 'output', timestamp },
          { text: '  facebook       - Handshake Facebook social identity catalog', type: 'output', timestamp },
          { text: '  tiktok         - Broadcast media demonstration channel link', type: 'output', timestamp },
          { text: '  cv             - Decrypt and compile secure CV PDF payload', type: 'success', timestamp },
          { text: '  clear          - Flush console logs and reset buffer', type: 'output', timestamp },
          { text: '===================================================================', type: 'system', timestamp },
        ]);
        break;

      case 'about':
        setLines([
          ...newLines,
          { text: `[PROFILE BIOGRAPHY: ${USER_BIO.name.toUpperCase()}]`, type: 'success', timestamp },
          { text: USER_BIO.aboutIntro, type: 'output', timestamp },
          { text: '', type: 'output', timestamp },
          { text: USER_BIO.aboutDetailed, type: 'output', timestamp },
          { text: `Current Focus: Defensive Engineering, Penetration Routing, Code Audits`, type: 'system', timestamp },
        ]);
        break;

      case 'skills':
        const skillsOutputs = SKILLS_DATA.slice(0, 8).map(s => {
          const barLength = 10;
          const greenBars = Math.round(s.level / 10);
          const emptyBars = barLength - greenBars;
          const barString = '[' + '='.repeat(greenBars) + ' '.repeat(emptyBars) + ']';
          return {
            text: `  ${s.name.padEnd(28)} ${barString} ${s.level}%`,
            type: 'output' as const,
            timestamp,
          };
        });
        setLines([
          ...newLines,
          { text: '[SECURITY AUDIT METERS]', type: 'success', timestamp },
          ...skillsOutputs,
        ]);
        break;

      case 'projects':
        const projectOutputs = PROJECTS_DATA.map(p => ({
          text: `  * ${p.title.toUpperCase()} [${p.languages.join('/')}] - Stars: ${p.stars || 0}\n    -> ${p.description}`,
          type: 'output' as const,
          timestamp,
        }));
        setLines([
          ...newLines,
          { text: '[AUDITED SECURITY PROJECT CODEBASES]', type: 'success', timestamp },
          ...projectOutputs,
        ]);
        break;

      case 'certs':
        const certOutputs = CERTIFICATIONS_DATA.map(c => ({
          text: `  * ${c.name} (${c.issuer}) - Verified: ID ${c.credentialId || 'N/A'}`,
          type: 'output' as const,
          timestamp,
        }));
        setLines([
          ...newLines,
          { text: '[VERIFIED CYBERSECURITY CREDENTIALS]', type: 'success', timestamp },
          ...certOutputs,
        ]);
        break;

      case 'contact':
        setLines([
          ...newLines,
          { text: '[ENCRYPTED DISPATCH CHANNELS]', type: 'success', timestamp },
          { text: `  EMAIL    : ${USER_BIO.socials.email}`, type: 'output', timestamp },
          { text: `  GITHUB   : ${USER_BIO.socials.github}`, type: 'output', timestamp },
          { text: `  LINKEDIN : ${USER_BIO.socials.linkedin}`, type: 'output', timestamp },
          { text: `  WHATSAPP : https://wa.me/9779813583274`, type: 'output', timestamp },
          { text: `  FACEBOOK : https://facebook.com/kk2836559`, type: 'output', timestamp },
          { text: `  TIKTOK   : https://tiktok.com/@kk2836559`, type: 'output', timestamp },
          { text: 'Status: Channels open. Type direct name (e.g. "linkedin", "whatsapp") to socket route.', type: 'system', timestamp },
        ]);
        break;

      case 'linkedin':
        setLines([
          ...newLines,
          { text: '[+] ESTABLISHING LINKEDIN HANDSHAKE...', type: 'success', timestamp },
          { text: `Platform: LinkedIn Professional Network Node`, type: 'output', timestamp },
          { text: `Codename: SEC-RECON-LINKEDIN`, type: 'system', timestamp },
          { text: `Secure Tunnel: https://linkedin.com/in/krishnabk-security`, type: 'output', timestamp },
          { text: `Execution: Spawning LinkedIn channel in secure browser gate...`, type: 'success', timestamp }
        ]);
        setTimeout(() => {
          window.open('https://linkedin.com/in/krishnabk-security', '_blank', 'noreferrer,noopener');
        }, 1200);
        break;

      case 'whatsapp':
        setLines([
          ...newLines,
          { text: '[+] DISPATCHING WHATSAPP SECURE SOCKET...', type: 'success', timestamp },
          { text: `Platform: WhatsApp Encrypted Messaging Relay`, type: 'output', timestamp },
          { text: `Codename: SEC-PHONE-WHATSAPP`, type: 'system', timestamp },
          { text: `Secure Tunnel: https://wa.me/9779813583274`, type: 'output', timestamp },
          { text: `Execution: Routing client shell payload to direct chat relay...`, type: 'success', timestamp }
        ]);
        setTimeout(() => {
          window.open('https://wa.me/9779813583274', '_blank', 'noreferrer,noopener');
        }, 1200);
        break;

      case 'gmail':
        setLines([
          ...newLines,
          { text: '[+] CONNECTING TO SMTP GMAIL RELAY...', type: 'success', timestamp },
          { text: `Platform: Gmail Secure Mailbox Inbox`, type: 'output', timestamp },
          { text: `Codename: SEC-SMTP-GMAIL`, type: 'system', timestamp },
          { text: `Secure Inbox: mailto:kk2836559@gmail.com`, type: 'output', timestamp },
          { text: `Execution: Standard client mailer loaded for immediate submission.`, type: 'success', timestamp }
        ]);
        setTimeout(() => {
          window.open('mailto:kk2836559@gmail.com', '_blank');
        }, 1200);
        break;

      case 'facebook':
        setLines([
          ...newLines,
          { text: '[+] HANDSHAKING FACEBOOK IDENTITY PORTAL...', type: 'success', timestamp },
          { text: `Platform: Facebook Social Ledger Verification`, type: 'output', timestamp },
          { text: `Codename: SEC-SOCIAL-FACEBOOK`, type: 'system', timestamp },
          { text: `Secure Tunnel: https://facebook.com/kk2836559`, type: 'output', timestamp },
          { text: `Execution: Loading social ledger portal...`, type: 'success', timestamp }
        ]);
        setTimeout(() => {
          window.open('https://facebook.com/kk2836559', '_blank', 'noreferrer,noopener');
        }, 1200);
        break;

      case 'tiktok':
        setLines([
          ...newLines,
          { text: '[+] MOUNTING TIKTOK BROADCAST DISPATCH...', type: 'success', timestamp },
          { text: `Platform: TikTok Media Demonstration Server`, type: 'output', timestamp },
          { text: `Codename: SEC-MEDIA-TIKTOK`, type: 'system', timestamp },
          { text: `Secure Tunnel: https://tiktok.com/@kk2836559`, type: 'output', timestamp },
          { text: `Execution: Launching broadcast feed...`, type: 'success', timestamp }
        ]);
        setTimeout(() => {
          window.open('https://tiktok.com/@kk2836559', '_blank', 'noreferrer,noopener');
        }, 1200);
        break;

      case 'cv':
      case 'resume':
        setLines([
          ...newLines,
          { text: '[*] DECRYPTING SHA256 SECURE CV CONTAINER...', type: 'system', timestamp },
          { text: `Payload: SEC-PAYLOAD-CV.PDF`, type: 'output', timestamp },
          { text: `Authenticity ID: SHA-256_VERIFIED_KRISHNA_BK`, type: 'success', timestamp },
          { text: `Secure Tunnel: https://raw.githubusercontent.com/kk2836559/portfolio/main/resume_krishnabk_sec.pdf`, type: 'output', timestamp },
          { text: `Execution: Compiling portfolio certificates. Handing over download token...`, type: 'success', timestamp }
        ]);
        setTimeout(() => {
          const dlLink = document.createElement('a');
          dlLink.href = 'https://raw.githubusercontent.com/kk2836559/portfolio/main/resume_krishnabk_sec.pdf';
          dlLink.target = '_blank';
          dlLink.referrerPolicy = 'no-referrer';
          dlLink.setAttribute('download', 'CV_Krishna_BK_Sec.pdf');
          document.body.appendChild(dlLink);
          dlLink.click();
          document.body.removeChild(dlLink);
        }, 1200);
        break;

      case 'whoami':
        setLines([
          ...newLines,
          { text: `Host: KRISHNABK_SEC_CORE`, type: 'system', timestamp },
          { text: `Client Agent: Chrome Browser, Gateway Route SSL`, type: 'output', timestamp },
          { text: `Access Rights: Guest Account Level 1`, type: 'warning', timestamp },
          { text: `Local Epoch: ${new Date().toISOString()}`, type: 'output', timestamp },
        ]);
        break;

      case 'clear':
        setLines([]);
        break;

      case 'hack':
        setIsHackingState(true);
        triggerHackingSimulation(newLines);
        break;

      default:
        setLines([
          ...newLines,
          { text: `krishna-sh: command not found: "${baseCommand}". Type "help" to see active security options.`, type: 'error', timestamp },
        ]);
    }
  };

  const triggerHackingSimulation = (startingLines: TerminalLine[]) => {
    let steps: { text: string; type: 'input' | 'output' | 'error' | 'success' | 'system' | 'warning' }[] = [
      { text: '[*] BOOTING CRACKING ALGORITHMS...', type: 'system' },
      { text: '[!] TARGET SYSTEM SELECTED: 192.168.1.109:443', type: 'warning' },
      { text: '[*] ATTEMPTING METASPLOIT SHELL payload execution...', type: 'system' },
      { text: '[+] PORT 443 OPEN. EXTRACTING CERTIFICATE TRUST METADATA...', type: 'output' },
      { text: '[+] EXPLOITING CVE-2023-38646 (Unauthenticated RCE)...', type: 'output' },
      { text: '    [================================>] 100% INJECTION SUCCESS', type: 'success' },
      { text: '[*] ESTABLISHING REVERSE RECON TUNNEL...', type: 'system' },
      { text: '[!] BYPASSING LOCAL WINDOWS FIREWALL DEFENSES...', type: 'warning' },
      { text: '[+] DETECTING ACTIVE DIRECTORY DOMAIN DOMS_TRUST.LOCAL', type: 'output' },
      { text: '[+] ELEVATING PRIVILEGES TO NT AUTHORITY\\SYSTEM...', type: 'success' },
      { text: '==================================================', type: 'system' },
      { text: 'SUCCESS: DOMAIN ADMN CONTROLS COMPROMISED. HACKING TEST COMPLETE.', type: 'success' },
      { text: '==================================================', type: 'system' },
      { text: 'System restored. Terminal buffer unlocked.', type: 'success' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const nextStep = steps[currentStep];
      
      setLines(prev => [
        ...prev,
        {
          text: nextStep.text,
          type: nextStep.type as any,
          timestamp,
        },
      ]);

      currentStep++;
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setIsHackingState(false);
      }
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full flex flex-col font-mono text-sm leading-relaxed p-4 bg-cyber-black neon-border-green border rounded-lg h-[500px] shadow-2xl glassmorphism-cyber overflow-hidden relative cursor-text"
      id="interactive-terminal-console"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b pb-2 mb-3 border-neon-green/25 text-neon-green/80 flex-none select-none">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 animate-pulse text-neon-green" />
          <span className="font-bold tracking-wider text-xs uppercase">Terminal Shell [krishna@sh-core]</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-neon-red/60 border border-neon-red inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60 border border-yellow-400 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-neon-green/60 border border-neon-green inline-block"></span>
        </div>
      </div>

      {/* Terminal Output */}
      <div ref={terminalContainerRef} className="flex-1 overflow-y-auto pr-2 space-y-2 pb-4 scroll-smooth">
        {lines.map((line, index) => (
          <div key={index} className="flex flex-col">
            <div className={`whitespace-pre-wrap ${
              line.type === 'input' ? 'text-neon-cyan' :
              line.type === 'error' ? 'text-neon-red font-semibold' :
              line.type === 'success' ? 'text-neon-green font-semibold neon-text-green' :
              line.type === 'system' ? 'text-purple-400' :
              line.type === 'warning' ? 'text-amber-400' :
              'text-gray-300'
            }`}>
              {line.text}
            </div>
            <span className="text-[10px] text-gray-600 select-none block self-end">
              [{line.timestamp}]
            </span>
          </div>
        ))}
        {isHackingState && (
          <div className="flex items-center gap-2 text-neon-red font-semibold animate-pulse mt-2 py-1 select-none">
            <Cpu className="h-4 w-4 animate-spin" />
            <span>[SIMULATION IN PROGRESS: INTRUSION PAYLOADS SPREADING...]</span>
          </div>
        )}
      </div>

      {/* Terminal Input Form */}
      <form onSubmit={handleCommandSubmit} className="flex items-center mt-2 border-t border-neon-green/20 pt-2 flex-none py-1 relative z-10">
        <ChevronRight className="h-4 w-4 text-neon-green animate-pulse flex-none mr-1" />
        <span className="text-neon-cyan mr-1.5 font-bold flex-none select-none">guest@krishnabk:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isHackingState}
          className="flex-1 bg-transparent border-none outline-none text-neon-green caret-neon-green placeholder-neon-green/30 select-text relative z-20 focus:ring-0 p-0"
          placeholder={isHackingState ? "Simulating exploit..." : 'Type "help" and press ENTER...'}
          autoFocus
          id="terminal-input"
        />
        {inputVal && !isHackingState && (
          <button
            type="submit"
            className="text-[11px] bg-neon-green/10 text-neon-green hover:bg-neon-green/20 px-2 py-0.5 rounded border border-neon-green/30 font-bold transition flex items-center gap-1 cursor-pointer"
            id="terminal-submit-btn"
          >
            <Play className="h-2.5 w-2.5" /> RUN
          </button>
        )}
      </form>
    </div>
  );
};
