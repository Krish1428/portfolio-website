import { Project, Skill, Experience, Certification, BlogPost } from './types';

export const USER_BIO = {
  name: "Krishna B.K.",
  tagline: "Cybersecurity Analyst & Penetration Tester",
  aboutIntro: "Passionate security researcher specializing in defensive security orchestration, threat intelligence analysis, and advanced web penetration testing. I focus on identifying high-impact vulnerabilities, auditing secure cloud infrastructure, and building bespoke automation tools for security workflows.",
  aboutDetailed: "With extensive hands-on experience in CTF hacking platforms (TryHackMe, HackTheBox) and vulnerability research, I help systems stay bulletproof against emerging threat vectors. My methodology is heavily rooted in the MITRE ATT&CK framework and continuous code auditing. Known in the community as an ethical hacker who bridges the gap between secure development (DevSecOps) and surgical offensive auditing.",
  avatarUrl: "", // We can use an image placeholder or generate one
  stats: {
    systemsAudited: "140+",
    vulnsMitigated: "250+",
    ctfRank: "Top 2%",
    advisoriesPublished: "12",
  },
  socials: {
    github: "https://github.com/kk2836559", // Using User's email username prefix as a robust link
    linkedin: "https://linkedin.com/in/krishnabk-security",
    twitter: "https://twitter.com/krishnabk_sec",
    email: "kk2836559@gmail.com",
    tryhackme: "https://tryhackme.com/p/krishnabk",
    hackthebox: "https://hackthebox.com/p/krishnabk",
  },
  resumeUrl: "#", // Clickable link to download resume
};

