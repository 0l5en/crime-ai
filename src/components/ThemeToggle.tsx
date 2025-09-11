
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getIcon = () => {
    return theme === 'dark' 
      ? <i className="bi bi-moon-fill"></i>
      : <i className="bi bi-sun-fill"></i>;
  };

  const getTooltip = () => {
    return theme === 'dark' 
      ? 'Dark Mode' 
      : 'Light Mode';
  };

  return (
    <button
      className="theme-toggle d-flex align-items-center justify-content-center"
      onClick={cycleTheme}
      title={getTooltip()}
      style={{ width: '40px', height: '40px' }}
    >
      {getIcon()}
    </button>
  );
};

export default ThemeToggle;
