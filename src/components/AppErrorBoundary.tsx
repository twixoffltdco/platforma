import React from 'react';

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class AppErrorBoundary extends React.Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      message: '',
    };
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || 'Неизвестная ошибка интерфейса',
    };
  }

  componentDidCatch(error: Error): void {
    console.error('Critical UI error:', error);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center p-6">
          <div className="max-w-xl w-full rounded-2xl border border-white/15 bg-white/5 p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Интерфейс временно недоступен</h1>
            <p className="text-sm text-white/80">
              Произошла ошибка рендеринга. Обычно помогает перезагрузка страницы.
            </p>
            <p className="text-xs text-red-300 break-words">{this.state.message}</p>
            <button
              onClick={this.handleReload}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors"
            >
              Перезагрузить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
