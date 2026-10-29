import React from 'react';
import { CodeBlock } from '../common/CodeBlock';
import { AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export function MarkdownRenderer({ content = '' }) {
  if (!content) return null;

  // Split markdown into blocks by double newlines or code fences
  const lines = content.split(/\r?\n/);
  const elements = [];
  let currentCodeBlock = null;
  let currentTable = null;
  let currentList = null;

  const flushList = () => {
    if (currentList) {
      if (currentList.type === 'ul') {
        elements.push(
          <ul key={`ul-${elements.length}`} className="my-4 ml-6 space-y-2 list-disc text-sm text-ink-light dark:text-ink-dark">
            {currentList.items.map((it, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(it) }} />
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`ol-${elements.length}`} className="my-4 ml-6 space-y-2 list-decimal text-sm text-ink-light dark:text-ink-dark">
            {currentList.items.map((it, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(it) }} />
            ))}
          </ol>
        );
      }
      currentList = null;
    }
  };

  const flushTable = () => {
    if (currentTable) {
      elements.push(
        <div key={`table-${elements.length}`} className="my-6 overflow-x-auto rounded-xl border border-borderLight dark:border-borderDark">
          <table className="w-full text-left text-xs border-collapse">
            {currentTable.headers.length > 0 && (
              <thead>
                <tr className="bg-paper-subtleLight dark:bg-paper-subtleDark border-b border-borderLight dark:border-borderDark">
                  {currentTable.headers.map((h, idx) => (
                    <th key={idx} className="p-3 font-semibold text-ink-light dark:text-ink-dark uppercase tracking-wider text-[11px]" dangerouslySetInnerHTML={{ __html: formatInline(h) }} />
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-borderLight dark:divide-borderDark">
              {currentTable.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-paper-subtleLight/40 dark:hover:bg-paper-subtleDark/30">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-3 text-ink-light dark:text-ink-dark font-normal" dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced Code Block start/end
    if (line.startsWith('```')) {
      if (currentCodeBlock) {
        // End code block
        elements.push(
          <CodeBlock
            key={`code-${elements.length}`}
            code={currentCodeBlock.code.join('\n')}
            language={currentCodeBlock.lang}
          />
        );
        currentCodeBlock = null;
      } else {
        // Start code block
        flushList();
        flushTable();
        const lang = line.replace('```', '').trim() || 'text';
        currentCodeBlock = { lang, code: [] };
      }
      continue;
    }

    if (currentCodeBlock) {
      currentCodeBlock.code.push(line);
      continue;
    }

    // Markdown Table
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      flushList();
      const cells = line.split('|').map((c) => c.trim()).filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1);
      
      // Separator line like |---|---|
      if (line.includes('---')) {
        continue;
      }

      if (!currentTable) {
        currentTable = { headers: cells, rows: [] };
      } else {
        currentTable.rows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    // Horizontal Rule
    if (/^---$|^___$|^\*\*\*$/.test(line.trim())) {
      flushList();
      elements.push(<hr key={`hr-${elements.length}`} className="my-8 border-borderLight dark:border-borderDark" />);
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={`h1-${elements.length}`} className="text-3xl font-bold tracking-tight text-ink-light dark:text-ink-dark mt-8 mb-4">
          {line.replace('# ', '')}
        </h1>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${elements.length}`} className="text-xl sm:text-2xl font-bold tracking-tight text-ink-light dark:text-ink-dark mt-8 mb-3 pb-2 border-b border-borderLight dark:border-borderDark">
          {line.replace('## ', '')}
        </h2>
      );
      continue;
    }
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${elements.length}`} className="text-base sm:text-lg font-semibold text-ink-light dark:text-ink-dark mt-6 mb-2">
          {line.replace('### ', '')}
        </h3>
      );
      continue;
    }

    // Blockquote or Callout
    if (line.startsWith('> ')) {
      flushList();
      const rawText = line.replace('> ', '');
      const isWarning = rawText.toLowerCase().includes('warning') || rawText.toLowerCase().includes('transparency');
      elements.push(
        <div
          key={`quote-${elements.length}`}
          className={`my-4 p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
            isWarning
              ? 'border-amber-300 dark:border-amber-800 bg-accent-amberSoft dark:bg-accent-amberSoftDark text-amber-900 dark:text-amber-200'
              : 'border-borderLight dark:border-borderDark bg-paper-subtleLight/80 dark:bg-paper-subtleDark/60 text-ink-light dark:text-ink-dark'
          }`}
        >
          {isWarning ? <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> : <Info className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />}
          <div dangerouslySetInnerHTML={{ __html: formatInline(rawText) }} />
        </div>
      );
      continue;
    }

    // Lists (unordered)
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const itemText = line.trim().replace(/^[-*]\s+/, '');
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Lists (ordered)
    if (/^\d+\.\s+/.test(line.trim())) {
      const itemText = line.trim().replace(/^\d+\.\s+/, '');
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Regular Paragraph
    if (line.trim().length > 0) {
      flushList();
      elements.push(
        <p
          key={`p-${elements.length}`}
          className="my-3 text-sm leading-relaxed text-ink-light dark:text-ink-dark"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    }
  }

  flushList();
  flushTable();

  return <div className="space-y-1">{elements}</div>;
}

// Inline formatting helper for bold, code, links
function formatInline(text = '') {
  return text
    // Escaped HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-ink-light dark:text-ink-dark">$1</strong>')
    // Inline Code
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded text-[12px] font-mono bg-paper-subtleLight dark:bg-paper-subtleDark border border-borderLight dark:border-borderDark text-accent-blue dark:text-blue-400">$1</code>')
    // Markdown Links [text](href)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
      if (!/^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(href) || /[\s<>]/.test(href)) return label;
      return `<a href="${href}" class="text-accent-blue dark:text-blue-400 hover:underline font-medium">${label}</a>`;
    });
}
