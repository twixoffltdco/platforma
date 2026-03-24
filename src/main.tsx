import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router';
import { AppearanceProvider } from './context/appearance';
import { AppErrorBoundary } from './components/AppErrorBoundary';

const renderFatalScreen = (message: string): void => {
  const root = document.getElementById('root');
  if (!root) {
    return;
  }

  root.innerHTML = `
    <div style="min-height:100vh;background:#0f0f0f;color:#fff;display:flex;align-items:center;justify-content:center;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:640px;width:100%;border:1px solid rgba(255,255,255,.2);border-radius:16px;padding:24px;background:rgba(255,255,255,.06)">
        <h1 style="margin:0 0 8px;font-size:24px;">Не удалось запустить интерфейс</h1>
        <p style="margin:0 0 12px;color:rgba(255,255,255,.8);font-size:14px;line-height:1.5;">
          Обновите страницу. Если ошибка повторяется, очистите кэш браузера.
        </p>
        <p style="margin:0;font-size:12px;color:#fca5a5;word-break:break-word;">${message}</p>
      </div>
    </div>
  `;
};

window.addEventListener('error', (event) => {
  const message = event.error instanceof Error ? event.error.message : event.message;
  renderFatalScreen(message || 'Критическая ошибка выполнения');
});

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  const message = reason instanceof Error ? reason.message : String(reason ?? 'Необработанное исключение');
  renderFatalScreen(message);
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root container #root was not found in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <AppErrorBoundary>
      <AppearanceProvider>
        <RouterProvider router={router} />
      </AppearanceProvider>
    </AppErrorBoundary>
  </StrictMode>,
);
