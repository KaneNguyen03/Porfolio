import { useTheme } from '../contexts/ThemeContext';

// Custom hook to force re-render on theme change
export const useThemeClasses = () => {
  const { theme } = useTheme();
  
  return {
    theme,
    // Common theme-aware classes
    page: `min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`,
    card: `bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300`,
    text: {
      primary: `text-gray-900 dark:text-white`,
      secondary: `text-gray-600 dark:text-gray-300`,
      muted: `text-gray-500 dark:text-gray-400`,
    }
  };
};
