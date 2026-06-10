import express, { Request, Response } from 'express';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());

// Log folder and file setup for contacts
const CONTACTS_FILE = path.join(__dirname, 'contacts.json');

// Ensure contacts file exists
if (!fs.existsSync(CONTACTS_FILE)) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2));
}

// In-memory telemetry log history for cyber feel
interface TelemetryLog {
  timestamp: string;
  type: 'info' | 'success' | 'warn' | 'system';
  message: string;
}

const logHistory: TelemetryLog[] = [
  { timestamp: new Date().toISOString(), type: 'system', message: 'SecOps Kernel initialized' },
  { timestamp: new Date().toISOString(), type: 'info', message: 'Gated interface listening' }
];

// Helper to push a new system log
const addSystemLog = (message: string, type: 'info' | 'success' | 'warn' | 'system' = 'info') => {
  const log: TelemetryLog = {
    timestamp: new Date().toISOString(),
    type,
    message
  };
  logHistory.push(log);
  if (logHistory.length > 30) {
    logHistory.shift(); // keep last 30 logs
  }
  // Broadcast to all active SSE clients
  broadcastMetrics();
};

// SSE active clients
let sseClients: Response[] = [];

// Helper to get server metrics
const getServerMetrics = () => {
  const uptime = Math.floor(process.uptime());
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const memoryUsage = process.memoryUsage().heapUsed;
  const memoryPercentage = Math.round(((totalMem - freeMem) / totalMem) * 100);
  
  // Calculate CPU load average (1 min)
  const cpus = os.cpus();
  const cpuModel = cpus.length > 0 ? cpus[0].model : 'Generic CPU';
  const loadAvg = os.loadavg()[0]; // 1-minute load average
  
  // Total request count tracking
  const totalRequests = requestCounter;

  return {
    uptime,
    memoryUsage: (memoryUsage / (1024 * 1024)).toFixed(2) + ' MB',
    memoryPercentage,
    cpuModel,
    cpuUsage: (loadAvg * 100 / cpus.length).toFixed(1) + '%',
    activeSessions: sseClients.length,
    totalRequests,
    recentLogs: logHistory
  };
};

// Broadcast metrics to all connected clients
const broadcastMetrics = () => {
  const metricsData = JSON.stringify(getServerMetrics());
  sseClients.forEach(client => {
    client.write(`data: ${metricsData}\n\n`);
  });
};

// Middleware to count requests and log them
let requestCounter = 0;
app.use((req, res, next) => {
  if (!req.path.startsWith('/api/metrics')) {
    requestCounter++;
    // Add dynamic log of incoming request for cyber theme
    const userAgentShort = req.headers['user-agent'] ? req.headers['user-agent'].split(' ')[0] : 'UnknownUA';
    addSystemLog(`INBOUND: ${req.method} ${req.path} from ${req.ip} (${userAgentShort})`, 'info');
  }
  next();
});

// Serve compiled static assets
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// API: Healthcheck
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'HEALTHY', timestamp: new Date().toISOString() });
});

// API: Secure Contact submission
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    addSystemLog('ALERT: Incomplete contact dispatch received', 'warn');
    res.status(400).json({ error: 'Validation failed: Name, email, and message are required.' });
    return;
  }

  try {
    const fileData = fs.readFileSync(CONTACTS_FILE, 'utf8');
    const contacts = JSON.parse(fileData);
    
    const newSubmission = {
      id: `contact_${Date.now()}`,
      name,
      email,
      subject: subject || 'No Subject Protocol Specified',
      message,
      timestamp: new Date().toISOString()
    };

    contacts.push(newSubmission);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));

    addSystemLog(`DISPATCH COMPLETED: Encrypted payload from ${name.toUpperCase()} written to logs`, 'success');
    res.json({ success: true, messageId: newSubmission.id });
  } catch (error) {
    addSystemLog(`CRITICAL: Failed to write contact dispatch: ${(error as Error).message}`, 'warn');
    res.status(500).json({ error: 'Server error processing the request payload.' });
  }
});

// API: SSE Live telemetry stream
app.get('/api/metrics/live', (req: Request, res: Response) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    // Enable CORS for development environment
    'Access-Control-Allow-Origin': '*'
  });

  // Send initial metrics snapshot
  const initialData = JSON.stringify(getServerMetrics());
  res.write(`data: ${initialData}\n\n`);

  // Add to clients list
  sseClients.push(res);
  addSystemLog(`NODE CONNECTED: Gated session node #${sseClients.length} established`, 'system');

  // Handle client disconnection
  req.on('close', () => {
    sseClients = sseClients.filter(client => client !== res);
    addSystemLog(`NODE DISCONNECTED: Session closed. Active nodes: ${sseClients.length}`, 'system');
  });
});

// SSE interval heartbeat
setInterval(() => {
  broadcastMetrics();
}, 3000);

// Fallback: Serve React client app index for single-page routing
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Run server
app.listen(PORT, () => {
  console.log(`[SECURE SERVER ACTIVE] Routing operational on port ${PORT}`);
});
