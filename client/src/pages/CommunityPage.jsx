import React, { useState } from 'react';
import { Users, Sparkles, Send, CheckCircle2, AlertCircle, ExternalLink, ShieldCheck, Building2, MessageSquare } from 'lucide-react';

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState('early-testers'); // 'early-testers' | 'teams' | 'feedback'

  // Early Tester State
  const [earlyTesterForm, setEarlyTesterForm] = useState({
    email: '',
    companyEmail: '',
    stack: ['TypeScript', 'React'],
    repoSizeBucket: '200-1000 files',
    operatingSystem: 'Windows 11 / 10',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC+0',
    notes: '',
    usesJavaScriptTypeScript: 'yes',
    role: 'working professional',
  });
  const [earlyTesterStatus, setEarlyTesterStatus] = useState({ loading: false, success: null, error: null });

  // Teams Waitlist State
  const [teamsForm, setTeamsForm] = useState({
    workEmail: '',
    teamSize: '6-20 developers',
    companyName: '',
    primaryUseCase: 'Shared architecture maps across engineering team',
    currentStack: '',
  });
  const [teamsStatus, setTeamsStatus] = useState({ loading: false, success: null, error: null });

  // General Feedback State
  const [feedbackForm, setFeedbackForm] = useState({
    category: 'limitation_reproduction',
    title: '',
    message: '',
    repoUrl: '',
    email: '',
    canopyVersion: '0.1.x',
  });
  const [feedbackStatus, setFeedbackStatus] = useState({ loading: false, success: null, error: null });

  const techOptions = [
    'TypeScript',
    'JavaScript',
    'Next.js (App Router)',
    'React',
    'Node.js / Express',
    'NestJS',
    'Remix',
    'Vue.js',
    'Svelte',
    'Prisma / Mongoose',
  ];

  const handleStackToggle = (tech) => {
    setEarlyTesterForm((prev) => {
      const exists = prev.stack.includes(tech);
      if (exists) {
        if (prev.stack.length === 1) return prev; // keep at least 1
        return { ...prev, stack: prev.stack.filter((t) => t !== tech) };
      } else {
        return { ...prev, stack: [...prev.stack, tech] };
      }
    });
  };

  const handleEarlyTesterSubmit = async (e) => {
    e.preventDefault();
    setEarlyTesterStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch('/api/waitlist/early-testers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(earlyTesterForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || 'Failed to submit application');

      setEarlyTesterStatus({
        loading: false,
        success: data.message || 'Application received! Welcome to the Canopy early-testers pool.',
        error: null,
      });
    } catch (err) {
      setEarlyTesterStatus({ loading: false, success: null, error: err.message });
    }
  };

  const handleTeamsSubmit = async (e) => {
    e.preventDefault();
    setTeamsStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch('/api/waitlist/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamsForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || 'Failed to submit team registration');

      setTeamsStatus({
        loading: false,
        success: data.message || 'Your team has been placed on the priority waitlist.',
        error: null,
      });
    } catch (err) {
      setTeamsStatus({ loading: false, success: null, error: err.message });
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || 'Failed to submit feedback');

      setFeedbackStatus({
        loading: false,
        success: data.message || 'Thank you! Your feedback has been recorded.',
        error: null,
      });
      setFeedbackForm((prev) => ({ ...prev, title: '', message: '', repoUrl: '' }));
    } catch (err) {
      setFeedbackStatus({ loading: false, success: null, error: err.message });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blueSoft dark:bg-accent-blueSoftDark text-accent-blue dark:text-blue-400 text-xs font-mono mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Developer Ecosystem & Community</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
          Feedback, Early Testers & Teams Waitlist
        </h1>
        <p className="mt-3 text-sm sm:text-base text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
          Canopy is built in public with direct feedback from engineers managing complex codebases. Join the alpha testing pool, join the Teams waitlist, or report limitation edge cases.
        </p>
      </div>

      {/* Community Links Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <a
          href="https://www.npmjs.com/package/canopy-engine"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark flex items-center justify-between hover:border-ink-mutedLight transition-colors shadow-subtle group"
        >
          <div>
            <div className="font-semibold text-xs text-ink-light dark:text-ink-dark group-hover:text-accent-blue">
              npm Package
            </div>
            <div className="text-[11px] text-ink-mutedLight dark:text-ink-mutedDark">
              Install and release information
            </div>
          </div>
          <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
        </a>

        <a
          href="mailto:canopy.spillitlabs@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark flex items-center justify-between hover:border-ink-mutedLight transition-colors shadow-subtle group"
        >
          <div>
            <div className="font-semibold text-xs text-ink-light dark:text-ink-dark group-hover:text-accent-blue">
              Contact Canopy
            </div>
            <div className="text-[11px] text-ink-mutedLight dark:text-ink-mutedDark">
              canopy.spillitlabs@gmail.com
            </div>
          </div>
          <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
        </a>

        <div className="p-4 rounded-xl border border-dashed border-borderLight dark:border-borderDark bg-paper-subtleLight/40 dark:bg-paper-subtleDark/20 flex items-center justify-between">
          <div>
            <div className="font-semibold text-xs text-ink-light dark:text-ink-dark">
              Community Form
            </div>
            <div className="text-[11px] text-ink-mutedLight dark:text-ink-mutedDark font-mono">
              Use the early-testers form below
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
            Not linked
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-borderLight dark:border-borderDark mb-8">
        <button
          onClick={() => setActiveTab('early-testers')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'early-testers'
              ? 'border-accent-blue text-accent-blue dark:text-blue-400'
              : 'border-transparent text-ink-mutedLight hover:text-ink-light dark:hover:text-ink-dark'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Early-Testers Signup</span>
        </button>

        <button
          onClick={() => setActiveTab('teams')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'teams'
              ? 'border-accent-blue text-accent-blue dark:text-blue-400'
              : 'border-transparent text-ink-mutedLight hover:text-ink-light dark:hover:text-ink-dark'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Teams Waitlist (Shared Maps & PR Bot)</span>
        </button>

        <button
          onClick={() => setActiveTab('feedback')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'feedback'
              ? 'border-accent-blue text-accent-blue dark:text-blue-400'
              : 'border-transparent text-ink-mutedLight hover:text-ink-light dark:hover:text-ink-dark'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Report Limitation / Feedback</span>
        </button>
      </div>

      {/* TAB 1: Early-Testers Form */}
      {activeTab === 'early-testers' && (
        <div className="max-w-2xl bg-paper-cardLight dark:bg-paper-cardDark border border-borderLight dark:border-borderDark rounded-2xl p-6 sm:p-8 shadow-elevated">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-ink-light dark:text-ink-dark">
              Join the Early-Testers Pool
            </h2>
            <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark mt-1">
              We onboard developers in small cohorts based on project complexity and technology stack.
            </p>
          </div>

          {earlyTesterStatus.success && (
            <div className="mb-6 p-4 rounded-xl border border-accent-greenSoft dark:border-accent-greenSoftDark bg-accent-greenSoft/50 dark:bg-accent-greenSoftDark/50 text-accent-green flex items-start gap-3 text-xs">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>{earlyTesterStatus.success}</div>
            </div>
          )}

          {earlyTesterStatus.error && (
            <div className="mb-6 p-4 rounded-xl border border-accent-redSoft dark:border-accent-redSoftDark bg-accent-redSoft/50 dark:bg-accent-redSoftDark/50 text-accent-red flex items-start gap-3 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>{earlyTesterStatus.error}</div>
            </div>
          )}

          <form onSubmit={handleEarlyTesterSubmit} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                  JavaScript or TypeScript use <span className="text-accent-red">*</span>
                </label>
                <select
                  required
                  value={earlyTesterForm.usesJavaScriptTypeScript}
                  onChange={(e) => setEarlyTesterForm({ ...earlyTesterForm, usesJavaScriptTypeScript: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                  Role <span className="text-accent-red">*</span>
                </label>
                <select
                  required
                  value={earlyTesterForm.role}
                  onChange={(e) => setEarlyTesterForm({ ...earlyTesterForm, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none"
                >
                  <option value="working professional">Working professional</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            {/* Email Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                  Developer Email <span className="text-accent-red">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={earlyTesterForm.email}
                  onChange={(e) => setEarlyTesterForm({ ...earlyTesterForm, email: e.target.value })}
                  placeholder="alex@developer.io"
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none focus:ring-1 focus:ring-accent-blue"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                  Company Email <span className="text-ink-mutedLight text-[10px]">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={earlyTesterForm.companyEmail}
                  onChange={(e) => setEarlyTesterForm({ ...earlyTesterForm, companyEmail: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none focus:ring-1 focus:ring-accent-blue"
                />
              </div>
            </div>

            {/* JS/TS Stack Checkboxes */}
            <div>
              <label className="block font-semibold text-ink-light dark:text-ink-dark mb-2">
                Your Primary Codebase Stack <span className="text-accent-red">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {techOptions.map((tech) => {
                  const isChecked = earlyTesterForm.stack.includes(tech);
                  return (
                    <button
                      type="button"
                      key={tech}
                      onClick={() => handleStackToggle(tech)}
                      className={`px-3 py-2 rounded-xl border text-left transition-colors flex items-center justify-between ${
                        isChecked
                          ? 'border-accent-blue bg-accent-blueSoft dark:bg-accent-blueSoftDark text-accent-blue dark:text-blue-400 font-semibold'
                          : 'border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-mutedLight dark:text-ink-mutedDark'
                      }`}
                    >
                      <span>{tech}</span>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Repo size and OS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                  Target Repository Size <span className="text-accent-red">*</span>
                </label>
                <select
                  value={earlyTesterForm.repoSizeBucket}
                  onChange={(e) => setEarlyTesterForm({ ...earlyTesterForm, repoSizeBucket: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none"
                >
                  <option value="<50 files">&lt;50 files (Small library)</option>
                  <option value="50-200 files">50 - 200 files (Standard service)</option>
                  <option value="200-1000 files">200 - 1,000 files (Full-stack web app)</option>
                  <option value="1000-5000 files">1,000 - 5,000 files (Large platform)</option>
                  <option value="5000+ files">5,000+ files (Monorepo)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                  Operating System <span className="text-accent-red">*</span>
                </label>
                <select
                  value={earlyTesterForm.operatingSystem}
                  onChange={(e) => setEarlyTesterForm({ ...earlyTesterForm, operatingSystem: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none"
                >
                  <option value="macOS (Apple Silicon)">macOS (Apple Silicon)</option>
                  <option value="macOS (Intel)">macOS (Intel)</option>
                  <option value="Linux (x86_64)">Linux (x86_64)</option>
                  <option value="Linux (ARM64)">Linux (ARM64)</option>
                  <option value="Windows 11 / 10">Windows 11 / 10</option>
                  <option value="WSL2 (Ubuntu/Debian)">WSL2 (Ubuntu/Debian)</option>
                </select>
              </div>
            </div>

            {/* Time zone and notes */}
            <div>
              <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                Time Zone <span className="text-accent-red">*</span>
              </label>
              <input
                type="text"
                required
                value={earlyTesterForm.timeZone}
                onChange={(e) => setEarlyTesterForm({ ...earlyTesterForm, timeZone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                Notes on what you hope to trace or debug <span className="text-ink-mutedLight text-[10px]">(Optional)</span>
              </label>
              <textarea
                rows={3}
                value={earlyTesterForm.notes}
                onChange={(e) => setEarlyTesterForm({ ...earlyTesterForm, notes: e.target.value })}
                placeholder="e.g. Trying to map dynamic middleware chains across a 40-package Turborepo..."
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={earlyTesterStatus.loading}
              className="w-full py-3 rounded-full bg-ink-light text-paper-light hover:bg-neutral-800 dark:bg-ink-dark dark:text-ink-light dark:hover:bg-neutral-200 font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{earlyTesterStatus.loading ? 'Submitting Application...' : 'Submit Early Tester Application'}</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: Teams Waitlist */}
      {activeTab === 'teams' && (
        <div className="max-w-2xl bg-paper-cardLight dark:bg-paper-cardDark border border-borderLight dark:border-borderDark rounded-2xl p-6 sm:p-8 shadow-elevated">
          <div className="mb-6">
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-accent-blueSoft dark:bg-accent-blueSoftDark text-accent-blue font-semibold">
              Shared Maps & PR Bot: Coming
            </span>
            <h2 className="text-xl font-bold text-ink-light dark:text-ink-dark mt-2">
              Canopy for Engineering Teams
            </h2>
            <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark mt-1">
              Shared workspace architecture maps, collaborative code reviews, and automated PR impact bots that comment on GitHub/GitLab pull requests.
            </p>
          </div>

          {teamsStatus.success && (
            <div className="mb-6 p-4 rounded-xl border border-accent-greenSoft dark:border-accent-greenSoftDark bg-accent-greenSoft/50 dark:bg-accent-greenSoftDark/50 text-accent-green flex items-start gap-3 text-xs">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>{teamsStatus.success}</div>
            </div>
          )}

          {teamsStatus.error && (
            <div className="mb-6 p-4 rounded-xl border border-accent-redSoft dark:border-accent-redSoftDark bg-accent-redSoft/50 dark:bg-accent-redSoftDark/50 text-accent-red flex items-start gap-3 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>{teamsStatus.error}</div>
            </div>
          )}

          <form onSubmit={handleTeamsSubmit} className="space-y-6 text-xs">
            <div>
              <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                Work Email <span className="text-accent-red">*</span>
              </label>
              <input
                type="email"
                required
                value={teamsForm.workEmail}
                onChange={(e) => setTeamsForm({ ...teamsForm, workEmail: e.target.value })}
                placeholder="techlead@company.com"
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none focus:ring-1 focus:ring-accent-blue"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                  Team Size <span className="text-accent-red">*</span>
                </label>
                <select
                  value={teamsForm.teamSize}
                  onChange={(e) => setTeamsForm({ ...teamsForm, teamSize: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none"
                >
                  <option value="1-5 developers">1 - 5 developers</option>
                  <option value="6-20 developers">6 - 20 developers</option>
                  <option value="21-50 developers">21 - 50 developers</option>
                  <option value="50+ developers">50+ developers</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  value={teamsForm.companyName}
                  onChange={(e) => setTeamsForm({ ...teamsForm, companyName: e.target.value })}
                  placeholder="Acme Engineering"
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                Primary Anticipated Use Case <span className="text-accent-red">*</span>
              </label>
              <select
                value={teamsForm.primaryUseCase}
                onChange={(e) => setTeamsForm({ ...teamsForm, primaryUseCase: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none"
              >
                <option value="Shared architecture maps across engineering team">Shared architecture maps across engineering team</option>
                <option value="Automated PR bot impact analysis on pull requests">Automated PR bot impact analysis on pull requests</option>
                <option value="Onboarding new engineers to complex codebases">Onboarding new engineers to complex codebases</option>
                <option value="Compliance & security architecture review">Compliance & security architecture review</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={teamsStatus.loading}
              className="w-full py-3 rounded-full bg-ink-light text-paper-light hover:bg-neutral-800 dark:bg-ink-dark dark:text-ink-light dark:hover:bg-neutral-200 font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>{teamsStatus.loading ? 'Registering Team...' : 'Join Teams Waitlist'}</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: Feedback Form */}
      {activeTab === 'feedback' && (
        <div className="max-w-2xl bg-paper-cardLight dark:bg-paper-cardDark border border-borderLight dark:border-borderDark rounded-2xl p-6 sm:p-8 shadow-elevated">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-ink-light dark:text-ink-dark">
              Report Limitation or Technical Feedback
            </h2>
            <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark mt-1">
              Found a missed call path or unsupported syntax pattern? We review every AST parser report.
            </p>
          </div>

          {feedbackStatus.success && (
            <div className="mb-6 p-4 rounded-xl border border-accent-greenSoft dark:border-accent-greenSoftDark bg-accent-greenSoft/50 dark:bg-accent-greenSoftDark/50 text-accent-green flex items-start gap-3 text-xs">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>{feedbackStatus.success}</div>
            </div>
          )}

          {feedbackStatus.error && (
            <div className="mb-6 p-4 rounded-xl border border-accent-redSoft dark:border-accent-redSoftDark bg-accent-redSoft/50 dark:bg-accent-redSoftDark/50 text-accent-red flex items-start gap-3 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>{feedbackStatus.error}</div>
            </div>
          )}

          <form onSubmit={handleFeedbackSubmit} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                  Feedback Category <span className="text-accent-red">*</span>
                </label>
                <select
                  value={feedbackForm.category}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none"
                >
                  <option value="limitation_reproduction">Limitation Reproduction</option>
                  <option value="bug">Parser Bug / Crash</option>
                  <option value="benchmark_question">Benchmark Question</option>
                  <option value="feature_request">Feature Request</option>
                  <option value="general">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                  Canopy Version
                </label>
                <input
                  type="text"
                  value={feedbackForm.canopyVersion}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, canopyVersion: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                Title / Short Summary <span className="text-accent-red">*</span>
              </label>
              <input
                type="text"
                required
                value={feedbackForm.title}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, title: e.target.value })}
                placeholder="e.g. Speculative edge on dynamic import() with template string"
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                Reproduction Code or Details <span className="text-accent-red">*</span>
              </label>
              <textarea
                rows={5}
                required
                value={feedbackForm.message}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                placeholder="Please paste the code snippet, call site, and what edge Canopy resolved or omitted..."
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark font-mono focus:outline-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                  Public Repo URL <span className="text-ink-mutedLight text-[10px]">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={feedbackForm.repoUrl}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, repoUrl: e.target.value })}
                  placeholder="https://github.com/org/repo"
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-light dark:text-ink-dark mb-1">
                  Your Email <span className="text-ink-mutedLight text-[10px]">(Optional for follow-up)</span>
                </label>
                <input
                  type="email"
                  value={feedbackForm.email}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                  placeholder="you@domain.com"
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={feedbackStatus.loading}
              className="w-full py-3 rounded-full bg-ink-light text-paper-light hover:bg-neutral-800 dark:bg-ink-dark dark:text-ink-light dark:hover:bg-neutral-200 font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{feedbackStatus.loading ? 'Submitting Feedback...' : 'Send Technical Report'}</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
