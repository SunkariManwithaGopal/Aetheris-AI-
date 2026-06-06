// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Search, BookOpen, TrendingUp, AlertTriangle, Link2, 
  History, Sparkles, Copy, Check, Download, Shield, 
  User, LogOut, ArrowRight, Activity, Clock, Layers, Trash2, FileText
} from 'lucide-react';

interface Reference {
  title: string;
  url: string;
}

interface Report {
  topic: string;
  summary: string;
  keyInsights: string[];
  trends: string[];
  challenges: string[];
  references: Reference[];
  cached?: boolean;
}

export default function Home() {
  // Authentication State Matrix
  const [user, setUser] = useState<{ email: string; token: string } | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Core Intelligence Engine States
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'summary' | 'insights' | 'trends' | 'challenges' | 'sources'>('summary');
  const [copied, setCopied] = useState(false);

  // Hydrate states on mounting
  useEffect(() => {
    const savedUser = localStorage.getItem('research_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedHistory = localStorage.getItem('research_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    if (!authEmail.trim() || !authEmail.includes('@')) {
      setAuthError('Provide a valid agent security email infrastructure routing path.');
      return;
    }
    if (authPassword.length < 6) {
      setAuthError('Security passphrase must meet the 6-character entropy threshold.');
      return;
    }

    setIsAuthLoading(true);
    
    // Simulate high-speed localized secure handshake
    setTimeout(() => {
      const pseudoSession = { 
        email: authEmail.toLowerCase().trim(),
        token: `ars_sec_token_${Math.random().toString(36).substring(2, 15)}`
      };
      localStorage.setItem('research_user', JSON.stringify(pseudoSession));
      setUser(pseudoSession);
      setIsAuthLoading(false);
    }, 600);
  };

  const handleLogout = () => {
    localStorage.removeItem('research_user');
    setUser(null);
    setReport(null);
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to wipe the search history matrix indices?')) {
      localStorage.removeItem('research_history');
      setHistory([]);
    }
  };

  const handleSearch = async (e: React.FormEvent, selectedTopic?: string) => {
    if (e) e.preventDefault();
    const targetTopic = selectedTopic || topic;
    const cleanTopic = targetTopic.trim();
    if (!cleanTopic) return;

    setLoading(true);
    setError('');
    if (!selectedTopic) setTopic('');
    setActiveTab('summary');

    const cacheKey = `report_${cleanTopic.toLowerCase()}`;
    const cachedReport = localStorage.getItem(cacheKey);

    if (cachedReport) {
      setTimeout(() => {
        setReport({ ...JSON.parse(cachedReport), cached: true });
        setLoading(false);
      }, 600);
      return;
    }

    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: cleanTopic }),
      });

      const data = await res.json();
      if (res.ok) {
        setReport({ ...data, cached: false });
        localStorage.setItem(cacheKey, JSON.stringify(data));

        const updatedHistory = [data.topic, ...history.filter(h => h.toLowerCase() !== cleanTopic.toLowerCase())];
        setHistory(updatedHistory);
        localStorage.setItem('research_history', JSON.stringify(updatedHistory));
      } else {
        setError(data.error || 'The intelligence pipeline failed to assemble the matrix.');
      }
    } catch (err) {
      setError('Connection timeout. Failed to link with the core AI processing cluster.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!report) return;
    navigator.clipboard.writeText(JSON.stringify(report, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportAsJSON = () => {
    if (!report) return;
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.topic.toLowerCase().replace(/\s+/g, '_')}_dossier.json`;
    a.click();
  };

  const exportAsText = () => {
    if (!report) return;
    const plainTextReport = `
======================================================================
AUTONOMOUS RESEARCH DOSSIER: ${report.topic.toUpperCase()}
======================================================================

EXECUTIVE SYNOPSIS:
${report.summary}

CORE ANALYTICAL DISCOVERIES:
${report.keyInsights.map((insight, i) => `${i + 1}. ${insight}`).join('\n')}

EMERGING VECTORS & TRENDS:
${report.trends.map((trend, i) => `${i + 1}. ${trend}`).join('\n')}

STRUCTURAL OBSTACLES & CHALLENGES:
${report.challenges.map((challenge, i) => `${i + 1}. ${challenge}`).join('\n')}

INDEXED CITATIONS & DATA SOURCES:
${report.references.map((ref) => `- ${ref.title} (${ref.url})`).join('\n')}
    `.trim();

    const blob = new Blob([plainTextReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.topic.toLowerCase().replace(/\s+/g, '_')}_report.txt`;
    a.click();
  };

  // =================== VIEW 1: AUTHENTICATION FRAMEWAY ===================
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-14 h-14 bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 ring-1 ring-slate-800">
              <Shield className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">
              Aetheris AI
            </h1>
            <p className="text-slate-400 text-xs mt-1.5">Initialize core agent cryptographic gateway access</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {authError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Agent Email ID</label>
              <input
                type="email"
                required
                placeholder="agent.alias@research.suite"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Secure Keyphrase</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full mt-2 bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-500 hover:to-indigo-600 disabled:opacity-50 text-slate-950 font-bold py-3.5 rounded-xl text-sm tracking-wide shadow-lg shadow-teal-500/10 flex items-center justify-center gap-2 group transition duration-300 transform active:scale-98"
            >
              {isAuthLoading ? 'Authenticating Token...' : 'Initialize Secure Workspace'}
              {!isAuthLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // =================== VIEW 2: CORE DASHBOARD PORTAL ===================
  return (
    <main className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* PERSISTENT NAVIGATION SIDEBAR */}
      <section className="w-80 bg-slate-900/30 backdrop-blur-xl border-r border-slate-900/80 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <History className="text-teal-400 w-4 h-4" />
            <h2 className="font-bold text-xs uppercase tracking-widest text-slate-400">Search Matrix</h2>
          </div>
          {history.length > 0 && (
            <button 
              onClick={clearHistory}
              className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors"
              title="Clear Database Index"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-none">
          {history.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-900 rounded-2xl">
              <Layers className="w-5 h-5 text-slate-700 mb-2" />
              <p className="text-xs text-slate-500">No cached nodes located.</p>
            </div>
          ) : (
            history.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSearch(null as any, item)}
                className="w-full text-left p-3.5 rounded-xl text-sm bg-slate-900/20 hover:bg-slate-900/60 border border-slate-900/40 hover:border-slate-800 transition duration-200 group flex items-center justify-between"
              >
                <span className="truncate text-slate-400 group-hover:text-slate-200 mr-2">{item}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* User Identity Panel */}
        <div className="p-4 border-t border-slate-900/80 bg-slate-900/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-teal-400" />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-300 truncate">{user.email}</p>
              <p className="text-[9px] font-mono tracking-wider text-emerald-400 uppercase">Token Authenticated</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-600 hover:text-red-400 hover:bg-slate-900 rounded-xl transition duration-200 flex-shrink-0"
            title="Terminate Core Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* PRIMARY APPLICATION PLATFORM HUB */}
      <section className="flex-1 flex flex-col overflow-hidden">
        
        {/* Superior Platform Upper Header */}
        <header className="px-8 py-5 bg-slate-900/10 border-b border-slate-900/60 flex flex-col lg:flex-row justify-between items-center gap-4 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent---">
                Aetheris AI
              </h1>
              <div className="flex items-center gap-3 text-[10px] font-medium text-slate-500 mt-0.5">
                <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-emerald-400" /> Infrastructure: Online</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-indigo-400" /> Platform Engine: Gemini 2.5 Flash</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex w-full lg:w-auto max-w-md items-center gap-2">
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder="Identify systemic target domain node..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-slate-900/80 border border-slate-800 rounded-xl pl-4 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition duration-200 w-full font-medium"
              />
              <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-600" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-500 hover:opacity-95 text-slate-950 font-black px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition duration-200 disabled:opacity-30 flex-shrink-0 shadow-lg shadow-teal-500/5"
            >
              {loading ? 'Analyzing Vector...' : 'Execute Synthesis'}
            </button>
          </form>
        </header>

        {/* Dynamic Canvas Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-slate-950 to-slate-900/40">
          {error && (
            <div className="bg-red-500/5 border border-red-500/20 text-red-200 p-4 rounded-2xl text-sm flex items-start gap-3 max-w-4xl mx-auto">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-red-400 tracking-wide">Analysis Infrastructure Fault</h5>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {loading ? (
            /* Premium Dashboard Skeletal Animation Frame */
            <div className="space-y-6 max-w-4xl mx-auto animate-pulse">
              <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-6 space-y-4">
                <div className="h-6 w-1/4 bg-slate-800 rounded-lg"></div>
                <div className="h-4 w-full bg-slate-800/50 rounded-lg"></div>
                <div className="h-4 w-5/6 bg-slate-800/50 rounded-lg"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-44 bg-slate-900/20 border border-slate-900 rounded-2xl"></div>
                <div className="h-44 bg-slate-900/20 border border-slate-900 rounded-2xl"></div>
              </div>
            </div>
          ) : report ? (
            /* COMPREHENSIVE DOSSIER WORKSPACE PANEL */
            <div className="space-y-6 max-w-4xl mx-auto animate-[fadeIn_0.4s_ease-out]">
              
              {/* Dossier Control Header */}
              <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-400 via-emerald-400 to-indigo-500"></div>
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-teal-400">Validated Intelligence Dossier</span>
                  <h3 className="text-2xl font-black text-slate-100 tracking-tight mt-1">{report.topic}</h3>
                </div>
                
                {/* Actions Panel */}
                <div className="flex items-center gap-1.5 self-start sm:self-center">
                  {report.cached && (
                    <span className="text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md mr-1.5 tracking-wider">
                      LOCAL CACHE HIT
                    </span>
                  )}
                  <button 
                    onClick={copyToClipboard}
                    className="p-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-900/60 hover:border-slate-800 rounded-xl text-slate-400 hover:text-slate-200 transition flex items-center gap-1.5 text-xs font-semibold"
                    title="Copy Full Object Configuration JSON"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                  <button 
                    onClick={exportAsText}
                    className="p-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-900/60 hover:border-slate-800 rounded-xl text-slate-400 hover:text-slate-200 transition flex items-center gap-1.5 text-xs font-semibold"
                    title="Download Formatted Plaintext Dossier"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Report.txt</span>
                  </button>
                  <button 
                    onClick={exportAsJSON}
                    className="p-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-900/60 hover:border-slate-800 rounded-xl text-slate-400 hover:text-slate-200 transition flex items-center gap-1.5 text-xs font-semibold"
                    title="Download System JSON Object Structure"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON</span>
                  </button>
                </div>
              </div>

              {/* DASHBOARD TABBED VIEW CONTROLLERS */}
              <div className="flex bg-slate-900/60 p-1 border border-slate-900 rounded-2xl gap-1 overflow-x-auto scrollbar-none">
                {(['summary', 'insights', 'trends', 'challenges', 'sources'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[95px] py-2.5 px-3 text-center rounded-xl text-xs font-bold capitalize tracking-wide transition duration-200 whitespace-nowrap ${
                      activeTab === tab 
                        ? 'bg-slate-800/80 text-teal-400 shadow-inner border border-slate-700/40' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    {tab === 'sources' ? 'Data Sources' : tab}
                  </button>
                ))}
              </div>

              {/* IMMERSIVE DATA PORT CASES */}
              <div className="bg-slate-900/10 border border-slate-900/80 rounded-2xl p-6 min-h-[260px] shadow-2xl backdrop-blur-sm">
                
                {/* Tab Component 1: Summary */}
                {activeTab === 'summary' && (
                  <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                    <h4 className="text-xs font-bold tracking-widest uppercase text-slate-500 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-teal-400" /> Executive Research Synopsis
                    </h4>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">{report.summary}</p>
                  </div>
                )}

                {/* Tab Component 2: Insights */}
                {activeTab === 'insights' && (
                  <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                    <h4 className="text-xs font-bold tracking-widest uppercase text-slate-500 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-400" /> Primary Discovered Insights
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {report.keyInsights.map((insight, idx) => (
                        <div key={idx} className="p-4 bg-slate-900/40 border border-slate-900 rounded-xl flex items-start gap-3">
                          <span className="w-5 h-5 bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[10px] font-mono rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">{idx + 1}</span>
                          <p className="text-sm text-slate-300 leading-relaxed">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Component 3: Trends */}
                {activeTab === 'trends' && (
                  <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                    <h4 className="text-xs font-bold tracking-widest uppercase text-slate-500 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" /> Structural Industry/Domain Trends
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {report.trends.map((trend, idx) => (
                        <div key={idx} className="p-4 bg-slate-900/40 border border-slate-900 rounded-xl flex items-start gap-3">
                          <span className="w-5 h-5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">{idx + 1}</span>
                          <p className="text-sm text-slate-300 leading-relaxed">{trend}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Component 4: Challenges */}
                {activeTab === 'challenges' && (
                  <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                    <h4 className="text-xs font-bold tracking-widest uppercase text-slate-500 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" /> Systemic Roadblocks & Challenges
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {report.challenges.map((challenge, idx) => (
                        <div key={idx} className="p-4 bg-slate-900/40 border border-slate-900 rounded-xl flex items-start gap-3">
                          <span className="w-5 h-5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">{idx + 1}</span>
                          <p className="text-sm text-slate-300 leading-relaxed">{challenge}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Component 5: Sources/Citations */}
                {activeTab === 'sources' && (
                  <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                    <h4 className="text-xs font-bold tracking-widest uppercase text-slate-500 flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-indigo-400" /> Catalogued Academic Data Sources
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {report.references.map((ref, idx) => (
                        <a
                          key={idx}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-slate-900/30 hover:bg-slate-900/80 border border-slate-900 rounded-xl text-xs text-teal-400 transition flex items-center justify-between group"
                        >
                          <span className="truncate mr-3 text-slate-300 group-hover:text-teal-400 transition-colors font-medium">{ref.title}</span>
                          <Link2 className="w-4 h-4 text-slate-600 group-hover:text-teal-400 flex-shrink-0 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          ) : (
            /* HIGH-TIER BRAND LANDING DISPLAY */
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto pt-20 px-4">
              <div className="w-16 h-16 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl flex items-center justify-center border border-slate-800 mb-6 shadow-2xl relative group">
                <BookOpen className="w-6 h-6 text-teal-400" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-2xl blur opacity-15 -z-10"></div>
              </div>
              <h2 className="text-xl font-black tracking-tight text-slate-200">Initialize Analytical Extraction</h2>
              <p className="text-sm text-slate-500 mt-2.5 leading-relaxed font-normal">
                Input any core technology vector, macro-economic structure, or historical milestone node to configure a real-time dossier extraction mapping matrix.
              </p>

              {/* Premium Discovery Quick-Chips */}
              <div className="mt-8 w-full">
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-600 mb-3">Pre-Indexed Domains</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Quantum Computing', 'Neuroplasticity Mechanisms', 'Solid-State Batteries'].map((chip, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearch(null as any, chip)}
                      className="text-xs bg-slate-900/40 hover:bg-slate-900 border border-slate-900/80 hover:border-slate-700 text-slate-400 hover:text-slate-200 px-4 py-2 rounded-xl transition duration-200"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}