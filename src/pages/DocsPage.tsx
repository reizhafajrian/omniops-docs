import React, { useState } from 'react';
import {
  Layers,
  Terminal,
  Webhook,
  Copy,
  Check,
  Key,
  BookOpen,
  Settings,
  Cpu,
  Shield,
  GitBranch,
  Package,
  Zap,
  AlertTriangle,
  Info,
  Download,
  Play,
  Activity,
  Code2,
  FileText,
  HelpCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface DocsPageProps {
  onGoToLanding: () => void;
}

type Section = 
  | 'getting-started'
  | 'installation'
  | 'cli-reference'
  | 'daemon-mode'
  | 'architecture'
  | 'stack-config'
  | 'git-auth'
  | 'registries'
  | 'webhooks'
  | 'resource-limits'
  | 'api-ref'
  | 'env-config'
  | 'troubleshooting'
  | 'license';

interface NavItem {
  id: Section;
  label: string;
  icon: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'getting-started', label: 'Overview & Concepts', icon: <BookOpen size={14} /> },
      { id: 'installation', label: 'Installation', icon: <Download size={14} /> },
      { id: 'cli-reference', label: 'CLI Reference', icon: <Terminal size={14} /> },
      { id: 'daemon-mode', label: 'Daemon / Background Mode', icon: <Play size={14} /> },
    ]
  },
  {
    title: 'Guides & Features',
    items: [
      { id: 'architecture', label: 'Architecture & Flow', icon: <Cpu size={14} /> },
      { id: 'stack-config', label: 'Stack Setup', icon: <Layers size={14} /> },
      { id: 'git-auth', label: 'Git Authentication', icon: <Key size={14} /> },
      { id: 'registries', label: 'Private Registries', icon: <Package size={14} /> },
      { id: 'webhooks', label: 'Webhooks & Auto-Deploy', icon: <Webhook size={14} /> },
      { id: 'resource-limits', label: 'CPU & RAM Tuning', icon: <Activity size={14} /> },
    ]
  },
  {
    title: 'Reference',
    items: [
      { id: 'env-config', label: 'Environment Config', icon: <Settings size={14} /> },
      { id: 'api-ref', label: 'REST & WebSocket API', icon: <Code2 size={14} /> },
      { id: 'troubleshooting', label: 'Troubleshooting', icon: <HelpCircle size={14} /> },
      { id: 'license', label: 'License', icon: <FileText size={14} /> },
    ]
  }
];

