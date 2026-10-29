import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-paper-cardLight dark:bg-paper-cardDark border border-borderLight dark:border-borderDark rounded-xl p-8 shadow-elevated text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-redSoft dark:bg-accent-redSoftDark text-accent-red mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-ink-light dark:text-ink-dark mb-2">
              Application Error
            </h2>
            <p className="text-sm text-ink-mutedLight dark:text-ink-mutedDark mb-6">
              A rendering error occurred. The component tree has been caught safely to prevent application crash.
            </p>
            {this.state.error?.message && (
              <pre className="text-xs bg-paper-subtleLight dark:bg-paper-subtleDark p-3 rounded text-left font-mono overflow-x-auto text-ink-mutedLight dark:text-ink-mutedDark mb-6 border border-borderLight dark:border-borderDark">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-ink-light text-paper-light hover:bg-neutral-800 dark:bg-ink-dark dark:text-ink-light dark:hover:bg-neutral-200 text-sm font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
