import React, { useState, useEffect } from 'react';
import { Zap, Cpu, HardDrive, Calendar, ArrowUpDown, Search, ShieldCheck, GitCommit } from 'lucide-react';

export function BenchmarksPage() {
  const [benchmarks, setBenchmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('files');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    document.title = 'Speed Benchmarks (10 Repositories) - Canopy';
    fetch('/api/benchmarks')
      .then((res) => { if (!res.ok) throw new Error('Content is temporarily unavailable. Please try again.'); return res.json(); })
      .then((data) => {
        if (data && data.benchmarks) setBenchmarks(data.benchmarks);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredBenchmarks = benchmarks
    .filter((b) => {
      const q = searchQuery.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        (b.commit || '').toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {error && <p role="alert" className="mb-6 text-accent-red">{error}</p>}
      {loading && <p role="status" className="mb-6">Loading…</p>}
      {/* Page Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>Verifiable Performance Metrics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
          Speed Benchmarks
        </h1>
        <p className="mt-3 text-sm sm:text-base text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
          These are single-run measurements on the listed hardware, not medians. Commit hashes, most dates, first-view timings, peak memory, and disk type are not yet recorded.
        </p>
      </div>

      {/* Hardware Testbed Spec Callout Card */}
      <div className="mb-10 p-6 rounded-2xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark shadow-subtle grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
        <div>
          <div className="flex items-center gap-2 text-ink-mutedLight dark:text-ink-mutedDark mb-1">
            <Cpu className="w-4 h-4 text-accent-blue" />
            <span className="font-semibold uppercase font-mono tracking-wider text-[10px]">Standard Processor</span>
          </div>
          <div className="font-semibold text-ink-light dark:text-ink-dark">
            Intel Core i5-12450H (8C / 12T)
          </div>
          <div className="text-[11px] text-ink-mutedLight dark:text-ink-mutedDark">Windows 11 Pro 64-bit</div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-ink-mutedLight dark:text-ink-mutedDark mb-1">
            <HardDrive className="w-4 h-4 text-accent-green" />
            <span className="font-semibold uppercase font-mono tracking-wider text-[10px]">Memory & Storage</span>
          </div>
          <div className="font-semibold text-ink-light dark:text-ink-dark">
            7.6 GB RAM
          </div>
          <div className="text-[11px] text-ink-mutedLight dark:text-ink-mutedDark">          Disk type not recorded</div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-ink-mutedLight dark:text-ink-mutedDark mb-1">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="font-semibold uppercase font-mono tracking-wider text-[10px]">Node.js Runtime</span>
          </div>
          <div className="font-semibold text-ink-light dark:text-ink-dark font-mono">
            Node.js v22.12.0
          </div>
          <div className="text-[11px] text-ink-mutedLight dark:text-ink-mutedDark">Runtime from supplied benchmark data</div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-ink-mutedLight dark:text-ink-mutedDark mb-1">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span className="font-semibold uppercase font-mono tracking-wider text-[10px]">Measurement protocol</span>
          </div>
          <div className="font-semibold text-ink-light dark:text-ink-dark">
            Single run
          </div>
          <div className="text-[11px] text-ink-mutedLight dark:text-ink-mutedDark">Median wall-clock hrtime</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-ink-mutedLight dark:text-ink-mutedDark" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter repositories or commits..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark text-xs text-ink-light dark:text-ink-dark placeholder-ink-mutedLight focus:outline-none focus:ring-1 focus:ring-accent-blue"
          />
        </div>

        <div className="text-xs font-mono text-ink-mutedLight dark:text-ink-mutedDark">
          Showing {filteredBenchmarks.length} of {benchmarks.length} benchmarked codebases
        </div>
      </div>

      {/* Speed Table */}
      <div className="overflow-x-auto rounded-2xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark shadow-elevated">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-paper-subtleLight/70 dark:bg-paper-subtleDark/50 border-b border-borderLight dark:border-borderDark text-[11px] font-mono uppercase tracking-wider text-ink-mutedLight dark:text-ink-mutedDark">
              <th className="p-4 cursor-pointer hover:text-ink-light select-none" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1.5">
                  <span>Repository</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-ink-light select-none" onClick={() => handleSort('commit')}>
                <div className="flex items-center gap-1.5">
                  <span>Commit</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-ink-light select-none text-right" onClick={() => handleSort('files')}>
                <div className="flex items-center justify-end gap-1.5">
                  <span>Files</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-ink-light select-none text-right" onClick={() => handleSort('astNodes')}>
                <div className="flex items-center justify-end gap-1.5">
                  <span>AST Nodes</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-ink-light select-none text-right" onClick={() => handleSort('timeToFirstViewMs')}>
                <div className="flex items-center justify-end gap-1.5">
                  <span>Time to 1st View</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-ink-light select-none text-right" onClick={() => handleSort('timeToCompleteMs')}>
                <div className="flex items-center justify-end gap-1.5">
                  <span>Complete Graph</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4">Hardware</th><th className="p-4 text-center">Date Tested</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderLight dark:divide-borderDark font-mono">
            {!loading && !error && filteredBenchmarks.length === 0 && <tr><td colSpan={8} className="p-8 text-center">{benchmarks.length ? 'No matching repositories.' : 'results pending'}</td></tr>}
            {filteredBenchmarks.map((b) => (
              <tr key={b.id} className="hover:bg-paper-subtleLight/40 dark:hover:bg-paper-subtleDark/30 transition-colors">
                <td className="p-4">
                  <div className="font-semibold font-sans text-xs text-ink-light dark:text-ink-dark">
                    {b.name}
                  </div>
                  <div className="font-sans text-[11px] text-ink-mutedLight dark:text-ink-mutedDark mt-0.5">
                    {b.description}
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-paper-subtleLight dark:bg-paper-subtleDark border border-borderLight dark:border-borderDark text-[11px] text-accent-blue dark:text-blue-400">
                    <GitCommit className="w-3 h-3" />
                    <span>                    {b.commit || 'pending'}</span>
                  </span>
                </td>
                <td className="p-4 text-right font-medium text-ink-light dark:text-ink-dark">
                  {b.files.toLocaleString()}
                </td>
                <td className="p-4 text-right text-ink-mutedLight dark:text-ink-mutedDark">
                  {b.astNodes == null ? 'not recorded' : b.astNodes.toLocaleString()}
                </td>
                <td className="p-4 text-right">
                  <span className="inline-block px-2 py-0.5 rounded font-semibold text-accent-green bg-accent-greenSoft dark:bg-accent-greenSoftDark text-[11px]">
                    {b.timeToFirstViewFormatted || 'pending'}
                  </span>
                </td>
                <td className="p-4 text-right font-semibold text-ink-light dark:text-ink-dark">
                  {b.timeToCompleteFormatted || 'pending'}
                </td>
                <td className="p-4">{b.hardware}</td>
                <td className="p-4 text-center text-[11px] text-ink-mutedLight dark:text-ink-mutedDark font-sans">
                  {b.dateTested || 'pending'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-xs text-ink-mutedLight dark:text-ink-mutedDark flex items-center justify-between">
        <span>* Time to 1st View measures the delay between running `canopy` and the local HTTP canvas serving an interactive entrypoint tree.</span>
        <a href="/claims" className="text-accent-blue hover:underline">
          View Raw Claims Spec →
        </a>
      </div>

    </div>
  );
}
