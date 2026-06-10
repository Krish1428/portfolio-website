export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'tools' | 'research' | 'ctf' | 'blue-team';
  stars?: number;
  forks?: number;
  languages: string[];
  githubUrl?: string;
  demoUrl?: string;
  severity?: 'critical' | 'high' | 'medium' | 'low';
  impact?: string;
  remediation?: string;
  date: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'offensive' | 'defensive' | 'analytics' | 'tools' | 'languages';
  iconName?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  isSecurityRole: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  badgeUrl?: string;
  verificationUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'threat-intel' | 'vulnerability' | 'tutorials' | 'ctf';
  severity?: 'info' | 'critical' | 'warning';
  date: string;
  readTime: string;
}

export interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  timestamp: string;
}
