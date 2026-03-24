import React from 'react';
import { Layout } from '../components/Layout';
import { useAppearance } from '../context/appearance';

const Settings: React.FC = () => {
  const { theme, setTheme, gamma, setGamma } = useAppearance();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Настройки профиля</h1>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 space-y-4">
          <h2 className="text-lg font-semibold">Тема приложения</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-red-600 text-white' : 'bg-black/10 dark:bg-white/10'}`}
            >
              Темная
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-xl ${theme === 'light' ? 'bg-red-600 text-white' : 'bg-black/10 dark:bg-white/10'}`}
            >
              Светлая
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 space-y-4">
          <h2 className="text-lg font-semibold">Гамма интерфейса</h2>
          <input
            type="range"
            min={0.7}
            max={1.5}
            step={0.01}
            value={gamma}
            onChange={(e) => setGamma(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-gray-400">Текущая гамма: {gamma.toFixed(2)}</p>
        </section>
      </div>
    </Layout>
  );
};

export default Settings;
