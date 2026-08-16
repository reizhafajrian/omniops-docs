import React, { useState } from 'react';
import {
  Layers,
  Terminal,
  Webhook,
  Copy,
  Check,
  Key
} from 'lucide-react';

interface DocsPageProps {
  onGoToLanding: () => void;
}

export const DocsPage: React.FC<DocsPageProps> = ({ onGoToLanding }) => {
  const [activeSection, setActiveSection] = useState<string>('getting-started');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 font-sans flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Top Docs Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-dark-950/90 backdrop-blur-md px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onGoToLanding}>
            <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-700 text-white shadow-lg shadow-brand-500/20">
              <Layers size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white font-sans">
                  DockOps Docs
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-brand-500/10 border border-brand-500/30 text-brand-300">
                  v1.0
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onGoToLanding}
              className="px-3.5 py-1.5 text-xs font-semibold bg-dark-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl transition-all"
            >
              Landing Page
            </button>
          </div>
        </div>
      </header>

      {/* Docs Body Layout */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 border-r border-slate-800/80 p-6 hidden md:block shrink-0 sticky top-[61px] h-[calc(100vh-61px)] overflow-y-auto">
          <nav className="space-y-6 text-xs font-medium">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2">Getting Started</span>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveSection('getting-started')}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                      activeSection === 'getting-started'
                        ? 'bg-brand-500/15 text-brand-300 font-semibold border border-brand-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-dark-900'
                    }`}
                  >
                    Overview & Quickstart
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('architecture')}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                      activeSection === 'architecture'
                        ? 'bg-brand-500/15 text-brand-300 font-semibold border border-brand-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-dark-900'
                    }`}
                  >
                    Architecture & Flow
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2">Guides & Features</span>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveSection('stack-config')}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                      activeSection === 'stack-config'
                        ? 'bg-brand-500/15 text-brand-300 font-semibold border border-brand-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-dark-900'
                    }`}
                  >
                    Stack Setup & Git Auth
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('registries')}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                      activeSection === 'registries'
                        ? 'bg-brand-500/15 text-brand-300 font-semibold border border-brand-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-dark-900'
                    }`}
                  >
                    Private Container Registries
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('webhooks')}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                      activeSection === 'webhooks'
                        ? 'bg-brand-500/15 text-brand-300 font-semibold border border-brand-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-dark-900'
                    }`}
                  >
                    Webhooks & Auto-Deploy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('resource-limits')}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                      activeSection === 'resource-limits'
                        ? 'bg-brand-500/15 text-brand-300 font-semibold border border-brand-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-dark-900'
                    }`}
                  >
                    Runtime CPU & RAM Tuning
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2">API Reference</span>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveSection('api-ref')}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                      activeSection === 'api-ref'
                        ? 'bg-brand-500/15 text-brand-300 font-semibold border border-brand-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-dark-900'
                    }`}
                  >
                    REST & WebSocket Endpoints
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 max-w-4xl space-y-12">
          {activeSection === 'getting-started' && (
            <section className="space-y-6">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Getting Started</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Overview & Quickstart</h1>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  DockOps is a lightweight, self-hosted GitOps continuous deployment engine for Docker Compose applications.
                  It monitors Git repositories for updates, pulls private images, and reconciles container states without complex Kubernetes overhead.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-dark-900 space-y-3">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Terminal size={16} className="text-brand-400" /> Fast Docker Quickstart
                </h3>
                <p className="text-xs text-slate-400">Run the DockOps engine binary bound to your local Docker socket:</p>

                <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 font-mono text-xs text-slate-200 flex items-center justify-between">
                  <span>docker run -d -p 9090:9090 -v /var/run/docker.sock:/var/run/docker.sock argocompose/engine:latest</span>
                  <button
                    onClick={() => handleCopy('docker run -d -p 9090:9090 -v /var/run/docker.sock:/var/run/docker.sock argocompose/engine:latest', 'qs1')}
                    className="p-1.5 rounded-lg bg-dark-900 hover:bg-dark-850 text-slate-400 hover:text-slate-200 transition-colors shrink-0 ml-2"
                  >
                    {copiedId === 'qs1' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'architecture' && (
            <section className="space-y-6">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Architecture</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Architecture & Flow</h1>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  Built using Rust (Axum async web server), SQLite persistence, and direct integration with the Docker Engine daemon API.
                  The backend follows strict SOLID principles and Hexagonal Architecture (Ports and Adapters) for massive scalability and testability.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 font-mono text-xs text-slate-300 space-y-4">
                <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
                  <span className="text-brand-400 font-bold block mb-1">Git Repository (GitHub / GitLab)</span>
                  <p className="text-slate-400 text-[11px]">Source of truth for your docker-compose.yml file and environment specs.</p>
                </div>
                <div className="text-center text-slate-500 font-bold">↓ (HTTP Webhook / Poll)</div>
                <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
                  <span className="text-indigo-400 font-bold block mb-1">DockOps Rust Engine (Axum + SQLite)</span>
                  <p className="text-slate-400 text-[11px]">Validates commit hash differences, handles private registry logins, and maintains sync history via Domain-Driven Design.</p>
                </div>
                <div className="text-center text-slate-500 font-bold">↓ (Socket API)</div>
                <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">Docker Engine Daemon</span>
                  <p className="text-slate-400 text-[11px]">Executes <code>docker compose pull && docker compose up -d</code> automatically and fetches deep container telemetry.</p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <h3 className="text-sm font-bold text-slate-200">Interactive Frontend (React + Vite)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The beautiful UI includes an automatic <strong>Service Topology Graph (DAG)</strong> built dynamically by parsing the <code>com.docker.compose.depends_on</code> labels of your running containers! No manual graph mapping required. The UI also persists your current tab in the URL (e.g., <code>?tab=topology</code>) so you can bookmark exact views.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'stack-config' && (
            <section className="space-y-6">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Configuration</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Stack Setup & Git Credentials</h1>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  Every stack tracks a specific Git repository URL, branch name, and relative Docker Compose file path.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Key size={16} className="text-amber-400" /> Private Git Repositories (PAT Token)
                </h3>
                <p className="text-xs text-slate-400">
                  If your repo is private, provide a GitHub Personal Access Token (PAT).
                  The engine automatically injects HTTP Basic Auth credentials when cloning or checking remote commit heads.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'registries' && (
            <section className="space-y-6">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Security</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Private Container Registries</h1>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  Support for pulling images from Google Artifact Registry (GCR), GitHub Container Registry (GHCR), AWS ECR, and DockerHub.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-brand-300 font-mono">Google Artifact Registry (GCP)</h4>
                  <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 font-mono text-xs text-slate-300">
                    <div>Registry Host: <code>asia-docker.pkg.dev</code> or <code>gcr.io</code></div>
                    <div>Username: <code>_json_key</code></div>
                    <div>Password: <code>Paste Service Account JSON Key</code></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-indigo-300 font-mono">GitHub Container Registry (GHCR)</h4>
                  <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 font-mono text-xs text-slate-300">
                    <div>Registry Host: <code>ghcr.io</code></div>
                    <div>Username: <code>Your GitHub Username</code></div>
                    <div>Password: <code>GitHub PAT Token (read:packages)</code></div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'webhooks' && (
            <section className="space-y-6">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Automation</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Webhooks & Auto-Deploy</h1>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  Instead of relying solely on periodic polling, register an automated Webhook URL in GitHub or GitLab to trigger instant deployments.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Webhook size={16} className="text-emerald-400" /> Webhook Trigger URL Format
                </h3>
                <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 font-mono text-xs text-indigo-300">
                  POST http://your-domain.com:9090/api/webhooks/YOUR_SECRET_TOKEN
                </div>
                <p className="text-xs text-slate-400">
                  You can set Sync Mode to <code>"poll"</code>, <code>"webhook"</code>, or <code>"both"</code> per stack!
                </p>
              </div>
            </section>
          )}

          {activeSection === 'resource-limits' && (
            <section className="space-y-6">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Performance</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">Runtime CPU & RAM Tuning</h1>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  Dynamically adjust container limits live using the <code>docker update</code> API directly from the stack detail dashboard.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-slate-200">
                  <span>Max CPU Cores:</span>
                  <span className="text-brand-400 font-bold">0.5, 1.0, 2.0 Cores</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Max Memory:</span>
                  <span className="text-purple-400 font-bold">256M, 512M, 1G, 2G</span>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'api-ref' && (
            <section className="space-y-6">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold">Developer API</span>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight mt-1">REST & WebSocket API Reference</h1>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  All API requests require Bearer token authentication header: <code>Authorization: Bearer &lt;GITOPS_TOKEN&gt;</code>.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">GET</span>
                    <span className="text-slate-200">/api/stacks</span>
                  </div>
                  <span className="text-slate-500 font-sans text-xs">List all tracked stacks</span>
                </div>

                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-bold">POST</span>
                    <span className="text-slate-200">/api/stacks</span>
                  </div>
                  <span className="text-slate-500 font-sans text-xs">Register new stack</span>
                </div>

                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">POST</span>
                    <span className="text-slate-200">/api/webhooks/:secret</span>
                  </div>
                  <span className="text-slate-500 font-sans text-xs">Trigger auto-deploy via Webhook</span>
                </div>

                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">WS</span>
                    <span className="text-slate-200">/api/logs/:id?container=...</span>
                  </div>
                  <span className="text-slate-500 font-sans text-xs">Stream real-time WebSocket container logs</span>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
