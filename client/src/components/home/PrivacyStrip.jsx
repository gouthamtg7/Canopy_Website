import { copyText } from '../common/clipboard';
import React, { useState } from 'react';
import { ShieldCheck, Database, Sliders, Check, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyStrip() {
  const [copiedCmd, setCopiedCmd] = useState('');

  const copyCommand = async (cmd) => {
    if (!await copyText(cmd)) return;
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(''), 2000);
  };

  return (
    <section className="py-16 md:py-20 border-t border-borderLight dark:border-borderDark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-2xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark p-8 md:p-12 shadow-elevated">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-greenSoft dark:bg-accent-greenSoftDark text-accent-green text-xs font-mono mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Strict Privacy Standard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
              Your source code never leaves your workstation.
            </h2>
            <p className="mt-3 text-sm text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
              Canopy runs on your computer. Your code is never sent anywhere by Canopy. The only network use is an update check and a small daily ping (a random install id, version, OS family, Node version, date), which you can turn off any time with canopy telemetry off, CANOPY_TELEMETRY=0 or DO_NOT_TRACK=1. Ask AI runs your own AI tool under your own login.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-borderLight dark:border-borderDark">
            
            {/* Guarantee 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent-greenSoft dark:bg-accent-greenSoftDark text-accent-green flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="font-semibold text-sm text-ink-light dark:text-ink-dark">
                  Local-Only Execution
                </h3>
              </div>
              <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
                AST parsing, function resolution, and graph rendering run inside your local Node.js process. Canopy does not send your source code anywhere.
              </p>
            </div>

            {/* Guarantee 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent-blueSoft dark:bg-accent-blueSoftDark text-accent-blue flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="font-semibold text-sm text-ink-light dark:text-ink-dark">
                  Store Outside Repository
                </h3>
              </div>
              <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
                Cache files live in a user-level cache outside your repository. The exact platform paths are documented in the CLI guide.
              </p>
            </div>

            {/* Guarantee 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-semibold text-sm text-ink-light dark:text-ink-dark">
                  Explicit Telemetry Off Switches
                </h3>
              </div>
              <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
                Turn off the daily ping with any of the following switches:
              </p>
            </div>

          </div>

          {/* Off switch quick copy buttons */}
          <div className="mt-8 pt-6 border-t border-borderLight dark:border-borderDark flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-ink-mutedLight dark:text-ink-mutedDark mr-2">
              Instant Off Switches:
            </span>

            {['canopy telemetry off', 'export CANOPY_TELEMETRY=0', 'export DO_NOT_TRACK=1'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => copyCommand(cmd)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-borderLight dark:border-borderDark bg-paper-subtleLight dark:bg-paper-subtleDark text-xs font-mono text-ink-light dark:text-ink-dark hover:border-ink-mutedLight transition-colors"
                title="Click to copy switch command"
              >
                <span>{cmd}</span>
                {copiedCmd === cmd ? (
                  <Check className="w-3.5 h-3.5 text-accent-green" />
                ) : (
                  <Copy className="w-3.5 h-3.5 opacity-50" />
                )}
              </button>
            ))}

            <Link
              to="/privacy"
              className="text-xs text-accent-blue dark:text-blue-400 hover:underline ml-auto font-medium"
            >
              Read privacy details →
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
