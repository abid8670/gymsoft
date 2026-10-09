import React, { createContext, useContext, useState, useEffect } from 'react';

export const COLOR_PRESETS = [
  { id: 'volt', name: 'Volt Lime (Default)', hex: '#c6f432', textColor: '#0a0c06' },
  { id: 'cyan', name: 'Cyber Cyan', hex: '#00f0ff', textColor: '#051318' },
  { id: 'orange', name: 'Flame Orange', hex: '#ff5722', textColor: '#ffffff' },
  { id: 'violet', name: 'Electric Violet', hex: '#a855f7', textColor: '#ffffff' },
  { id: 'rose', name: 'Neon Rose', hex: '#ff2a85', textColor: '#ffffff' },
  { id: 'emerald', name: 'Emerald Matrix', hex: '#10b981', textColor: '#ffffff' },
];

function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function getLuminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('gymsoft_theme_mode') || 'dark';
  });

  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('gymsoft_theme_color') || '#c6f432';
  });

  // Apply mode to html element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(mode);
    localStorage.setItem('gymsoft_theme_mode', mode);
  }, [mode]);

  // Apply dynamic color variables to root
  useEffect(() => {
    try {
      const { r, g, b } = hexToRgb(primaryColor);
      const lum = getLuminance(r, g, b);
      const onPrimary = lum > 0.4 ? '#0a0c06' : '#ffffff';

      const root = document.documentElement;
      root.style.setProperty('--color-primary', primaryColor);
      root.style.setProperty('--color-primary-rgb', `${r}, ${g}, ${b}`);
      root.style.setProperty('--color-primary-glow', `rgba(${r}, ${g}, ${b}, 0.42)`);
      root.style.setProperty('--color-primary-light', `rgba(${r}, ${g}, ${b}, 0.14)`);
      root.style.setProperty('--color-on-primary', onPrimary);

      localStorage.setItem('gymsoft_theme_color', primaryColor);
    } catch (e) {
      console.error('Error applying theme color', e);
    }
  }, [primaryColor]);

  const toggleMode = () => {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const selectPreset = (hex) => {
    setPrimaryColor(hex);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        primaryColor,
        setPrimaryColor,
        selectPreset,
        presets: COLOR_PRESETS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
