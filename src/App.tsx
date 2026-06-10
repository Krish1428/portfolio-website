import React, { useState } from 'react';
import { MatrixBackground } from './components/MatrixBackground';
import { CyberNavbar } from './components/CyberNavbar';
import { CyberAvatar } from './components/CyberAvatar';
import { StatsDashboard } from './components/StatsDashboard';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { SkillBars } from './components/SkillBars';
import { GitHubRepoExplorer } from './components/GitHubRepoExplorer';
import { ProjectShowcase } from './components/ProjectShowcase';
import { CertificationsGrid } from './components/CertificationsGrid';
import { BlogAdvisories } from './components/BlogAdvisories';
import { SecureContactForm } from './components/SecureContactForm';
import { IdentityChannels } from './components/IdentityChannels';
import { USER_BIO, EXPERIENCE_DATA } from './data';

import {
  FileText,
  Shield,
  ShieldCheck,
  ChevronRight,
  Terminal,
  Activity,
  Award,
  BookOpen,
  Mail,
  Cpu,
  Lock,
  Compass,
  ArrowUpRight,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Radio
} from 'lucide-react';

export default function App() {
  const [downloadingResume, setDownloadingResume] = useState(false);
  const [resumeLogs, setResumeLogs] = useState<string[]>([]);

  // Smooth scroll handler for nav
  const handleNavigation = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 85,
        behavior: 'smooth',
      });
    }
  };

  const executeResumeDownload = () => {
    if (downloadingResume) return;
    setDownloadingResume(true);
    setResumeLogs([]);

    const steps = [
      '[*] Initializing secure package compiler...',
      '[*] Validating administrator credential signatures...',
      '[*] Compiling academic & corporate history milestones...',
      '[+] Formatting cybersecurity cert logs [CEH, Security+ OK]',
      '[*] Compressing and packaging to secure PDF container...',
      '[+] Success: Download payload compiled in local storage memory.'
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setResumeLogs(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setDownloadingResume(false);
            // Simulate triggering user download
            const link = document.createElement('a');
            link.href = 'https://raw.githubusercontent.com/kk2836559/portfolio/main/resume_krishnabk_sec.pdf';
            link.setAttribute('download', 'Resume_Krishna_BK_Sec.pdf');
            // Using placeholder to prevent navigation, while keeping download format perfect
            alert('SECURE COMPILATION SYSTEM:\nIdentity CV generated successfully on the client device.\nIn production, this downloads the actual custom secure PDF directly!');
          }, 600);
        }
      }, (idx + 1) * 350);
    });
  };

  return (
    <div className="min-h-screen bg-cyber-black text-gray-300 relative selection:bg-neon-green/30 selection:text-white" id="main-portfolio-root">
      {/* 1. Canvas digital Matrix rain overlay layer */}
      <MatrixBackground color="#00ff66" speed={38} fontSize={13} />

      {/* Grid overlay mesh */}
      <div className="absolute inset-0 opacity-10 pointer-events-none cyber-grid bg-repeat"></div>

      {/* Glowing atmospheric neon blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-neon-green/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-2/3 right-10 w-[450px] h-[450px] rounded-full bg-neon-cyan/5 blur-[150px] pointer-events-none"></div>

      {/* Cyber scanner lines moving down the monitor viewport */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-40 opacity-20">
        <div className="w-full h-0.5 bg-neon-green/30 animate-scanline"></div>
      </div>

      {/* 2. Sleek Cyber Navigation Header */}
      <CyberNavbar onNavigate={handleNavigation} />

      {/* Main Content Sections Assembly */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-24 relative z-10">
        
        {/* HOMEPAGE // HERO HEADER BANNER */}
        <section className="scroll-mt-28 flex flex-col pt-6 gap-8" id="home">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side text profile */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 p-1 px-3 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green font-mono text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping"></span>
                <span>SYSTEM ONLINE // CLIENT GRANTED SHELL RIGHTS</span>
              </div>

              <div className="space-y-2.5">
                <span className="block font-mono text-neon-cyan text-xs font-bold tracking-widest uppercase">
                  HEURISTIC SECURITY INTEL PORTAL
                </span>
                <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none uppercase">
                  {USER_BIO.name}
                </h1>
                <h2 className="font-mono text-base md:text-lg font-bold text-neon-green tracking-wide">
                  {USER_BIO.tagline}
                </h2>
              </div>

              <p className="font-sans text-sm md:text-base leading-relaxed text-gray-400 max-w-xl">
                {USER_BIO.aboutIntro}
              </p>

              {/* Action Buttons trigger */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => handleNavigation('contact')}
                  className="px-6 py-3 bg-neon-green/15 hover:bg-neon-green/25 text-neon-green font-mono text-xs font-bold border border-neon-green/45 hover:border-neon-green rounded-lg flex items-center gap-2 transition cursor-pointer"
                  id="cta-secure-dispatch"
                >
                  <Terminal className="h-4 w-4" /> RECON DISPATCH GATES
                </button>

                <div className="relative">
                  <button
                    onClick={executeResumeDownload}
                    disabled={downloadingResume}
                    className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold border border-neutral-800 hover:border-neutral-700 rounded-lg flex items-center gap-2 transition cursor-pointer"
                    id="cta-download-resume"
                  >
                    <FileText className="h-4 w-4 text-neon-cyan" /> GET SECURE CV [PDF]
                  </button>

                  {/* Tiny simulated package compile logs on click */}
                  {downloadingResume && (
                    <div className="absolute top-14 left-0 w-72 bg-cyber-black p-3.5 rounded border border-neon-cyan/40 shadow-2xl z-50 font-mono text-[10px] space-y-1 text-neon-cyan leading-snug animate-fadeIn">
                      {resumeLogs.map((log, idx) => (
                        <div key={idx}>{log}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Verified Badge and security networks links */}
              <div className="flex items-center gap-4 pt-4 border-t border-neutral-900/60 font-mono text-xs text-gray-500">
                <span>IDENTITY NODES:</span>
                <div className="flex items-center gap-3.5 text-gray-400">
                  <a href={USER_BIO.socials.github} target="_blank" referrerPolicy="no-referrer" className="hover:text-neon-cyan transition flex items-center gap-1" id="social-link-github">
                    <Github className="h-4 w-4" /> GITHUB
                  </a>
                  <a href={USER_BIO.socials.linkedin} target="_blank" referrerPolicy="no-referrer" className="hover:text-neon-cyan transition flex items-center gap-1" id="social-link-linkedin">
                    <Linkedin className="h-4 w-4" /> LINKEDIN
                  </a>
                  <a href={USER_BIO.socials.twitter} target="_blank" referrerPolicy="no-referrer" className="hover:text-neon-cyan transition flex items-center gap-1" id="social-link-twitter">
                    <Twitter className="h-4 w-4" /> TWITTER
                  </a>
                </div>
              </div>
            </div>

            {/* Right side graphical interactive radar scope */}
            <div className="lg:col-span-5 flex items-center justify-center pt-8 lg:pt-0">
              <CyberAvatar />
            </div>
          </div>

          {/* 3. Cyber statistics milestones telemetry row */}
          <div className="pt-8">
            <StatsDashboard />
          </div>
        </section>

        {/* INTERACTIVE CONTROLS CENTER // SH-TERMINAL SEG_UNIT */}
        <section className="scroll-mt-24 space-y-3" id="terminal-section">
          <div className="border-b border-neutral-900 pb-2">
            <h3 className="font-mono text-xs font-bold text-neon-cyan uppercase tracking-widest flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-neon-cyan animate-pulse" /> COMMAND CONTROLS DECK
            </h3>
            <p className="text-gray-500 text-xs mt-0.5">
              Interact directly with the local system kernels by entering diagnostic console instructions.
            </p>
          </div>
          <InteractiveTerminal />
        </section>

        {/* ABOUT PROFILE BIOGRAPHY SUMMARY */}
        <section className="scroll-mt-24 space-y-5" id="about">
          <div className="border-b border-neutral-900 pb-2">
            <h3 className="font-mono text-xs font-bold text-neon-green uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-neon-green" /> 01 // OPERATIONAL PROFILE
            </h3>
            <h2 className="font-sans font-extrabold text-2xl text-white uppercase tracking-tight mt-1">
              About the Researcher
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-4 text-sm md:text-base leading-relaxed text-gray-400 font-sans">
              <p>
                {USER_BIO.aboutDetailed}
              </p>
              <p>
                My professional objectives center around security resilience. I focus on mapping cyber exposures thoroughly using advanced threat profiling frameworks. Beyond offensive vulnerability searching, I am deeply committed to crafting defensive integrations that help modern code architectures stay resilient under continuous lateral assaults.
              </p>

              {/* Tactical Focus checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-gray-300">
                  <ShieldCheck className="h-4 w-4 text-neon-green flex-shrink-0" />
                  <span>OWASP Top 10 Exploitation & Securing</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <ShieldCheck className="h-4 w-4 text-neon-green flex-shrink-0" />
                  <span>Interactive Threat Hunting & SIEM logs</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <ShieldCheck className="h-4 w-4 text-neon-green flex-shrink-0" />
                  <span>Docker & Orchestration hardening</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <ShieldCheck className="h-4 w-4 text-neon-green flex-shrink-0" />
                  <span>Automated Python/Bash Security scripting</span>
                </div>
              </div>
            </div>

            {/* Tactical Brief Card */}
            <div className="md:col-span-4 glassmorphism p-5 rounded-lg border border-neutral-800 text-xs font-mono space-y-3.5 leading-relaxed relative">
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-neon-cyan opacity-40"></div>
              
              <div className="text-neon-cyan font-bold uppercase tracking-widest border-b border-neutral-800 pb-1.5">
                SEC_METHODOLOGY
              </div>

              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span>MITRE FRAMEWORK:</span>
                  <span className="text-white">COMPLIANT</span>
                </div>
                <div className="flex justify-between">
                  <span>THREAT ASSESS CODES:</span>
                  <span className="text-white">CVSS v3.1 SEV</span>
                </div>
                <div className="flex justify-between">
                  <span>PREFER SHIELD:</span>
                  <span className="text-white">ZERO-TRUST SEC</span>
                </div>
                <div className="flex justify-between">
                  <span>TEST ALGORITHMS:</span>
                  <span className="text-white">BLACK/WHITE BOX</span>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800/80 text-[10px] text-gray-500 uppercase leading-snug">
                Audit registries verified on active cloud clusters. Security clear: Admin Level.
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS MULTI-TAB DISPLAY METERS */}
        <section className="scroll-mt-24 space-y-5" id="skills">
          <div className="border-b border-neutral-900 pb-2">
            <h3 className="font-mono text-xs font-bold text-neon-cyan uppercase tracking-widest flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-neon-cyan" /> 02 // TECHNICAL CONTROL METRIC
            </h3>
            <h2 className="font-sans font-extrabold text-2xl text-white uppercase tracking-tight mt-1">
              Skills Arsenal
            </h2>
          </div>
          <SkillBars />
        </section>

        {/* GITHUB INTEGRATION DECK MAP */}
        <section className="scroll-mt-24 space-y-3">
          <div className="border-b border-neutral-900 pb-2">
            <h3 className="font-mono text-xs font-bold text-neon-green uppercase tracking-widest flex items-center gap-1.5">
              <Github className="h-4 w-4 text-neon-green" /> REAL-TIME SECURITY SYNC
            </h3>
            <h2 className="font-sans font-extrabold text-xl text-white uppercase tracking-tight mt-1">
              Active Github Repositories
            </h2>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-xl">
            This module integrates directly via the public GitHub REST API to pull live code statistics, languages, and update loops of active security deployments.
          </p>
          <GitHubRepoExplorer />
        </section>

        {/* PORTFOLIO PROJECTS SHOWCASE WITH AUDIT METRICS */}
        <section className="scroll-mt-24 space-y-5" id="projects">
          <div className="border-b border-neutral-900 pb-2">
            <h3 className="font-mono text-xs font-bold text-neon-cyan uppercase tracking-widest flex items-center gap-1.5">
              <Terminal className="h-4 w-4 text-neon-cyan" /> 03 // AUDITED CODE ARCHITECTURES
            </h3>
            <h2 className="font-sans font-extrabold text-2xl text-white uppercase tracking-tight mt-1">
              Featured Security Projects
            </h2>
          </div>
          <ProjectShowcase />
        </section>

        {/* SECURITY RECON CHRONOLOGY timeline */}
        <section className="scroll-mt-24 space-y-5" id="experience">
          <div className="border-b border-neutral-900 pb-2">
            <h3 className="font-mono text-xs font-bold text-neon-green uppercase tracking-widest flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-neon-green" /> 04 // OPERATIONAL TIMELINE
            </h3>
            <h2 className="font-sans font-extrabold text-2xl text-white uppercase tracking-tight mt-1">
              Defense Experience Record
            </h2>
          </div>

          <div className="relative border-l border-neutral-800 pl-6 ml-3.5 space-y-8 font-mono text-xs" id="experience-timeline">
            {EXPERIENCE_DATA.map((exp, idx) => {
              return (
                <div key={exp.id} className="relative group">
                  {/* Timeline indicator node */}
                  <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyber-black border-2 border-neon-green ring-4 ring-cyber-black group-hover:scale-125 transition-transform duration-300"></span>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <span className="text-[10px] text-neon-green font-bold uppercase tracking-widest bg-neon-green/5 px-2 py-0.5 rounded border border-neon-green/20">
                        {exp.period}
                      </span>
                      <h4 className="font-sans text-base font-extrabold text-white uppercase mt-1.5">
                        {exp.role}
                      </h4>
                    </div>
                    <span className="text-neon-cyan text-xs font-bold uppercase">
                      @{exp.company}
                    </span>
                  </div>

                  <ul className="list-disc pl-4 mt-3 space-y-2 text-gray-400 font-sans text-xs md:text-sm leading-relaxed max-w-2xl">
                    {exp.description.map((bullet, bIdx) => (
                      <li key={bIdx} className="hover:text-gray-300 transition-colors">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* CYBERSECURITY CERTIFICATIONS DECK */}
        <section className="scroll-mt-24 space-y-5" id="certifications">
          <div className="border-b border-neutral-900 pb-2">
            <h3 className="font-mono text-xs font-bold text-neon-cyan uppercase tracking-widest flex items-center gap-1.5">
              <Award className="h-4 w-4 text-neon-cyan" /> 05 // SECURITY CREDENTIAL REGISTER
            </h3>
            <h2 className="font-sans font-extrabold text-2xl text-white uppercase tracking-tight mt-1">
              Certifications & Badges
            </h2>
          </div>
          <CertificationsGrid />
        </section>

        {/* THREAT BRIEFINGS & WRITE-UPS SECTION */}
        <section className="scroll-mt-24 space-y-5" id="blog">
          <div className="border-b border-neutral-900 pb-2">
            <h3 className="font-mono text-xs font-bold text-neon-green uppercase tracking-widest flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-neon-green" /> 06 // INTEL RESEARCH LAB
            </h3>
            <h2 className="font-sans font-extrabold text-2xl text-white uppercase tracking-tight mt-1">
              Vulnerability write-ups & Threat intelligence
            </h2>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-xl mb-4">
            A review of recent critical threat modeling documentation, JWT security bypasses, and privilege escalation configurations. Click any folder to load full reports.
          </p>
          <BlogAdvisories />
        </section>

        {/* SECURE IDENTITY COMMUNICATIONS GATES */}
        <section className="scroll-mt-24 space-y-5" id="channels">
          <div className="border-b border-neutral-900 pb-2">
            <h3 className="font-mono text-xs font-bold text-neon-green uppercase tracking-widest flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-neon-green animate-pulse" /> 07 // IDENTITY COMMUNICATIONS GATES & CV PAYLOAD
            </h3>
            <h2 className="font-sans font-extrabold text-2xl text-white uppercase tracking-tight mt-1">
              Secure Relays & Communication Channels
            </h2>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-xl mb-4">
            Establish direct, verified cryptographic communication tunnels to reach me across LinkedIn, WhatsApp, Gmail, Facebook, TikTok channels, and access the signature-verified Secure CV payload.
          </p>
          <IdentityChannels />
        </section>

        {/* ENCRYPTED COMMUNICATIONS GATEWAY CONTACT FORM */}
        <section className="scroll-mt-24 space-y-5" id="contact">
          <div className="border-b border-neutral-900 pb-2">
            <h3 className="font-mono text-xs font-bold text-neon-cyan uppercase tracking-widest flex items-center gap-1.5">
              <Mail className="h-4 w-4 text-neon-cyan" /> 08 // TRANSCEIVER CONTACT GATEWAY
            </h3>
            <h2 className="font-sans font-extrabold text-2xl text-white uppercase tracking-tight mt-1">
              Secure Communications Dispatches
            </h2>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-xl mb-4">
            Send a cryptographically compiled contact dispatch. Your packet details are printed in the live logging interface.
          </p>
          <SecureContactForm />
        </section>

      </main>

      {/* 13. HIGH CONTRAST MATTE CYBER FOOTER */}
      <footer className="bg-cyber-black border-t border-neutral-900 py-12 relative z-10 text-xs font-mono leading-relaxed text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left side compliance block */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                <Shield className="h-4 w-4 text-neon-green animate-pulse" /> KRISHNA_BK_RECON_SH
              </div>
              <p className="text-gray-500 text-[11px] leading-relaxed font-sans">
                Professional portfolio website representing secure offensive code audit reviews and proactive threat vector research mapping. Built using React, Tailwind CSS, and standard HTTPS SSL gates.
              </p>
              <div className="font-mono text-[9px] text-neon-cyan/60 flex items-center gap-1.5">
                <Lock className="h-3 w-3" /> GPG SIGN: F3A1-709B-12C4-9A4B-01FF
              </div>
            </div>

            {/* Mid connection columns */}
            <div className="md:col-span-3 space-y-2">
              <span className="block font-bold text-gray-400 uppercase tracking-wider">SYSTEM LINKS</span>
              <ul className="space-y-1.5 text-[10px]">
                <li><button onClick={() => handleNavigation('home')} className="hover:text-neon-cyan transition cursor-pointer">/home/landing</button></li>
                <li><button onClick={() => handleNavigation('about')} className="hover:text-neon-cyan transition cursor-pointer">/home/operational_profile</button></li>
                <li><button onClick={() => handleNavigation('skills')} className="hover:text-neon-cyan transition cursor-pointer">/home/skills_arsenal</button></li>
                <li><button onClick={() => handleNavigation('channels')} className="hover:text-neon-cyan transition cursor-pointer">/home/secure_channels</button></li>
                <li><button onClick={() => handleNavigation('projects')} className="hover:text-neon-cyan transition cursor-pointer">/home/audited_codebases</button></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3 text-right md:text-left">
              <span className="block font-bold text-gray-400 uppercase tracking-wider">ISO-27001 COMPLIANCE STATEMENT</span>
              <p className="text-[10px] text-gray-600 font-sans leading-relaxed">
                All software codebases, reverse engineering demonstrations, and network scanning POCs in this resume space are compiled inside sandboxed local environments for white-box educational evaluation exclusively. Unauthorized distribution is guarded.
              </p>
              <div className="text-[10px] text-neon-green font-bold uppercase flex items-center justify-end md:justify-start gap-1.5">
                <Radio className="h-3 w-3 animate-ping" /> SECURE TUNNEL ACTIVE
              </div>
            </div>

          </div>

          <div className="border-t border-neutral-900 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-600 gap-4">
            <span>© {new Date().getFullYear()} Krishna B.K. Cryptographic Systems. All Rights Reserved.</span>
            <span>DEVELOPMENT CONTAINER ENVIRONMENT // PORT 3000 // UTC-0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
