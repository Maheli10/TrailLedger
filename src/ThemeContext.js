// Keeps the light / dark mode choice and saves it on the phone
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { palettes, makeStyles } from './theme';
import { load, save, KEYS } from './storage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    load(KEYS.theme, 'light').then((m) => { setMode(m); setReady(true); });
  }, []);

  const toggle = () => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    save(KEYS.theme, next);
  };

  const value = useMemo(() => {
    const colors = palettes[mode];
    return { mode, isDark: mode === 'dark', colors, s: makeStyles(colors), toggle };
  }, [mode]);

  if (!ready) return null;
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
