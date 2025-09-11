
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getIcon = () => {
    return theme === 'dark'
      ? <i className="bi bi-sun-fill"></i>
      : <i className="bi bi-moon-fill"></i>;
  };

  const getTooltip = () => {
    return theme === 'dark'
      ? 'Light Mode'
      : 'Dark Mode';
  };

  return (
    <button
      className="nav-button d-flex align-items-center justify-content-center"
      onClick={cycleTheme}
      title={getTooltip()}
      style={{ width: '40px', height: '40px' }}
    >
      {getIcon()}
    </button>
  );
};

export default ThemeToggle;
