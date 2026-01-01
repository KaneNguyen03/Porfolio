import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

let localStorageAvailable: boolean | null = null;

const canUseLocalStorage = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (localStorageAvailable !== null) return localStorageAvailable;

  try {
    const testKey = '__portfolio_theme_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    localStorageAvailable = true;
  } catch {
    localStorageAvailable = false;
  }

  return localStorageAvailable;
};

const readStoredTheme = (): Theme | null => {
  if (!canUseLocalStorage()) return null;
  try {
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return null;
  } catch {
    localStorageAvailable = false;
    return null;
  }
};

const writeStoredTheme = (theme: Theme) => {
  if (!canUseLocalStorage()) return;
  try {
    window.localStorage.setItem('theme', theme);
  } catch {
    localStorageAvailable = false;
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Only check localStorage and system preference on client side
    if (typeof window !== 'undefined') {
      const storedTheme = readStoredTheme();
      if (storedTheme) return storedTheme;
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);

    // Save to localStorage (may be blocked by tracking prevention)
    writeStoredTheme(theme);
    
    // Update color scheme for better browser integration
    if (theme === 'dark') {
      root.style.colorScheme = 'dark';
    } else {
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
