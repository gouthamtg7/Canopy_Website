import React, { useState } from 'react';
import { Play, Pause, ZoomIn, ZoomOut, Layers, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

export function DemoSlot() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedNode, setSelectedNode] = useState('orderService');

  const nodes = [
    {
      id: 'routeNode',
      type: 'route',
      label: 'POST /api/checkout',
      file: 'src/routes/checkout.ts:18',
      color: 'border-accent-blue bg-accent-blueSoft dark:bg-accent-blueSoftDark text-accent-blue dark:text-blue-400',
      badge: 'HTTP Entrypoint',
      description: 'Express endpoint accepting card token and cart payload',
    },
    {
      id: 'authMiddleware',
      type: 'middleware',
      label: 'requireUserAuth()',
      file: 'src/middleware/auth.ts:42',
      color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300',
      badge: 'Middleware',
      description: 'JWT verification and user session hydration',
    },
    {
      id: 'orderService',
      type: 'service',
      label: 'orderService.processPayment()',
      file: 'src/services/order.ts:89',
      color: 'border-accent-green bg-accent-greenSoft dark:bg-accent-greenSoftDark text-accent-green dark:text-emerald-400',
      badge: 'Domain Logic',
      description: 'Calculates sales tax, validates inventory stock, and calls gateway',
    },
    {
      id: 'dbNode',
      type: 'database',
      label: 'Order.create() [Mongoose]',
      file: 'src/models/Order.ts:14',
      color: 'border-accent-red bg-accent-redSoft dark:bg-accent-redSoftDark text-accent-red dark:text-rose-400',
      badge: 'Database Entity',
      description: 'MongoDB write transaction with atomic inventory decrement',
    },
    {
      id: 'stripeNode',
      type: 'external',
      label: 'stripe.charges.create()',
      file: 'src/integrations/stripe.ts:31',
      color: 'border-amber-500 bg-accent-amberSoft dark:bg-accent-amberSoftDark text-amber-700 dark:text-amber-400',
      badge: 'External Gateway',
      description: 'Third-party PCI-compliant payment charge API',
    },
  ];

  const activeNode = nodes.find((n) => n.id === selectedNode) || nodes[2];

  return (
    <section className="py-12 bg-paper-subtleLight/30 dark:bg-paper-subtleDark/20 border-y border-borderLight dark:border-borderDark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-paper-subtleLight dark:bg-paper-subtleDark border border-borderLight dark:border-borderDark text-ink-mutedLight dark:text-ink-mutedDark">
                Interactive Canvas Simulator
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-semibold">
                Interactive local simulation
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
              Explore an architectural slice in real time
            </h2>
            <p className="text-xs sm:text-sm text-ink-mutedLight dark:text-ink-mutedDark mt-1">
              Click any node in the interactive graph below to inspect AST caller paths, confidence tiers, and source locations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark text-xs font-medium text-ink-light dark:text-ink-dark hover:border-ink-mutedLight transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-accent-red" /> : <Play className="w-3.5 h-3.5 text-accent-green" />}
              <span>{isPlaying ? 'Pause Simulation' : 'Simulate Request Flow'}</span>
            </button>
          </div>
        </div>

        {/* Visual Map Canvas Box */}
        <div className="relative rounded-2xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark shadow-elevated overflow-hidden">
          
          {/* Top toolbar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-borderLight dark:border-borderDark bg-paper-subtleLight/60 dark:bg-paper-subtleDark/40 text-xs font-mono text-ink-mutedLight dark:text-ink-mutedDark">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-green"></span>
                <span>Workflow: Checkout & Payment</span>
              </span>
              <span className="hidden sm:inline text-borderLight dark:text-borderDark">|</span>
              <span className="hidden sm:inline">5 Nodes • 4 Edges • Solid and dashed links</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2 py-0.5 rounded bg-paper-cardLight dark:bg-paper-cardDark border border-borderLight dark:border-borderDark">
                localhost:4422
              </span>
            </div>
          </div>

          {/* Graph View Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[380px]">
            
            {/* Interactive Graph Surface (Left 2 cols) */}
            <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-paper-subtleLight/20 to-transparent dark:from-paper-subtleDark/10">
              
              {/* Subtle background grid */}
              <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
                  backgroundSize: '16px 16px',
                }}
              ></div>

              {/* Render Node Sequence */}
              <div className="w-full max-w-lg space-y-3 relative z-10">
                {nodes.map((node, index) => {
                  const isSelected = selectedNode === node.id;
                  const isHighlighted = isPlaying;

                  return (
                    <div key={node.id} className="relative">
                      {/* Connection Edge Line */}
                      {index > 0 && (
                        <div className="h-4 flex items-center justify-center my-0.5">
                          <div
                            className={`w-0.5 h-full transition-colors duration-300 ${
                              isHighlighted
                                ? 'bg-accent-blue animate-pulse'
                                : 'bg-borderLight dark:bg-borderDark'
                            }`}
                          ></div>
                        </div>
                      )}

                      {/* Node Pill */}
                      <button
                        onClick={() => setSelectedNode(node.id)}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between shadow-subtle ${
                          isSelected
                            ? `${node.color} ring-2 ring-accent-blue/30 scale-[1.02]`
                            : 'border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark hover:border-ink-mutedLight dark:hover:border-ink-mutedDark'
                        }`}
                      >
                        <div className="min-w-0 pr-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase tracking-wider bg-paper-subtleLight dark:bg-paper-subtleDark text-ink-mutedLight dark:text-ink-mutedDark">
                              {node.badge}
                            </span>
                            <span className="text-[11px] font-mono text-ink-mutedLight dark:text-ink-mutedDark truncate">
                              {node.file}
                            </span>
                          </div>
                          <div className="font-mono text-xs sm:text-sm font-semibold truncate text-ink-light dark:text-ink-dark">
                            {node.label}
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5">
                          <span className="inline-block w-2 h-2 rounded-full bg-accent-green" title="Exact code relationship"></span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inspector Panel (Right col) */}
            <div className="p-6 border-t lg:border-t-0 lg:border-l border-borderLight dark:border-borderDark bg-paper-subtleLight/40 dark:bg-paper-subtleDark/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-borderLight dark:border-borderDark mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-light dark:text-ink-dark flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-accent-blue" />
                    Node Inspector
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent-greenSoft dark:bg-accent-greenSoftDark text-accent-green">
                    Exact
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-mono text-ink-mutedLight dark:text-ink-mutedDark block mb-0.5">
                      Symbol Identifier
                    </label>
                    <code className="text-xs font-mono font-semibold text-ink-light dark:text-ink-dark block bg-paper-cardLight dark:bg-paper-cardDark p-2 rounded border border-borderLight dark:border-borderDark">
                      {activeNode.label}
                    </code>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono text-ink-mutedLight dark:text-ink-mutedDark block mb-0.5">
                      Source Location
                    </label>
                    <div className="text-xs font-mono text-accent-blue dark:text-blue-400">
                      {activeNode.file}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono text-ink-mutedLight dark:text-ink-mutedDark block mb-0.5">
                      Execution Role
                    </label>
                    <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
                      {activeNode.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-borderLight dark:border-borderDark">
                    <label className="text-[10px] uppercase font-mono text-ink-mutedLight dark:text-ink-mutedDark block mb-1">
                      Deep Link Place URI
                    </label>
                    <code className="text-[11px] font-mono text-ink-mutedLight dark:text-ink-mutedDark bg-paper-cardLight dark:bg-paper-cardDark px-2 py-1 rounded block truncate border border-borderLight dark:border-borderDark">
                      canopy://node/{activeNode.file}
                    </code>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-borderLight dark:border-borderDark text-[11px] text-ink-mutedLight dark:text-ink-mutedDark flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-green shrink-0" />
                <span>Computed locally in 0.78s via Tree-sitter AST</span>
              </div>
            </div>

          </div>

          {/* Founder Placeholder Footer Callout */}
          <div className="px-4 py-2.5 bg-paper-subtleLight/80 dark:bg-paper-subtleDark/80 border-t border-borderLight dark:border-borderDark flex items-center justify-between text-xs text-ink-mutedLight dark:text-ink-mutedDark">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Interactive simulation available while the recorded demo is pending.</span>
            </span>
            <span className="font-mono text-[11px]">No simulated metrics</span>
          </div>

        </div>

      </div>
    </section>
  );
}
