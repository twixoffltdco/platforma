import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ThemeMode = 'dark' | 'light';

interface AppearanceState {
  theme: ThemeMode;
  gamma: number;
  setTheme: (theme: ThemeMode) => void;
  setGamma: (gamma: number) => void;
}

const STORAGE_KEY = 'platforma.appearance.v1';

const AppearanceContext = createContext<AppearanceState | null>(null);

export const AppearanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [gamma, setGamma] = useState<number>(1);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { theme?: ThemeMode; gamma?: number };
      if (parsed.theme === 'dark' || parsed.theme === 'light') setTheme(parsed.theme);
      if (typeof parsed.gamma === 'number') setGamma(parsed.gamma);
    } catch {
      // ignore bad local storage
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.setProperty('--app-gamma', String(gamma));

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, gamma }));
  }, [theme, gamma]);

  const value = useMemo(
    () => ({
      theme,
      gamma,
      setTheme,
      setGamma: (nextGamma: number) => {
        const clamped = Math.min(1.5, Math.max(0.7, nextGamma));
        setGamma(Number(clamped.toFixed(2)));
      },
    }),
    [theme, gamma],
  );

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
};

export const useAppearance = (): AppearanceState => {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error('useAppearance must be used inside AppearanceProvider');
  }
  return context;
};