export const SKILLS_DATA: Skill[] = [
  // Offensive Security
  { name: "Web App Penetration Testing", level: 92, category: "offensive" },
  { name: "Network Auditing & Scanning", level: 88, category: "offensive" },
  { name: "Active Directory Attacks", level: 80, category: "offensive" },
  { name: "API Security Testing", level: 85, category: "offensive" },
  
  // Defensive Security
  { name: "SIEM & SOC Logging (Splunk)", level: 85, category: "defensive" },
  { name: "Threat Hunting (ELK Stack)", level: 82, category: "defensive" },
  { name: "Incident Response Playbooks", level: 78, category: "defensive" },
  { name: "Firewall & IDS/IPS Config", level: 84, category: "defensive" },
  
  // Analytics and Intelligence
  { name: "Vulnerability Management", level: 90, category: "analytics" },
  { name: "Malware Analysis & Sandbox", level: 75, category: "analytics" },
  { name: "OSINT Threat Intel", level: 87, category: "analytics" },
  { name: "MITRE ATT&CK Mapping", level: 85, category: "analytics" },

  // Tools & Frameworks
  { name: "Wireshark & Nmap", level: 95, category: "tools" },
  { name: "Burp Suite Professional", level: 90, category: "tools" },
  { name: "Metasploit Framework", level: 85, category: "tools" },
  { name: "Ghidra & Radare2", level: 70, category: "tools" },
  { name: "Docker & Kubernetes Sec", level: 80, category: "tools" },

  // Languages & automation
  { name: "Python (Security Scripting)", level: 90, category: "languages" },
  { name: "Bash & Linux Internals", level: 88, category: "languages" },
  { name: "PowerShell", level: 75, category: "languages" },
  { name: "TypeScript / Node.js", level: 82, category: "languages" },
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp-1",
    role: "SecOps Engineer & Penetration Tester",
    company: "CyberGuard Solutions",
    period: "2024 - Present",
    description: [
      "Conducted black-box and white-box web application assessments for Enterprise partners, uncovering 15+ sub-domain takeovers and API authorization bypasses.",
      "Engineered automated Python security toolkits that reduced compliance auditing cycles by 40%.",
      "Drafted professional vulnerability advisory logs detailing CVSS scopes, proof-of-concept exploits, and exact remediation directives."
    ],
    isSecurityRole: true,
  },
  {
    id: "exp-2",
    role: "SOC Analyst Intern",
    company: "Vigilant Networks",
    period: "2023 - 2024",
    description: [
      "Monitored incoming telemetry events in real-time SOC SIEM dashboards to isolate credential-stuffing and lateral movement attempts.",
      "Contributed to response plans for simulated ransomware drill incidents, improving Mean Time to Detect (MTTD) by 25%.",
      "Maintained network segmentation rules as part of a Zero Trust implementation plan across remote server nodes."
    ],
    isSecurityRole: true,
  },
  {
    id: "exp-3",
    role: "Infrastructure Security Consultant",
    company: "Freelance / Open Source Contributor",
    period: "2022 - 2023",
    description: [
      "Conducted volunteer infrastructure auditing for emerging open-source platforms, submitting security remediation pull requests.",
      "Ranked Top tier in TryHackMe offensive pathways, accumulating credentials in privilege escalation and Windows domain auditing."
    ],
    isSecurityRole: true,
  },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "cert-2",
    name: "CompTIA Security+",
    issuer: "CompTIA",
    date: "2024",
    credentialId: "SEC-93A8B17C",
    verificationUrl: "https://www.credly.com",
  },
  {
    id: "cert-3",
    name: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "2025",
    credentialId: "ECC-3482910X",
    verificationUrl: "https://aspen.eccouncil.org",
  },
  {
    id: "cert-4",
    name: "eLearnSecurity Junior Penetration Tester (eJPT)",
    issuer: "INE",
    date: "2023",
    credentialId: "INE-672901",
    verificationUrl: "https://www.ine.com",
  },
  {
    id: "cert-1",
    name: "PortSwigger Certified Web Practitioner",
    issuer: "PortSwigger",
    date: "2025",
    credentialId: "PS-809211",
    verificationUrl: "https://portswigger.net",
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-1",
    title: "Aegis Sentinel: Custom Subdomain & Leak Scanner",
    description: "An automated multi-threaded subdomain enumeration suite mapping targets, extracting exposed SSL metadata, scan logs, and passive DNS history.",
    longDescription: "A security utility built in Python utilizing multi-threaded concurrent requests to actively scrape threat intelligence APIs, passive DNS, and SSL database tables. Integrates active port mapping and quick technology detection to find orphan subdomains susceptible to subdomain transfer hijacking.",
    category: "tools",
    stars: 124,
    forks: 32,
    languages: ["Python", "Go", "Shell"],
    githubUrl: "https://github.com/kk2836559/aegis-sentinel",
    demoUrl: "",
    severity: "critical",
    impact: "Uncovered 3 critical sub-domain takeovers in scope.",
    remediation: "Ensure stale DNS CNAME aliases are immediately purged.",
    date: "May 2025"
  },
  {
    id: "proj-2",
    title: "Vulnerability Lab: Advanced SQLi & XSS Honeypot",
    description: "Integrated local honeypot container detecting blind SQL and Cross-Site Scripting payloads, compiling attacker telemetry, payloads, and geolocation alerts.",
    longDescription: "A Docker-driven full interactive honeypot that presents false vulnerabilities to malicious scanners. It detects SQLi payloads, XSS injections, and path traversals, logs attacker telemetry, payload formats, and issues real-time Discord notifications via webhook.",
    category: "research",
    stars: 87,
    forks: 18,
    languages: ["TypeScript", "Docker", "Svelte"],
    githubUrl: "https://github.com/kk2836559/vuln-honeypot",
    demoUrl: "",
    severity: "high",
    impact: "Mitigates automated bot reconnaissance in corporate perimeters.",
    remediation: "Deploy customized honeypots to isolate cyber scanners.",
    date: "Feb 2025"
  },
  {
    id: "proj-3",
    title: "IronWall: Tailscale Access Proxy & Firewall Orchestrator",
    description: "Lightweight firewall wrapper that reads incoming tunnel events, authenticates nodes via ephemeral keys, and acts as a single Zero Trust proxy gate.",
    longDescription: "A modern network security wrapper crafted for internal cloud clusters. It parses incoming nodes dynamic identities, enforces strict lease authorization, and updates kernel IP table regulations dynamically on active threat detection.",
    category: "blue-team",
    stars: 145,
    forks: 41,
    languages: ["Rust", "Python", "Lua"],
    githubUrl: "https://github.com/kk2836559/ironwall",
    demoUrl: "",
    severity: "medium",
    impact: "Establishes secure, authorization-gated peer networking.",
    remediation: "Enforce multi-factor authorization on administrative relays.",
    date: "Aug 2024"
  },
  {
    id: "proj-4",
    title: "CTF Kernel: Custom Pwn & Buffer-Overflow Exploits",
    description: "Collation of compiled buffer overflow scripts, kernel race-condition exploits, and custom challenge write-ups solving elite CTF systems.",
    longDescription: "A repository of source materials, POCs, and detailed attack workflows addressing security challenges. Highlights automated stack canary calculations and Return-to-libc (ret2libc) payload structure generators.",
    category: "ctf",
    stars: 56,
    forks: 14,
    languages: ["C", "Python", "Assembly"],
    githubUrl: "https://github.com/kk2836559/ctf-kernel-pwn",
    demoUrl: "",
    severity: "high",
    impact: "Successfully maps zero-day local privilege escalation paths.",
    remediation: "Re-compile binary applications with ASLR, Stack Canaries, and NX bits active.",
    date: "Dec 2024"
  },
  {
    id: "proj-5",
    title: "Shodan-Scout: Active Threat Intelligence Parser",
    description: "An OSINT parsing terminal utility that interfaces with Shodan, Censys, and WHOIS databases to extract exposed administration panels automatically.",
    longDescription: "A command line parser designed to streamline cybersecurity intelligence gathering and discover internet-facing operational technology assets containing weak default configurations.",
    category: "tools",
    stars: 94,
    forks: 22,
    languages: ["Python", "Shell"],
    githubUrl: "https://github.com/kk2836559/shodan-scout",
    demoUrl: "",
    severity: "medium",
    impact: "Uncovered 12 open ICS/SCADA panels with weak authentication protocols.",
    remediation: "Enforce network zoning and integrate VPN gates for remote panels.",
    date: "Oct 2024"
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: "blog-1",
    title: "Deconstructing OWASP Top 1: Safe JWT Implementation in Node.js",
    excerpt: "JSON Web Tokens are widely misused, leaving servers exposed to cryptographic bypasses. This post breaks down JWT exploits and safe configurations.",
    content: `### Understanding JSON Web Token (JWT) Security Failures

JSON Web Tokens (JWT) have become the modern standard for stateless sessions, but their simplicity is deceptive. Often, implementers compromise their cryptographic integrity, leaving backdoors broad open for adversaries.

#### 1. The 'None' Algorithm Attack Vector
In premature JWT library releases, setting the header \`"alg": "none"\` was allowed, signalling that the signature verification step should be skipped. An attacker could trivially alter their payload (e.g., change user identity to \`\"admin\"\`) and sign-off with an empty signature.

\`\`\`json
// Attacker Header
{
  "alg": "none",
  "typ": "JWT"
}
// Attacker Payload
{
  "user": "root",
  "role": "administrator"
}
\`\`\`

#### 2. Key Confusion Attack (RS256 to HS256)
If a token verifier supports both RS256 (asymmetric public/private keys) and HS256 (symmetric shared secret), an attacker can extract the public RSA key (which is often publicly available or queryable in JKWS configurations), modify the token signature, and sign it using **HS256** with that public key treated as the HMAC key. 

#### Safe JWT Implementation Checklist

*   **Never trust the 'alg' header blindly**: Enforce absolute algorithm verification server-side.
*   **Keep secrets in hardware vaults**: Avoid storing keys directly in text setups.
*   **Configure Short-lived Tokens**: Issue momentary JWT leases and leverage Secure HttpOnly cookies mapped with CSRF tokens.`,
    category: "vulnerability",
    severity: "critical",
    date: "April 20, 2025",
    readTime: "6 min read"
  },
  {
    id: "blog-2",
    title: "Real-time Threat Intelligence Scopes with MITRE ATT&CK Mapping",
    excerpt: "How to effectively convert plain network intrusion telemetry into actionable intelligence logs aligning with MITRE's threat adversary catalogs.",
    content: `### Advancing Threat Detection via MITRE ATT&CK Maps

Too often, corporate SOC alerts consist of dry system messages like "Suspicious registry update detected." This lacks critical architectural context. Security administrators must map these alerts against specific tactical profiles.

#### Why Matrix Mapping Matters
Mapping events allows SOC leads to:
1.  **Expose the Adversary's Objective**: Determine if an action correlates to Initial Access, Execution, Persistence, or Exfiltration.
2.  **Highlight Security blind spots**: If you map all defense profiles, areas with zero mitigation coverage become instantly visible.

#### Attack Scenario Mapping Example

| Activity Logged | Tactic ID | Technique Name | Recommended Defensive Action |
| :--- | :--- | :--- | :--- |
| External SSH brute-force attempts | T1190 | Exploit Public-Facing App | Integrate Fail2ban, rate-limit, and IP blocklisting rules. |
| LSASS memory process dump | T1003.001 | Credential Dumping: LSASS Memory | Enable Windows Credential Guard, and strictly audit domain-level access. |
| Persistent service scheduled | T1053 | Scheduled Task/Job | Log task orchestrators, and map active service creation histories. |

By aligning alarms directly to MITRE identifiers, incident responders can coordinate actionable response playbook tasks in minutes.`,
    category: "threat-intel",
    severity: "warning",
    date: "March 12, 2025",
    readTime: "5 min read"
  },
  {
    id: "blog-3",
    title: "Mastering Linux Privilege Escalation: Exploiting SUID Binaries",
    excerpt: "A deep dive tutorial on identifying, testing, and exploiting misconfigured SUID bits in Unix systems for privilege escalation assessments.",
    content: `### Linux Penetration Testing: Exploiting SUID Permissions

During active security audits, acquiring initial restricted SSH shell access is only the first step. To conduct a realistic penetration assessment, escalating privileges to the \`root\` system user is the ultimate target. One common vulnerability involves **SUID (Set User ID)** binaries.

#### What is SUID?
SUID is a Unix permission flag that allows a user to execute a binary with the permissions of the file owner (which is often **root**), rather than their own permissions.

#### 1. Hunting for Misconfigured SUID Files
Run this command from your unprivileged terminal shell inside the candidate target to retrieve all binary programs flagged with the SUID bit:

\`\`\`bash
find / -perm -4000 -type f 2>/dev/null
\`\`\`

#### 2. Consulting GTFOBins
If binaries like \`find\`, \`nmap\`, \`cp\`, or \`vim\` have SUID bits enabled, an attacker can hijack their internal administrative execution capability. For example, if \`find\` is flagged as SUID:

\`\`\`bash
find . -exec /bin/sh -p \\; -quit
\`\`\`

This tells find to launch an interactive shell (\`/bin/sh\`) with native parent SUID context (\`-p\`), immediately promoting the shell to \`root\`.

#### Effective SUID Safeguards

1.  **Enforce Principle of Least Privilege**: Ensure binaries are not marked SUID unless strictly necessary.
2.  **Audit Regularly**: Conduct security scans of SUID-enabled system utilities.
3.  **Implement Mount Restraints**: Mount user directories (e.g. \`/home\`, \`/tmp\`) with the \`nosuid\` parameter.`,
    category: "tutorials",
    severity: "info",
    date: "Jan 15, 2025",
    readTime: "8 min read"
  }
];
