import React, { useState } from 'react';
import { Bot, Sparkles, Navigation, Link as LinkIcon, Check, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AskAiMcpSection() {
  const [copiedCmd, setCopiedCmd] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(''), 2000);
  };

  return (
    <section className="py-20 md:py-28 bg-paper-subtleLight/30 dark:bg-paper-subtleDark/20 border-t border-borderLight dark:border-borderDark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-accent-blue dark:text-blue-400 mb-2">
            Model Context Protocol & Ask AI
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
            Zero token markups. Use your own AI login.
          </h2>
          <p className="mt-3 text-base text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
            We don't sell marked-up LLM tokens or trap you in hosted chat wrappers. Canopy integrates directly into your terminal or desktop AI assistant via Anthropic's open Model Context Protocol (MCP).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Left: Explanation & Architecture */}
          <div className="space-y-6">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark shadow-subtle">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-accent-blueSoft dark:bg-accent-blueSoftDark text-accent-blue">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-ink-light dark:text-ink-dark">
                  Claude Code supported
                </h3>
              </div>
              <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed mb-3">
                Ask AI runs your own Claude Code tool under your own login. Other AI providers are not yet supported.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-accent-greenSoft dark:bg-accent-greenSoftDark text-accent-green font-semibold">
                  Claude Code: Supported
                </span>
                <span className="px-2 py-0.5 rounded bg-paper-subtleLight dark:bg-paper-subtleDark text-ink-mutedLight dark:text-ink-mutedDark">
                  Other providers: Not yet
                </span>
                <span className="px-2 py-0.5 rounded bg-paper-subtleLight dark:bg-paper-subtleDark text-ink-mutedLight dark:text-ink-mutedDark">
                  Code edits: Not shipped
                </span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark shadow-subtle">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-accent-greenSoft dark:bg-accent-greenSoftDark text-accent-green">
                  <Navigation className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-ink-light dark:text-ink-dark">
                  Clickable "Places" Navigation
                </h3>
              </div>
              <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
                When your AI answers architectural queries, it references exact coordinates using <code className="text-accent-blue font-mono">canopy://node/&lt;path&gt;</code>. Clicking any place in chat jumps the visual canvas directly to that node, spotlighting upstream callers and downstream database queries.
              </p>
            </div>

            {/* One-command install block */}
            <div className="p-4 rounded-xl border border-borderLight dark:border-borderDark bg-paper-subtleLight dark:bg-paper-subtleDark">
              <div className="text-xs font-semibold text-ink-light dark:text-ink-dark mb-1">
                Auto-configure MCP in 1 second:
              </div>
              <div className="flex items-center justify-between font-mono text-xs text-ink-light dark:text-ink-dark bg-paper-cardLight dark:bg-paper-cardDark p-2.5 rounded-lg border border-borderLight dark:border-borderDark">
                <span>canopy install</span>
                <button
                  onClick={() => handleCopy('canopy install')}
                  className="hover:text-accent-blue transition-colors ml-2"
                >
                  {copiedCmd === 'canopy install' ? (
                    <Check className="w-4 h-4 text-accent-green" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="text-[11px] text-ink-mutedLight dark:text-ink-mutedDark mt-2">
                Connects the Canopy MCP server to your supported Claude Code setup.
              </div>
            </div>

          </div>

          {/* Right: Simulated Chat Response with Places */}
          <div className="rounded-2xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark shadow-elevated p-6 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-borderLight dark:border-borderDark mb-4 text-ink-mutedLight dark:text-ink-mutedDark">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-green"></span>
                <span>MCP Tool Execution Session</span>
              </span>
              <span>stdio / json-rpc</span>
            </div>

            {/* User Prompt */}
            <div className="mb-4 p-3 rounded-lg bg-paper-subtleLight dark:bg-paper-subtleDark text-ink-light dark:text-ink-dark">
              <div className="text-[10px] uppercase text-ink-mutedLight dark:text-ink-mutedDark mb-1">Engineer Prompt:</div>
              <div className="font-sans text-xs">"Where does the checkout handler invalidate customer cart stock?"</div>
            </div>

            {/* AI Response */}
            <div className="space-y-3 font-sans text-xs text-ink-light dark:text-ink-dark">
              <div className="text-[10px] uppercase font-mono text-ink-mutedLight dark:text-ink-mutedDark">
                Assistant Response (Canopy MCP Index Assisted):
              </div>
              <p className="leading-relaxed">
                Cart stock is deducted via a multi-stage transaction:
              </p>

              {/* Clickable Place 1 */}
              <div className="p-2.5 rounded-lg border border-accent-blue/30 bg-accent-blueSoft/50 dark:bg-accent-blueSoftDark/50 flex items-center justify-between cursor-pointer group hover:border-accent-blue transition-colors">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <LinkIcon className="w-3.5 h-3.5 text-accent-blue" />
                  <span className="text-accent-blue font-medium">canopy://node/src/routes/cart.ts:94</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-accent-blue text-white group-hover:scale-105 transition-transform">
                  Jump to Node
                </span>
              </div>

              <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
                The router invokes <code className="font-mono text-ink-light dark:text-ink-dark">decrementStock()</code> within an atomic MongoDB session:
              </p>

              {/* Clickable Place 2 */}
              <div className="p-2.5 rounded-lg border border-accent-green/30 bg-accent-greenSoft/50 dark:bg-accent-greenSoftDark/50 flex items-center justify-between cursor-pointer group hover:border-accent-green transition-colors">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <LinkIcon className="w-3.5 h-3.5 text-accent-green" />
                  <span className="text-accent-green font-medium">canopy://node/src/models/Product.ts:182</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-accent-green text-white group-hover:scale-105 transition-transform">
                  Jump to Node
                </span>
              </div>

              <div className="pt-2 text-[11px] font-mono text-ink-mutedLight dark:text-ink-mutedDark flex items-center justify-between border-t border-borderLight dark:border-borderDark">
                <span>Tokens Consumed: 1,280 (vs. 48,000 raw files)</span>
                <span className="text-accent-green font-semibold">97% Token Savings</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
