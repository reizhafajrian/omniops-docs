import React, { useState } from 'react';
import {
  Layers,
  Zap,
  Terminal,
  Webhook,
  ArrowRight,
  BookOpen,
  Copy,
  Check,
  Server,
  Activity,
  Sliders,
  Lock,
  GitBranch,
  RefreshCw,
  BarChart2,
  Clock,
  Network
} from 'lucide-react';

interface LandingPageProps {
  onGoToDocs: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGoToDocs }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeTab, setActiveTab] = useState<'gitops' | 'telemetry' | 'webhooks' | 'limits' | 'topology'>('gitops');

  const quickstartCmd = 'curl -sSL https://raw.githubusercontent.com/reizhafajrian/omniops/main/scripts/install.sh | bash';

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(quickstartCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 font-sans selection:bg-brand-500 selection:text-white flex flex-col">
      {/* Top Announcement Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2 shadow-md">
        <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono uppercase tracking-wider">v1.0 Release</span>
        <span>OmniOps GitOps Engine for Podman & Docker is Live!</span>
        <button onClick={onGoToDocs} className="underline hover:text-slate-200 ml-1">Read Docs &rarr;</button>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-dark-950/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.hash = '#/'}>
            <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-700 text-white shadow-lg shadow-brand-500/25">
              <Layers size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white font-sans">
                OmniOps
              </h1>
              <p className="text-[11px] text-slate-400 font-mono">
                GitOps Engine for Podman & Docker
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
            <a href="#features" className="hover:text-slate-100 transition-colors">Features</a>
            <a href="#architecture" className="hover:text-slate-100 transition-colors">Architecture</a>
            <button onClick={onGoToDocs} className="hover:text-slate-100 transition-colors flex items-center gap-1">
              <BookOpen size={14} /> Documentation
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onGoToDocs}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-lg shadow-brand-600/30 transition-all active:scale-95"
            >
              <BookOpen size={14} />
              <span>Explore Docs</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-mono mb-6 shadow-inner">
            <Zap size={14} className="text-brand-400 animate-pulse" />
            <span>Declarative Podman & Docker GitOps Control Plane</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-[1.15] font-sans">
            Continuous Deployment for <br />
            <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Podman & Docker Compose Stacks
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
            OmniOps automatically reconciles your Podman & Docker Compose configurations with Git.
            Includes live CPU/RAM telemetry, private registry auth, custom <code>.env</code> management, and real-time Webhook triggers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={onGoToDocs}
              className="px-6 py-3 text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-xl shadow-brand-600/30 transition-all flex items-center gap-2 group active:scale-95"
            >
              <span>Get Started Guide</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quickstart Command Widget */}
          <div className="max-w-2xl mx-auto glass-panel p-3.5 rounded-2xl border border-slate-800 bg-dark-900/90 shadow-2xl flex items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 overflow-x-auto text-slate-300 select-all">
              <span className="text-brand-400 font-bold">$</span>
              <span className="truncate">{quickstartCmd}</span>
            </div>
            <button
              onClick={handleCopyCmd}
              className="px-3 py-1.5 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-300 hover:bg-brand-500/20 transition-all flex items-center gap-1.5 shrink-0 font-medium"
            >
              {copiedCmd ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Feature Demo */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <div className="glass-panel border border-slate-800 rounded-3xl p-6 sm:p-8 bg-dark-900/90 shadow-2xl overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
            <div>
              <span className="text-xs font-mono text-brand-400 font-semibold uppercase tracking-wider block mb-1">Interactive Showcase</span>
              <h2 className="text-xl font-bold text-slate-100">Control Plane Features</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('gitops')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
                  activeTab === 'gitops'
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                    : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <RefreshCw size={14} /> Git Sync
              </button>
              <button
                onClick={() => setActiveTab('telemetry')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
                  activeTab === 'telemetry'
                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                    : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart2 size={14} /> CPU/RAM Stats
              </button>
              <button
                onClick={() => setActiveTab('webhooks')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
                  activeTab === 'webhooks'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Webhook size={14} /> Webhooks
              </button>
              <button
                onClick={() => setActiveTab('limits')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
                  activeTab === 'limits'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                    : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sliders size={14} /> Runtime Limits
              </button>
              <button
                onClick={() => setActiveTab('topology')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
                  activeTab === 'topology'
                    ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                    : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Network size={14} /> Topology DAG
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-dark-950 border border-slate-800 font-mono text-xs">
            {activeTab === 'gitops' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-slate-100 text-sm">Stack: production-web-api</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">Synced</span>
                  </div>
                  <span className="text-slate-500 flex items-center gap-1.5"><Clock size={12} /> Next Poll: 42s</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
                  <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Tracked Branch</span>
                    <span className="text-brand-400 font-bold flex items-center gap-1"><GitBranch size={12} /> main</span>
                  </div>
                  <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Compose Path</span>
                    <span className="text-indigo-400 font-bold">docker-compose.yml</span>
                  </div>
                  <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Last Commit</span>
                    <span className="text-slate-200 font-bold">a7f82b1</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'telemetry' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-200 text-sm">Live Container Resource Telemetry</span>
                  <span className="text-emerald-400 text-[11px] flex items-center gap-1"><Activity size={12} strokeWidth={2.5} /> Real-time Docker Stats</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                    <div className="flex justify-between font-bold text-slate-200">
                      <span>app_web (Nginx Frontend)</span>
                      <span className="text-brand-400">CPU: 0.12%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-full w-[12%]" />
                    </div>
                    <span className="text-slate-400 text-[11px]">RAM: 42.1 MiB / 512 MiB (8.2%)</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                    <div className="flex justify-between font-bold text-slate-200">
                      <span>app_db (PostgreSQL 16)</span>
                      <span className="text-emerald-400">CPU: 1.45%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[32%]" />
                    </div>
                    <span className="text-slate-400 text-[11px]">RAM: 164.8 MiB / 2 GiB (16.0%)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'webhooks' && (
              <div className="space-y-3">
                <span className="font-bold text-slate-200 text-sm block">Instant GitHub / GitLab Webhook Endpoint</span>
                <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between text-indigo-300">
                  <span className="truncate">POST https://api.gitops.internal/api/webhooks/9f8a2b3c4d5e6f7a8b9c0d1e2f3a4b5c</span>
                  <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 font-bold shrink-0">Auto-Deploy</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  When code is pushed to your Git repository, GitHub hits this Webhook URL to trigger zero-downtime deployment instantly!
                </p>
              </div>
            )}

            {activeTab === 'limits' && (
              <div className="space-y-3">
                <span className="font-bold text-slate-200 text-sm block">Runtime Container CPU & Memory Tuning</span>
                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 grid grid-cols-2 gap-3 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px]">CPU Limit</span>
                    <span className="text-brand-400 font-bold text-sm">--cpus 1.5 (1.5 Cores)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">RAM Limit</span>
                    <span className="text-purple-400 font-bold text-sm">--memory 1g (1 GB Max)</span>
                  </div>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Executes <code>podman update</code> live on running containers without restarting processes or dropping client connections.
                </p>
              </div>
            )}

            {activeTab === 'topology' && (
              <div className="space-y-3">
                <span className="font-bold text-slate-200 text-sm block">Dynamic Service Topology Visualization</span>
                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 grid grid-cols-3 gap-3 text-slate-300 items-center justify-center text-center">
                  <div className="p-2 border border-slate-700 rounded-lg bg-dark-950">App Backend</div>
                  <div className="text-orange-400 font-bold">→ depends_on →</div>
                  <div className="p-2 border border-slate-700 rounded-lg bg-dark-950">PostgreSQL DB</div>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Automatically parses <code>depends_on</code> in your compose file to visualize the Directed Acyclic Graph (DAG) of your services architecture.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Grid of Key Features */}
      <section id="features" className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-brand-400 font-bold uppercase tracking-wider block mb-2">Designed for Developers & DevOps</span>
          <h2 className="text-3xl font-black text-slate-100 tracking-tight font-sans">
            Everything You Need for Production GitOps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-dark-900/80 hover:border-slate-700 transition-all space-y-3">
            <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 w-fit">
              <Zap size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-sans">Declarative Reconciliation</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Continuous background polling engine written in Rust. Detects git commits and automatically synchronizes Docker Compose states.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-dark-900/80 hover:border-slate-700 transition-all space-y-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-fit">
              <Activity size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-sans">Live CPU & RAM Telemetry</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Inspect real-time CPU %, RAM memory usage, mounted storage volume mounts, and Docker networks for every container.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-dark-900/80 hover:border-slate-700 transition-all space-y-3">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 w-fit">
              <Lock size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-sans">Private Container Registries</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Native authentication with Google Artifact Registry (GCR), GHCR, AWS ECR, and DockerHub using isolated secret credentials.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-dark-900/80 hover:border-slate-700 transition-all space-y-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit">
              <Webhook size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-sans">Instant Webhook Triggers</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Auto-generate unique Webhook URLs and secret keys to trigger instant deployments from GitHub Actions, GitLab CI, or Gitea.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-dark-900/80 hover:border-slate-700 transition-all space-y-3">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit">
              <Sliders size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-sans">Runtime Limits Tuning</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Adjust max CPU cores and memory limits dynamically at runtime via <code>docker update</code> directly from the web interface.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-dark-900/80 hover:border-slate-700 transition-all space-y-3">
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 w-fit">
              <Terminal size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-sans">Web Shell & Log Stream</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Stream container logs via WebSockets and execute commands inside running containers directly through the web terminal shell.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-16 px-6 max-w-6xl mx-auto w-full">
        <div className="glass-panel border border-slate-800 rounded-3xl p-8 bg-dark-900/80 shadow-2xl">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-brand-400 font-bold uppercase tracking-wider block mb-2">High-Performance Hexagonal Architecture</span>
            <h2 className="text-2xl font-black text-slate-100 font-sans">How OmniOps Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center font-mono text-xs">
            <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
              <GitBranch size={24} className="mx-auto text-brand-400" />
              <h4 className="font-bold text-slate-200">1. Git Push / Webhook</h4>
              <p className="text-[11px] text-slate-500 font-sans">GitHub, GitLab, or Gitea repository receives new commit</p>
            </div>

            <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
              <Layers size={24} className="mx-auto text-indigo-400" />
              <h4 className="font-bold text-slate-200">2. Rust Engine</h4>
              <p className="text-[11px] text-slate-500 font-sans">Validates compose spec & checks state in SQLite</p>
            </div>

            <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
              <Lock size={24} className="mx-auto text-purple-400" />
              <h4 className="font-bold text-slate-200">3. Registry Auth</h4>
              <p className="text-[11px] text-slate-500 font-sans">Authenticates with GCP, GHCR, or DockerHub</p>
            </div>

            <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
              <Server size={24} className="mx-auto text-emerald-400" />
              <h4 className="font-bold text-slate-200">4. Podman / Docker Daemon</h4>
              <p className="text-[11px] text-slate-500 font-sans">Applies zero-downtime <code>compose up -d</code></p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-dark-950 py-8 px-6 text-xs text-slate-500 font-sans">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-brand-400" />
            <span className="font-bold text-slate-300">OmniOps GitOps Engine</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onGoToDocs} className="hover:text-slate-300 transition-colors">Documentation</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
