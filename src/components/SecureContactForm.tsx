import React, { useState } from 'react';
import { Send, Terminal, CheckCircle2, AlertTriangle, ShieldCheck, Cpu, RefreshCw } from 'lucide-react';

interface LogLine {
  text: string;
  type: 'system' | 'success' | 'warn' | 'info';
}

export const SecureContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [contactLogs, setContactLogs] = useState<LogLine[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Quick logger output on input modification for cybersecurity detail
    if (contactLogs.length < 5 && Math.random() > 0.85) {
      appendLog(`PACKET BUFFER: Input block [${name}] expanded to ${value.length} bytes`, 'info');
    }
  };

  const appendLog = (text: string, type: 'system' | 'success' | 'warn' | 'info' = 'info') => {
    setContactLogs(prev => [...prev, { text, type }]);
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Simple fields authentication
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Identity Credentials Required: Please fulfill all mandatory fields.');
      appendLog('TRANSMIT FAILED: Empty field validation constraint triggered', 'warn');
      return;
    }

    if (!formData.email.includes('@')) {
      setFormError('Identity Protocols Malformed: Please enter a correct email payload.');
      appendLog('TRANSMIT FAILED: SMTP validation format anomalous', 'warn');
      return;
    }

    setSending(true);
    setContactLogs([]);
    
    // Running mock transmitter telemetry
    appendLog('INITIATING SSL COMPLIANT DISPATCH ROUTINE...', 'system');
    
    const steps = [
      { text: '[*] Compiling communication package...', delay: 400, type: 'system' },
      { text: `[+] Name header logged: "${formData.name.toUpperCase()}"`, delay: 800, type: 'info' },
      { text: `[+] Contact handle set: <${formData.email}>`, delay: 1200, type: 'info' },
      { text: '[*] Packaging message contents with AES-256 cipher streams...', delay: 1600, type: 'system' },
      { text: '[+] Cryptographic integrity checks approved [SHA-256 OK]', delay: 2000, type: 'success' },
      { text: '[*] Handshaking with secure cloud relay on port 465...', delay: 2400, type: 'system' },
      { text: '[+] Secure Tunnel aligned: [SSL GATED CONNECTION COMPLIANT]', delay: 2800, type: 'success' }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        appendLog(step.text, step.type as any);
      }, step.delay);
    });

    // Real API dispatch synchronised with telemetry logs animation
    setTimeout(async () => {
      try {
        appendLog('[*] Transporting encrypted data payload to API server...', 'system');
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          appendLog('[+] Message successfully transmitted to Krishna BK security dispatch.', 'success');
          setSending(false);
          setSent(true);
          // Persist a local trace in local storage
          try {
            const history = JSON.parse(localStorage.getItem('kbk_secure_submits') || '[]');
            history.push({ ...formData, timestamp: new Date().toISOString() });
            localStorage.setItem('kbk_secure_submits', JSON.stringify(history));
          } catch (e) {
            // silent fail
          }
        } else {
          const errData = await res.json();
          setFormError(errData.error || 'Server rejected transmission.');
          appendLog(`[!] TRANSMIT FAILED: Server rejected payload [Status ${res.status}]`, 'warn');
          setSending(false);
        }
      } catch (err) {
        setFormError('Relay Offline: Could not establish a connection to the backend server.');
        appendLog('[!] TRANSMIT FAILED: Connection handshake timed out', 'warn');
        setSending(false);
      }
    }, 3200);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSent(false);
    setContactLogs([]);
    setFormError(null);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8" id="secure-contact-grid">
      {/* Contact Input Form Card */}
      <div className="lg:col-span-7 glassmorphism p-6 rounded-lg border border-neutral-800/80 relative" id="contact-form-card">
        {/* Decorative brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-cyan"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-cyan"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan"></div>

        <h4 className="font-mono text-sm font-bold text-neon-cyan uppercase tracking-wider mb-5 flex items-center gap-2">
          <Terminal className="h-4 w-4 text-neon-cyan animate-pulse" /> Secure Message Relaying
        </h4>

        {sent ? (
          <div className="flex flex-col items-center justify-center py-10 text-center font-mono animate-fadeIn" id="contact-success-screen">
            <div className="w-16 h-16 rounded-full bg-neon-green/10 border border-neon-green flex items-center justify-center p-3 text-neon-green shadow-green-glow mb-4 animate-bounce">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h5 className="text-white text-base font-bold uppercase mb-2">Transmission Successful</h5>
            <p className="text-gray-400 text-xs max-w-sm leading-relaxed mb-6">
              Your cipher payload was dispatched securely. Krishna B.K. receives this on real-time alerting systems.
            </p>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-neon-cyan/15 hover:bg-neon-cyan/25 text-neon-cyan text-xs font-mono border border-neon-cyan/40 rounded transition flex items-center gap-1.5 cursor-pointer"
              id="reset-form-btn"
            >
              <RefreshCw className="h-3.5 w-3.5" /> RE-OPEN CHANNEL
            </button>
          </div>
        ) : (
          <form onSubmit={handleDispatch} className="space-y-4 font-sans text-xs">
            {formError && (
              <div className="bg-neon-red/10 border border-neon-red/35 p-3 rounded text-[11px] text-neon-red font-mono flex items-center gap-2 mb-2 animate-fadeIn">
                <AlertTriangle className="h-4 w-4" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">
                  IDENTIFIER NAME <span className="text-neon-cyan font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={sending}
                  className="w-full p-2.5 bg-cyber-black text-white text-xs border border-neutral-800 rounded font-mono outline-none focus:border-neon-cyan transition"
                  placeholder="e.g. Recruiter / Security Lead"
                  required
                  id="contact-name"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">
                  CONTACT MAIL TARGET <span className="text-neon-cyan font-bold">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={sending}
                  className="w-full p-2.5 bg-cyber-black text-white text-xs border border-neutral-800 rounded font-mono outline-none focus:border-neon-cyan transition"
                  placeholder="e.g. hiring@company.com"
                  required
                  id="contact-email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">
                SUBJECT PROTOCOL
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                disabled={sending}
                className="w-full p-2.5 bg-cyber-black text-white text-xs border border-neutral-800 rounded font-mono outline-none focus:border-neon-cyan transition"
                placeholder="e.g. Critical security role opportunity"
                id="contact-subject"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">
                TRANSMISSION MESSAGE BODY <span className="text-neon-cyan font-bold">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                disabled={sending}
                rows={4}
                className="w-full p-2.5 bg-cyber-black text-white text-xs border border-neutral-800 rounded font-mono outline-none focus:border-neon-cyan transition resize-none leading-relaxed"
                placeholder="Compose secure text content here..."
                required
                id="contact-message"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 bg-neon-cyan/15 hover:bg-neon-cyan/25 text-neon-cyan text-xs font-mono font-bold tracking-wider border border-neon-cyan/40 hover:border-neon-cyan rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer"
              id="submit-contact-btn"
            >
              {sending ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> DISPATCHING PAYLOADS...
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" /> SECURE TRANSMISSION DISPATCH
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Cyber logs output simulator on the side */}
      <div className="lg:col-span-5 flex flex-col justify-between font-mono bg-cyber-black/70 rounded-lg p-5 border border-neutral-800 relative select-none h-full min-h-[280px]" id="secure-logs-card">
        <div>
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3 text-[10px]">
            <span className="text-gray-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
              <Cpu className="h-3.5 w-3.5 text-neon-cyan" /> Secure Outbound Logs
            </span>
            <span className="text-neon-green font-bold">ENCRYPT_ACTIVE</span>
          </div>

          <div className="space-y-1.5 overflow-y-auto max-h-[220px] text-[11px] leading-relaxed select-text">
            {contactLogs.length === 0 ? (
              <div className="text-gray-500 italic py-6 text-center text-[10px]">
                No transmissions in register. Initialize typing in the gateway stream...
              </div>
            ) : (
              contactLogs.map((log, lIdx) => (
                <div
                  key={lIdx}
                  className={
                    log.type === 'system' ? 'text-purple-400' :
                    log.type === 'success' ? 'text-neon-green font-semibold' :
                    log.type === 'warn' ? 'text-neon-red font-semibold' :
                    'text-gray-400'
                  }
                >
                  {log.text}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="text-[9px] text-gray-500 text-right uppercase border-t border-neutral-900 pt-2.5 mt-4 flex items-center justify-between">
          <span>ALGORITHM: CRYPTO_RSA4096</span>
          <span>HOST: SEC_RELAY_4</span>
        </div>
      </div>
    </div>
  );
};