export const DocsPage: React.FC<DocsPageProps> = ({ onGoToLanding }) => {
  const [activeSection, setActiveSection] = useState<Section>('getting-started');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const CodeBlock = ({ code, id, language = 'bash' }: { code: string; id: string; language?: string }) => (
    <div className="relative group rounded-xl overflow-hidden border border-slate-800 bg-dark-950">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-dark-900/60">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{language}</span>
        <button
          onClick={() => handleCopy(code, id)}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-200 transition-colors"
        >
          {copiedId === id ? <><Check size={12} className="text-emerald-400" /><span className="text-emerald-400">Copied!</span></> : <><Copy size={12} /><span>Copy</span></>}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">{code}</pre>
    </div>
  );

  const Badge = ({ color, label }: { color: string; label: string }) => (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${color}`}>{label}</span>
  );

  const Alert = ({ type, children }: { type: 'info' | 'warning' | 'tip'; children: React.ReactNode }) => {
    const styles = {
      info: { border: 'border-blue-500/30', bg: 'bg-blue-500/5', icon: <Info size={14} className="text-blue-400 shrink-0 mt-0.5" />, title: 'Note', titleColor: 'text-blue-400' },
      warning: { border: 'border-amber-500/30', bg: 'bg-amber-500/5', icon: <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />, title: 'Warning', titleColor: 'text-amber-400' },
      tip: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', icon: <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />, title: 'Tip', titleColor: 'text-emerald-400' },
    };
    const s = styles[type];
    return (
      <div className={`flex gap-3 p-4 rounded-xl border ${s.border} ${s.bg}`}>
        {s.icon}
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className={`font-bold ${s.titleColor} mr-1`}>{s.title}:</span>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 font-sans flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-dark-950/90 backdrop-blur-md px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onGoToLanding}>
            <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-700 text-white shadow-lg shadow-brand-500/20">
              <Layers size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white font-sans">OmniOps Docs</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-brand-500/10 border border-brand-500/30 text-brand-300">v0.1</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onGoToLanding}
              className="px-3.5 py-1.5 text-xs font-semibold bg-dark-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl transition-all"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800/80 p-5 hidden md:block shrink-0 sticky top-[61px] h-[calc(100vh-61px)] overflow-y-auto">
          <nav className="space-y-6 text-xs font-medium">
            {navGroups.map(group => (
              <div key={group.title}>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2">{group.title}</span>
                <ul className="space-y-0.5">
                  {group.items.map(item => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center gap-2 ${
                          activeSection === item.id
                            ? 'bg-brand-500/15 text-brand-300 font-semibold border border-brand-500/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-dark-900'
                        }`}
                      >
                        <span className="opacity-60">{item.icon}</span>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-4xl space-y-10">

          {/* ── OVERVIEW ── */}
          {activeSection === 'getting-started' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Introduction</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Overview & Core Concepts</h1>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  <strong className="text-slate-200">OmniOps</strong> is a self-hosted, single-binary GitOps continuous deployment engine built in Rust.
                  It bridges the gap between your Git repository and your container runtime — whether that is Podman or Docker — without requiring
                  Kubernetes, Helm, or any heavyweight orchestration infrastructure.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <GitBranch size={18} className="text-brand-400" />, title: 'Git-Driven', desc: 'Your docker-compose.yml file in a Git repo is the single source of truth. No manual deployments.' },
                  { icon: <Zap size={18} className="text-amber-400" />, title: 'Instant Sync', desc: 'Detects new commits via polling or webhooks and reconciles container state within seconds.' },
                  { icon: <Package size={18} className="text-indigo-400" />, title: 'Podman-First', desc: 'Native Podman support with rootless containers for maximum security, plus full Docker compatibility.' },
                  { icon: <Shield size={18} className="text-emerald-400" />, title: 'Single Binary', desc: 'The entire engine ships as a single compiled Rust binary. No runtimes, no dependencies.' },
                ].map(f => (
                  <div key={f.title} className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
                    {f.icon}
                    <h3 className="text-sm font-bold text-slate-200">{f.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">How It Works</h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  OmniOps follows a simple reconciliation loop. Every N minutes (or instantly via a webhook), the engine
                  fetches the latest commit hash from your configured Git branch. If the hash differs from the last known
                  deployed hash stored in its SQLite database, it pulls the latest compose file, re-authenticates with any
                  private container registries, and runs <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300">podman compose up -d --pull always</code> to bring
                  your services to the desired state.
                </p>
                <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-3 font-mono text-xs">
                  {[
                    { color: 'text-brand-400', label: '[Git Repo]', sub: 'Your docker-compose.yml is the source of truth' },
                    { color: 'text-slate-500', label: '     ↓  Webhook push / poll interval' },
                    { color: 'text-indigo-400', label: '[OmniOps Engine]', sub: 'Diffs commit hash → pulls images → reconciles state' },
                    { color: 'text-slate-500', label: '     ↓  CLI / Socket API' },
                    { color: 'text-emerald-400', label: '[Podman / Docker Daemon]', sub: 'Runs containers as defined in your compose file' },
                    { color: 'text-slate-500', label: '     ↓  WebSocket stream' },
                    { color: 'text-purple-400', label: '[OmniOps Web UI]', sub: 'Live logs, metrics, topology graph at localhost:9090' },
                  ].map((row, i) => (
                    <div key={i} className={row.color}>
                      <span className="font-bold">{row.label}</span>
                      {row.sub && <span className="text-slate-500 font-sans ml-2">— {row.sub}</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Requirements</h2>
                <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2 text-xs font-mono">
                  {[
                    { status: true, item: 'macOS 12+, Ubuntu 20.04+, or any modern Linux distro' },
                    { status: true, item: 'Podman 4+ OR Docker 20+ (OmniOps can install Podman for you)' },
                    { status: true, item: 'Internet access for the initial binary download' },
                    { status: false, item: 'Kubernetes (NOT required)' },
                    { status: false, item: 'Docker Desktop (NOT required)' },
                    { status: false, item: 'Root / sudo for installation (runs rootless via Podman)' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-slate-300">
                      {r.status
                        ? <CheckCircle size={13} className="text-emerald-400 shrink-0" />
                        : <XCircle size={13} className="text-red-400 shrink-0" />}
                      <span className={r.status ? '' : 'line-through text-slate-600'}>{r.item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setActiveSection('installation')} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-brand-500 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity">
                  <Download size={15} /> Get Started → Installation
                </button>
              </div>
            </section>
          )}

          {/* ── INSTALLATION ── */}
          {activeSection === 'installation' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Setup</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Installation</h1>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  OmniOps ships as a single pre-compiled binary called <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">omni</code>.
                  The easiest way to install it is via the official install script which will detect your OS and architecture,
                  download the correct binary, and place it in <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">/usr/local/bin</code> automatically.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-1">Option 1: Install Script (Recommended)</h2>
                <p className="text-xs text-slate-500 mb-3">Works on macOS and Linux. Run this single command in your terminal:</p>
                <CodeBlock
                  id="install-script"
                  code={`curl -sSL https://raw.githubusercontent.com/reizhafajrian/omniops/main/scripts/install.sh | bash`}
                />
                <div className="mt-3">
                  <Alert type="tip">
                    The install script automatically detects your operating system (macOS Intel, macOS Apple Silicon, or Linux x86_64) and downloads the correct binary from the GitHub Releases page.
                  </Alert>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-1">Option 2: Manual Download</h2>
                <p className="text-xs text-slate-500 mb-3">Download the binary directly from GitHub Releases for your platform:</p>
                <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2 text-xs font-mono">
                  {[
                    { platform: 'macOS (Apple Silicon / M1+)', file: 'omni-aarch64-apple-darwin.tar.gz' },
                    { platform: 'macOS (Intel)', file: 'omni-x86_64-apple-darwin.tar.gz' },
                    { platform: 'Linux (x86_64)', file: 'omni-x86_64-unknown-linux-gnu.tar.gz' },
                    { platform: 'Windows (x86_64)', file: 'omni-x86_64-pc-windows-msvc.zip' },
                  ].map(p => (
                    <div key={p.platform} className="flex items-center justify-between py-1.5 border-b border-slate-800/60 last:border-0">
                      <span className="text-slate-300">{p.platform}</span>
                      <span className="text-brand-300 font-mono text-[11px] bg-dark-950 px-2 py-0.5 rounded">{p.file}</span>
                    </div>
                  ))}
                </div>
                <CodeBlock
                  id="install-manual"
                  code={`# After downloading, extract and install:
tar -xzf omni-aarch64-apple-darwin.tar.gz
chmod +x omni
sudo mv omni /usr/local/bin/omni

# Verify installation
omni --version`}
                />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Step 2: Install Container Engine</h2>
                <p className="text-sm text-slate-400 mb-3 leading-relaxed">
                  OmniOps requires either Podman or Docker to run containers. If you don't have one installed, let OmniOps do it for you.
                  We recommend <strong className="text-slate-200">Podman</strong> for its rootless security model.
                </p>
                <CodeBlock
                  id="install-engine"
                  code={`# Install Podman (recommended)
omni install --engine podman

# Or install Docker
omni install --engine docker

# Or install both
omni install --engine both`}
                />
                <div className="mt-3">
                  <Alert type="info">
                    The <code className="text-brand-300 font-mono">install</code> command automatically detects your OS and package manager (Homebrew on macOS, apt on Ubuntu/Debian, dnf on Fedora, pacman on Arch) and runs the appropriate installation commands.
                  </Alert>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Step 3: Start OmniOps</h2>
                <CodeBlock
                  id="start-first"
                  code={`# Start the server in the background (recommended for servers/SSH)
omni start

# Or in foreground mode for debugging
omni serve

# Open the web UI
open http://localhost:9090`}
                />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Uninstalling OmniOps</h2>
                <CodeBlock
                  id="uninstall"
                  code={`# Remove OmniOps only (keeps Podman/Docker intact)
omni uninstall

# Remove OmniOps AND wipe the container engine + all data
omni uninstall --deep-clean

# Target a specific engine for deep clean
omni uninstall --deep-clean --engine docker`}
                />
                <div className="mt-3">
                  <Alert type="warning">
                    <code className="text-amber-300 font-mono">--deep-clean</code> is destructive. It will stop and delete all Podman machines, remove all container images, delete all volumes, and wipe config directories (<code className="font-mono">~/.config/containers</code>, <code className="font-mono">~/.local/share/containers</code>). This cannot be undone.
                  </Alert>
                </div>
              </div>
            </section>
          )}

          {/* ── CLI REFERENCE ── */}
          {activeSection === 'cli-reference' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Reference</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">CLI Reference</h1>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  The <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">omni</code> binary is the single entrypoint for all OmniOps operations.
                  Run <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">omni --help</code> or <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">omni [command] --help</code> to see all available flags.
                </p>
              </div>

              <CodeBlock id="cli-help" code={`$ omni --help

Self-Hosted GitOps Engine for Podman & Docker

Usage: omni [COMMAND]

Commands:
  serve      Starts the OmniOps backend server (foreground)
  install    Installs a container engine (podman or docker)
  uninstall  Uninstalls OmniOps and optionally the container engine
  start      Starts the OmniOps server in the background (daemon mode)
  stop       Stops the background OmniOps server
  status     Shows the status of the background OmniOps server
  help       Print this message or the help of the given subcommand(s)

Options:
  -h, --help     Print help
  -V, --version  Print version`} language="text" />

              <div className="space-y-6">
                {[
                  {
                    cmd: 'omni serve',
                    badge: { color: 'bg-blue-500/20 text-blue-300', label: 'FOREGROUND' },
                    desc: 'Starts the OmniOps API server and web UI in the current terminal session. Logs stream directly to stdout. The process will be killed when you close the terminal or press Ctrl+C. Best used for local development and debugging.',
                    code: `omni serve

# With custom port
PORT=8080 omni serve

# With verbose logging
RUST_LOG=debug omni serve`,
                  },
                  {
                    cmd: 'omni install --engine <engine>',
                    badge: { color: 'bg-emerald-500/20 text-emerald-300', label: 'SETUP' },
                    desc: 'Installs the specified container engine using the system package manager. Supported values: podman, docker, both. The engine flag defaults to podman.',
                    code: `omni install --engine podman
omni install --engine docker
omni install --engine both`,
                  },
                  {
                    cmd: 'omni uninstall [--deep-clean] [--engine]',
                    badge: { color: 'bg-red-500/20 text-red-300', label: 'DESTRUCTIVE' },
                    desc: 'Removes OmniOps database, config files, temp directories, and the omni binary itself. Without --deep-clean, Podman/Docker and all your containers are left untouched. With --deep-clean, the engine and all its data are also wiped.',
                    code: `# Safe: Only removes OmniOps itself
omni uninstall

# Destructive: Remove OmniOps + Podman + all container data
omni uninstall --deep-clean

# Deep clean only Docker
omni uninstall --deep-clean --engine docker`,
                  },
                  {
                    cmd: 'omni --version',
                    badge: { color: 'bg-slate-500/20 text-slate-300', label: 'INFO' },
                    desc: 'Prints the current version of the omni binary.',
                    code: `$ omni --version
omni 0.1.0`,
                  },
                ].map(item => (
                  <div key={item.cmd} className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <code className="text-sm font-mono font-bold text-slate-100">{item.cmd}</code>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${item.badge.color}`}>{item.badge.label}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    <CodeBlock id={`cli-${item.cmd}`} code={item.code} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── DAEMON MODE ── */}
          {activeSection === 'daemon-mode' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Production</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Daemon / Background Mode</h1>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  When running OmniOps on a remote server over SSH, you need the process to survive after your SSH session ends.
                  The <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">omni start</code> command handles this by launching the
                  server as a detached background process using <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">nohup</code>,
                  which makes it immune to the <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">SIGHUP</code> signal sent when your SSH connection closes.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Starting the Daemon</h2>
                <CodeBlock
                  id="daemon-start"
                  code={`# Start in background (SSH-safe)
omni start

# Output:
# Starting OmniOps in the background...
# Server started successfully! (PID: 12345)
# Logs are being written to: /Users/you/.omniops.log`}
                />
                <Alert type="tip">
                  After running <code className="text-emerald-300 font-mono">omni start</code>, you can safely close your SSH session. The server will keep running and the web UI will remain accessible on port 9090.
                </Alert>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Checking Status</h2>
                <CodeBlock
                  id="daemon-status"
                  code={`omni status

# Possible outputs:
# OmniOps Status: RUNNING (PID: 12345)
# OmniOps Status: STOPPED
# OmniOps Status: STOPPED (stale PID file)`}
                />
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  The status command reads a PID file stored at <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">~/.omniops.pid</code> and
                  uses <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">kill -0</code> to verify the process is actually running (not just that a stale PID file exists from a previous crash).
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Viewing Logs</h2>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  When running in daemon mode, all stdout and stderr output is redirected to <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">~/.omniops.log</code>.
                </p>
                <CodeBlock
                  id="daemon-logs"
                  code={`# Stream logs in real-time (like tail -f)
tail -f ~/.omniops.log

# View last 100 lines
tail -n 100 ~/.omniops.log

# Search for errors
grep -i "error" ~/.omniops.log`}
                />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Stopping the Daemon</h2>
                <CodeBlock
                  id="daemon-stop"
                  code={`omni stop

# Output:
# Stopping OmniOps (PID: 12345)...
# Server stopped successfully.`}
                />
                <Alert type="info">
                  The stop command sends a graceful <code className="text-blue-300 font-mono">SIGTERM</code> signal to the process, giving it time to finish in-progress operations and flush logs before shutting down.
                </Alert>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">How PID Tracking Works</h2>
                <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-3 text-xs text-slate-400 leading-relaxed">
                  <p>When you run <code className="text-brand-300 font-mono">omni start</code>, the following happens:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>OmniOps checks if <code className="text-brand-300 font-mono">~/.omniops.pid</code> already exists (prevents double-starting).</li>
                    <li>It spawns a child process running <code className="text-brand-300 font-mono">nohup omni serve</code> with stdin closed and all output redirected to <code className="text-brand-300 font-mono">~/.omniops.log</code>.</li>
                    <li>The child process's PID is written to <code className="text-brand-300 font-mono">~/.omniops.pid</code>.</li>
                    <li>The parent process exits immediately, leaving the child running independently.</li>
                  </ol>
                </div>
              </div>
            </section>
          )}

          {/* ── ARCHITECTURE ── */}
          {activeSection === 'architecture' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Internals</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Architecture & Data Flow</h1>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  OmniOps is built in Rust using a strict Hexagonal Architecture (Ports and Adapters) pattern, separating domain logic from infrastructure concerns.
                  The backend is structured as a Cargo workspace with three crates.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Crate Structure</h2>
                <div className="space-y-3">
                  {[
                    { name: 'domain', color: 'text-brand-400', desc: 'Pure business logic. No Axum, no SQLx, no I/O. Contains use cases (sync_stack, deploy_stack), domain models (Stack, Container, SyncHistory), and repository trait definitions (ports). This crate has zero side effects.', tag: 'business logic' },
                    { name: 'infrastructure', color: 'text-indigo-400', desc: 'Implements the domain\'s repository traits using SQLite (via SQLx) and implements the container executor using Podman/Docker CLI commands. Also contains Git operations (via libgit2) and image registry authentication.', tag: 'data / I/O' },
                    { name: 'api', color: 'text-emerald-400', desc: 'The Axum HTTP/WebSocket server entry point. Defines all REST routes, WebSocket log streaming handlers, authentication middleware, and CLI argument parsing via Clap. Embeds the compiled React frontend using rust-embed for single-binary distribution.', tag: 'http / cli' },
                  ].map(c => (
                    <div key={c.name} className="p-4 rounded-2xl bg-dark-900 border border-slate-800">
                      <div className="flex items-center gap-2 mb-2">
                        <code className={`text-sm font-bold font-mono ${c.color}`}>{c.name}</code>
                        <span className="text-[10px] font-mono bg-dark-950 border border-slate-700 text-slate-400 px-2 py-0.5 rounded-full">{c.tag}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Reconciliation Loop</h2>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  Every stack has an independent background Tokio task that runs the reconciliation loop. This allows stacks with different poll intervals to operate truly concurrently without blocking each other.
                </p>
                <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
                  <div className="text-slate-500">// Per-stack reconciliation loop (simplified)</div>
                  <div>loop {'{'}</div>
                  <div className="pl-4">1. Fetch latest commit SHA from remote Git branch</div>
                  <div className="pl-4">2. Compare against <span className="text-brand-300">last_deployed_sha</span> in SQLite</div>
                  <div className="pl-4">3. If different:</div>
                  <div className="pl-8 text-emerald-400">a. Checkout new compose file to temp dir</div>
                  <div className="pl-8 text-emerald-400">b. Run registry docker/podman login commands</div>
                  <div className="pl-8 text-emerald-400">c. Execute <span className="text-white">podman compose up -d --pull always</span></div>
                  <div className="pl-8 text-emerald-400">d. Update <span className="text-brand-300">last_deployed_sha</span> and log sync record</div>
                  <div className="pl-4">4. Sleep for <span className="text-brand-300">poll_interval_seconds</span></div>
                  <div>{'}'}</div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Frontend Embedding</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The React frontend is compiled to static assets during the build process, then embedded directly into the Rust binary using the <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">rust-embed</code> crate.
                  This means there is no separate web server, no static file directory to manage — just the single <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">omni</code> binary serves both the API and the web UI.
                  Axum serves all <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">/api/*</code> requests to the REST handlers and falls back to serving the embedded <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">index.html</code> for all other routes (SPA support).
                </p>
              </div>
            </section>
          )}

          {/* ── STACK CONFIG ── */}
          {activeSection === 'stack-config' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Configuration</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Stack Setup</h1>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  A <strong className="text-slate-200">Stack</strong> is OmniOps's core unit of deployment. Each stack maps to a single
                  Git repository containing a <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">docker-compose.yml</code> file.
                  You can register multiple stacks (e.g. one for your backend, one for your frontend, one for your databases).
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Required Fields</h2>
                <div className="space-y-2">
                  {[
                    { field: 'Name', desc: 'A human-readable label for this stack (e.g. "production-api"). Must be unique.' },
                    { field: 'Repository URL', desc: 'The HTTPS URL of your Git repository (e.g. https://github.com/you/repo.git).' },
                    { field: 'Branch', desc: 'The Git branch to track. Typically main or production. OmniOps will watch this branch for new commits.' },
                    { field: 'Compose File Path', desc: 'The relative path to your docker-compose.yml inside the repo (e.g. docker-compose.yml or infra/compose.yml).' },
                  ].map(f => (
                    <div key={f.field} className="flex gap-4 p-3.5 rounded-xl bg-dark-900 border border-slate-800">
                      <code className="text-brand-300 font-mono text-xs shrink-0 w-36">{f.field}</code>
                      <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Sync Mode</h2>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  Each stack can independently choose how it receives deployment triggers:
                </p>
                <div className="space-y-3">
                  {[
                    { mode: 'poll', color: 'text-brand-400', desc: 'OmniOps polls the Git remote on a configurable interval (e.g. every 60 seconds) and deploys if the commit SHA has changed. Simple and works behind firewalls.' },
                    { mode: 'webhook', color: 'text-emerald-400', desc: 'A secret token is generated for each stack. Register the webhook URL in GitHub/GitLab to trigger instant deploys on every push. Zero polling overhead.' },
                    { mode: 'both', color: 'text-indigo-400', desc: 'Combines webhook triggers with a polling fallback. Best of both worlds — instant deploys when webhooks work, with polling as a safety net.' },
                  ].map(m => (
                    <div key={m.mode} className="p-4 rounded-2xl bg-dark-900 border border-slate-800 flex gap-4">
                      <code className={`text-sm font-bold font-mono ${m.color} shrink-0 w-20`}>{m.mode}</code>
                      <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── GIT AUTH ── */}
          {activeSection === 'git-auth' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Security</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Git Authentication</h1>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  OmniOps supports both public and private Git repositories. For private repos, you provide a Personal Access Token (PAT)
                  which is stored encrypted in the local SQLite database and injected into HTTPS clone URLs at runtime.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">GitHub PAT Token</h2>
                <ol className="space-y-3 text-xs text-slate-400 leading-relaxed list-decimal pl-5">
                  <li>Go to <code className="text-brand-300">GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)</code></li>
                  <li>Click <strong className="text-slate-200">Generate new token</strong></li>
                  <li>Select scope: <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">repo</code> (for private repos)</li>
                  <li>Copy the generated token</li>
                  <li>Paste it into the <strong className="text-slate-200">Git Token</strong> field when creating/editing a stack in OmniOps</li>
                </ol>
                <div className="mt-4">
                  <Alert type="tip">
                    For fine-grained PATs, the minimum required permission is <strong>Contents: Read-only</strong> on your repository.
                  </Alert>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">GitLab PAT Token</h2>
                <ol className="space-y-3 text-xs text-slate-400 leading-relaxed list-decimal pl-5">
                  <li>Go to <code className="text-brand-300">GitLab → Preferences → Access Tokens</code></li>
                  <li>Create a token with <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">read_repository</code> scope</li>
                  <li>Paste it into the <strong className="text-slate-200">Git Token</strong> field in OmniOps</li>
                </ol>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">How It Works</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  OmniOps injects the token using HTTP Basic Auth in the clone URL format:
                </p>
                <CodeBlock
                  id="git-auth-url"
                  code={`# OmniOps internally transforms:
https://github.com/you/private-repo.git

# Into:
https://oauth2:{YOUR_TOKEN}@github.com/you/private-repo.git`}
                />
                <Alert type="info">
                  Your PAT token is stored in the local SQLite database and never sent anywhere except to your own Git server. OmniOps does not have any cloud connectivity.
                </Alert>
              </div>
            </section>
          )}

          {/* ── REGISTRIES ── */}
          {activeSection === 'registries' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Container Images</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Private Container Registries</h1>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  If your <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">docker-compose.yml</code> references private images (e.g. from Google Artifact Registry, GitHub Container Registry, or AWS ECR),
                  OmniOps will automatically authenticate before pulling them during each deployment.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  { name: 'Google Artifact Registry (GAR / GCR)', color: 'text-blue-400', fields: [{ k: 'Registry Host', v: 'asia-docker.pkg.dev (or your region)' }, { k: 'Username', v: '_json_key' }, { k: 'Password', v: 'Paste the full contents of your Service Account JSON key file' }], note: 'Create a GCP Service Account with the Artifact Registry Reader role, then download and create a JSON key.' },
                  { name: 'GitHub Container Registry (GHCR)', color: 'text-slate-300', fields: [{ k: 'Registry Host', v: 'ghcr.io' }, { k: 'Username', v: 'Your GitHub username or org name' }, { k: 'Password', v: 'GitHub PAT Token with read:packages scope' }], note: null },
                  { name: 'AWS Elastic Container Registry (ECR)', color: 'text-amber-400', fields: [{ k: 'Registry Host', v: '123456789.dkr.ecr.us-east-1.amazonaws.com' }, { k: 'Username', v: 'AWS' }, { k: 'Password', v: 'Output of: aws ecr get-login-password --region us-east-1' }], note: 'ECR tokens expire after 12 hours. You may need to refresh the credential in OmniOps periodically.' },
                  { name: 'Docker Hub', color: 'text-cyan-400', fields: [{ k: 'Registry Host', v: 'docker.io' }, { k: 'Username', v: 'Your Docker Hub username' }, { k: 'Password', v: 'Docker Hub Access Token (from Account Settings)' }], note: null },
                ].map(r => (
                  <div key={r.name} className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-3">
                    <h3 className={`text-sm font-bold font-mono ${r.color}`}>{r.name}</h3>
                    <div className="space-y-1.5">
                      {r.fields.map(f => (
                        <div key={f.k} className="flex gap-3 text-xs">
                          <span className="text-slate-500 w-28 shrink-0">{f.k}:</span>
                          <code className="text-slate-300 font-mono">{f.v}</code>
                        </div>
                      ))}
                    </div>
                    {r.note && <Alert type="info">{r.note}</Alert>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── WEBHOOKS ── */}
          {activeSection === 'webhooks' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Automation</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Webhooks & Auto-Deploy</h1>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  Webhooks allow OmniOps to deploy instantly when you push to Git, instead of waiting for the next poll cycle.
                  Each stack gets a unique secret token. When your Git provider sends a POST request to the webhook URL,
                  OmniOps immediately triggers a sync for that stack.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Webhook URL Format</h2>
                <CodeBlock id="webhook-url" code={`POST http://your-server:9090/api/webhooks/{YOUR_SECRET_TOKEN}`} />
                <p className="text-xs text-slate-400 mt-2">
                  Replace <code className="text-brand-300 font-mono">your-server</code> with your server's IP or domain name,
                  and <code className="text-brand-300 font-mono">{'{YOUR_SECRET_TOKEN}'}</code> with the token shown in the stack settings.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Setting Up on GitHub</h2>
                <ol className="space-y-3 text-xs text-slate-400 leading-relaxed list-decimal pl-5">
                  <li>Open your GitHub repository → <strong className="text-slate-200">Settings → Webhooks → Add webhook</strong></li>
                  <li>Set <strong className="text-slate-200">Payload URL</strong> to your OmniOps webhook URL</li>
                  <li>Set <strong className="text-slate-200">Content type</strong> to <code className="bg-dark-900 px-1 rounded text-brand-300 font-mono">application/json</code></li>
                  <li>Leave <strong className="text-slate-200">Secret</strong> blank (the token is in the URL)</li>
                  <li>Select <strong className="text-slate-200">Just the push event</strong></li>
                  <li>Click <strong className="text-slate-200">Add webhook</strong></li>
                </ol>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Setting Up on GitLab</h2>
                <ol className="space-y-3 text-xs text-slate-400 leading-relaxed list-decimal pl-5">
                  <li>Open your GitLab project → <strong className="text-slate-200">Settings → Webhooks</strong></li>
                  <li>Set <strong className="text-slate-200">URL</strong> to your OmniOps webhook URL</li>
                  <li>Check <strong className="text-slate-200">Push events</strong></li>
                  <li>Optionally specify the branch filter to match your tracked branch</li>
                  <li>Click <strong className="text-slate-200">Add webhook</strong></li>
                </ol>
              </div>
            </section>
          )}

          {/* ── RESOURCE LIMITS ── */}
          {activeSection === 'resource-limits' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Performance</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">CPU & RAM Tuning</h1>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  OmniOps lets you dynamically adjust the CPU and memory limits of individual containers at runtime from the Stack Detail dashboard.
                  This uses <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">podman update</code> (or <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">docker update</code>) under the hood,
                  meaning changes take effect immediately without needing to restart the container.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Available Presets</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'CPU Cores', values: ['0.25', '0.5', '1.0', '2.0', '4.0'] },
                    { label: 'Memory', values: ['128M', '256M', '512M', '1G', '2G'] },
                  ].map(g => (
                    <div key={g.label} className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-300">{g.label}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {g.values.map(v => <span key={v} className="px-2 py-0.5 rounded bg-dark-950 border border-slate-700 text-xs font-mono text-brand-300">{v}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Alert type="warning">
                Resource limits set via the UI are applied to the running container only. If the container is restarted by OmniOps (e.g. due to a new deployment), limits will revert to those defined in your <code className="text-amber-300 font-mono">docker-compose.yml</code>. To make limits permanent, set them in the compose file itself using the <code className="text-amber-300 font-mono">deploy.resources.limits</code> key.
              </Alert>
            </section>
          )}

          {/* ── ENV CONFIG ── */}
          {activeSection === 'env-config' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Configuration</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Environment Configuration</h1>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  OmniOps is configured entirely through environment variables. Create a <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">.env</code> file
                  in the same directory where you run <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">omni serve</code> or <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">omni start</code>.
                </p>
              </div>

              <CodeBlock id="env-file" language=".env" code={`# Server
PORT=9090
HOST=0.0.0.0

# Authentication
GITOPS_TOKEN=your-secret-api-token-here

# Database
DATABASE_URL=sqlite:./omniops.db

# Stacks config file (optional)
STACKS_CONFIG_PATH=./stacks.yml

# Logging
RUST_LOG=info      # options: error, warn, info, debug, trace`} />

              <div className="space-y-3">
                {[
                  { var: 'PORT', default: '9090', desc: 'The TCP port the HTTP server listens on.' },
                  { var: 'HOST', default: '0.0.0.0', desc: 'The network interface to bind to. Use 127.0.0.1 to restrict access to localhost only.' },
                  { var: 'GITOPS_TOKEN', default: '(required)', desc: 'The secret bearer token required for all API requests and web UI login. Keep this secret.' },
                  { var: 'DATABASE_URL', default: 'sqlite:./omniops.db', desc: 'SQLite database file path. All stack configurations, sync history, and registry credentials are stored here.' },
                  { var: 'RUST_LOG', default: 'info', desc: 'Log verbosity level. Set to debug to see detailed request and reconciliation logs.' },
                ].map(e => (
                  <div key={e.var} className="flex gap-4 p-3.5 rounded-xl bg-dark-900 border border-slate-800">
                    <div className="shrink-0 w-40">
                      <code className="text-brand-300 font-mono text-xs">{e.var}</code>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">default: {e.default}</div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{e.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── API REF ── */}
          {activeSection === 'api-ref' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Developer</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">REST & WebSocket API</h1>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  All API endpoints are served at <code className="bg-dark-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">http://localhost:9090/api</code>.
                  Every request must include the authentication header:
                </p>
                <CodeBlock id="api-auth" code={`Authorization: Bearer YOUR_GITOPS_TOKEN`} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Stacks</h2>
                <div className="space-y-2">
                  {[
                    { method: 'GET', path: '/api/stacks', color: 'bg-emerald-500/20 text-emerald-300', desc: 'Returns a list of all registered stacks including their sync status and last deployed commit SHA.' },
                    { method: 'POST', path: '/api/stacks', color: 'bg-brand-500/20 text-brand-300', desc: 'Registers a new stack. Body: { name, repo_url, branch, compose_file_path, sync_mode, poll_interval_seconds }.' },
                    { method: 'GET', path: '/api/stacks/:id', color: 'bg-emerald-500/20 text-emerald-300', desc: 'Returns full detail for a single stack including all services and recent sync history.' },
                    { method: 'PUT', path: '/api/stacks/:id', color: 'bg-amber-500/20 text-amber-300', desc: 'Updates a stack\'s configuration. Triggers an immediate re-sync.' },
                    { method: 'DELETE', path: '/api/stacks/:id', color: 'bg-red-500/20 text-red-300', desc: 'Removes a stack from tracking. Does NOT stop running containers.' },
                    { method: 'POST', path: '/api/stacks/:id/sync', color: 'bg-brand-500/20 text-brand-300', desc: 'Manually triggers an immediate sync for the stack regardless of poll interval.' },
                  ].map(e => (
                    <div key={e.path} className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 space-y-1.5">
                      <div className="flex items-center gap-2.5 font-mono text-xs">
                        <Badge color={e.color} label={e.method} />
                        <span className="text-slate-200">{e.path}</span>
                      </div>
                      <p className="text-xs text-slate-500 pl-14 leading-relaxed">{e.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">WebSocket: Log Streaming</h2>
                <CodeBlock id="api-ws" code={`ws://localhost:9090/api/logs/{stack_id}?container={container_name}

# Example
ws://localhost:9090/api/logs/abc123?container=my-api`} />
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Streams real-time container log output over a WebSocket connection. Each message is a UTF-8 string containing one line of log output.
                  The connection closes automatically when the container stops.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">Webhook Trigger</h2>
                <CodeBlock id="api-webhook" code={`POST /api/webhooks/{secret_token}

# No body or authentication header required.
# The secret token in the URL is the auth mechanism.
# OmniOps will immediately trigger a sync for the matching stack.`} />
              </div>
            </section>
          )}

          {/* ── TROUBLESHOOTING ── */}
          {activeSection === 'troubleshooting' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Help</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Troubleshooting</h1>
              </div>

              <div className="space-y-6">
                {[
                  {
                    q: 'omni: command not found after installation',
                    a: 'The binary was installed to ~/.cargo/bin or /usr/local/bin but your shell\'s PATH does not include it. Run:',
                    code: `# Add to your ~/.zshrc or ~/.bashrc
export PATH="$HOME/.cargo/bin:$PATH"

# Then reload your shell
source ~/.zshrc`,
                  },
                  {
                    q: 'Server stops when I close my SSH session',
                    a: 'Use omni start instead of omni serve. The start command uses nohup to detach from your terminal session.',
                    code: `omni start   # SSH-safe, keeps running after disconnect
omni serve   # Foreground only, dies when terminal closes`,
                  },
                  {
                    q: 'Failed to connect to Podman socket',
                    a: 'The Podman socket service may not be running. On Linux (systemd), start the user socket service:',
                    code: `systemctl --user enable --now podman.socket
systemctl --user status podman.socket`,
                  },
                  {
                    q: 'Cannot pull image: manifest unknown',
                    a: 'This usually means the image tag does not exist in the registry, or your registry credentials are incorrect/expired. Check the sync logs for the exact error message.',
                    code: `# View daemon logs for details
tail -f ~/.omniops.log | grep -i "error"`,
                  },
                  {
                    q: 'Web UI shows 401 Unauthorized',
                    a: 'The GITOPS_TOKEN in your .env file does not match what you are entering in the login screen. Check your .env file:',
                    code: `cat .env | grep GITOPS_TOKEN`,
                  },
                ].map(item => (
                  <div key={item.q} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <HelpCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <h3 className="text-sm font-bold text-slate-200">{item.q}</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-5">{item.a}</p>
                    {item.code && <div className="pl-5"><CodeBlock id={`trouble-${item.q}`} code={item.code} /></div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── LICENSE ── */}
          {activeSection === 'license' && (
            <section className="space-y-8">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Legal</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">License</h1>
              </div>

              <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
                <h2 className="text-lg font-bold text-slate-200">Non-Commercial & Internal Business Use License</h2>
                <p>Copyright (c) 2024 Reizha Fajrian</p>
                <p>
                  This software is provided for personal, educational, and internal business use. You and your company may use this software internally to deploy and manage your own applications.
                </p>
                <h3 className="text-base font-bold text-slate-200 mt-6">Restrictions</h3>
                <p>However, you may not use this software to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Sell the software or offer it as part of a commercial product.</li>
                  <li>Offer the software as a paid SaaS (Software-as-a-Service), managed service, or subscription to third parties.</li>
                  <li>Resell or distribute the software for direct profit.</li>
                </ul>
                <div className="p-4 rounded-xl border border-slate-800 bg-dark-900 mt-6 text-xs text-slate-500 font-mono">
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                  SOFTWARE.
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
