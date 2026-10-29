import React, { useState, useEffect } from 'react';
import { Target, CheckCircle, Clock, ChevronDown, ChevronUp, FileCode, Cpu, Sparkles } from 'lucide-react';

export function GstPage() {
  const [gstData, setGstData] = useState(null);
  const [expandedRepo, setExpandedRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Golden Standard Test (GST) - Canopy';
    fetch('/api/gst-results')
      .then((res) => { if (!res.ok) throw new Error('Content is temporarily unavailable. Please try again.'); return res.json(); })
      .then((data) => setGstData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const toggleRepo = (id) => {
    setExpandedRepo(expandedRepo === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {error && <p role="alert" className="mb-6 text-accent-red">{error}</p>}
      {loading && <p role="status" className="mb-6">Loading…</p>}
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blueSoft dark:bg-accent-blueSoftDark text-accent-blue dark:text-blue-400 text-xs font-mono mb-3">
          <Target className="w-3.5 h-3.5" />
          <span>Architectural Ground Truth Benchmark</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
          Golden Standard Test (GST) Suite
        </h1>
        <p className="mt-3 text-sm sm:text-base text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
          Precision and recall are under systematic measurement. Results are pending; no accuracy or token reduction claims are published until supporting verification is available.
        </p>
      </div>

      {/* Methodology Section */}
      <div className="mb-12 p-8 rounded-2xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark shadow-subtle">
        <h2 className="text-lg font-bold text-ink-light dark:text-ink-dark mb-4 flex items-center gap-2">
          <FileCode className="w-5 h-5 text-accent-blue" />
          <span>Evaluation Protocol & Ground Truth Method</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-[11px] font-mono text-ink-mutedLight dark:text-ink-mutedDark mb-3">
              The 8 Fixed Architectural Questions
            </h3>
            <ol className="space-y-2 list-decimal list-inside text-ink-light dark:text-ink-dark">
              <li>Authentication & Authorization cascade (token verification to session)</li>
              <li>Primary database write pipeline & transaction boundary</li>
              <li>Third-party API webhook ingestion path & HMAC verification</li>
              <li>State management / cache invalidation trigger</li>
              <li>Background job / queue worker dispatch mechanism</li>
              <li>Route-to-schema validation middleware chain</li>
              <li>Error handling & centralized logging propagation</li>
              <li>Component dependency boundary & dead code isolation</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold uppercase tracking-wider text-[11px] font-mono text-ink-mutedLight dark:text-ink-mutedDark mb-3">
              Scientific Testing Protocol
            </h3>
            <ul className="space-y-2 text-ink-light dark:text-ink-dark">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 mt-1.5"></span>
                <span><strong>Fresh Context:</strong> Clean session with zero prior repo memory or chat baggage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 mt-1.5"></span>
                <span><strong>Fixed Git Commits:</strong> Explicit pinned commits preventing upstream drift.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 mt-1.5"></span>
                <span><strong>Provider-Reported Tokens:</strong> Recorded from the provider used for the evaluation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 mt-1.5"></span>
                <span><strong>Ground Truth Grading:</strong> Scored against human answers vetted by code maintainers.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 10 Pinned Repositories List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
            10 Pinned Repositories Matrix
          </h2>
          <span className="text-xs font-mono text-ink-mutedLight dark:text-ink-mutedDark">
            Results pending
          </span>
        </div>

        {!loading && !error && !gstData?.repositories?.length && <p>results pending</p>}
        {gstData?.repositories?.map((repo) => {
          const isPending = repo.status.toLowerCase().includes('pending');
          const isExpanded = expandedRepo === repo.id;

          return (
            <div
              key={repo.id}
              className="rounded-2xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark overflow-hidden shadow-subtle transition-all"
            >
              {/* Main Summary Row */}
              <div
                onClick={() => !isPending && toggleRepo(repo.id)}
                className={`p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  !isPending ? 'cursor-pointer hover:bg-paper-subtleLight/40 dark:hover:bg-paper-subtleDark/20' : ''
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-base text-ink-light dark:text-ink-dark">
                      {repo.displayName}
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-paper-subtleLight dark:bg-paper-subtleDark text-accent-blue">
                      {repo.commit}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold ${
                        isPending
                          ? 'bg-paper-subtleLight dark:bg-paper-subtleDark text-ink-mutedLight dark:text-ink-mutedDark border border-borderLight dark:border-borderDark'
                          : 'bg-accent-greenSoft dark:bg-accent-greenSoftDark text-accent-green'
                      }`}
                    >
                      {repo.status}
                    </span>
                  </div>
                  <div className="text-xs text-ink-mutedLight dark:text-ink-mutedDark">
                    {repo.language || 'JavaScript/TypeScript'} • {repo.files == null ? 'file count pending' : `${repo.files} files`} • {repo.status}
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs font-mono">
                  {isPending ? (
                    <div className="flex items-center gap-2 text-ink-mutedLight dark:text-ink-mutedDark italic">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>results pending</span>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="text-[10px] text-ink-mutedLight uppercase">Accuracy</div>
                        <div className="font-semibold text-accent-green text-sm">{repo.accuracyScore}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-ink-mutedLight uppercase">Token Reduction</div>
                        <div className="font-semibold text-accent-blue text-sm">{repo.tokenReduction}</div>
                      </div>
                      <div className="text-ink-mutedLight">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Expanded Question Breakdown for completed pilots */}
              {isExpanded && repo.questions && repo.questions.length > 0 && (
                <div className="border-t border-borderLight dark:border-borderDark p-6 bg-paper-subtleLight/30 dark:bg-paper-subtleDark/20">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-light dark:text-ink-dark mb-4">
                    Individual Question Breakdown ({repo.displayName})
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {repo.questions.map((q) => (
                      <div
                        key={q.id}
                        className="p-3 rounded-xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark text-xs font-mono"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-ink-light dark:text-ink-dark">{q.id}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-accent-greenSoft text-accent-green">
                            {q.status}
                          </span>
                        </div>
                        <div className="text-[11px] font-sans text-ink-mutedLight dark:text-ink-mutedDark mb-2 truncate">
                          {q.topic}
                        </div>
                        <div className="text-[10px] text-ink-mutedLight dark:text-ink-mutedDark flex justify-between">
                          <span>With Canopy:</span>
                          <span className="text-accent-blue font-semibold">{q.canopyAssistedTokens} tok</span>
                        </div>
                        <div className="text-[10px] text-ink-mutedLight dark:text-ink-mutedDark flex justify-between">
                          <span>Raw Traverse:</span>
                          <span>{q.rawTokens} tok</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-[11px] font-sans text-ink-mutedLight dark:text-ink-mutedDark">
                    Tested on {repo.verifiedDate}. Token usage derived from standardized Claude 3.5 Sonnet JSON-RPC traces.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
