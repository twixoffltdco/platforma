import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';

const RouteError = () => {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Неизвестная ошибка маршрута';

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full rounded-2xl border border-white/15 bg-white/5 p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Не удалось открыть страницу</h1>
        <p className="text-sm text-white/80">
          Попробуйте перейти на главную или обновить страницу.
        </p>
        <p className="text-xs text-red-300 break-words">{message}</p>
        <div className="flex gap-2">
          <Link to="/" className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors">
            На главную
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
          >
            Обновить
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteError;
