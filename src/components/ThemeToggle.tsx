
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { theme, setTheme, actualTheme } = useTheme();

  const cycleTheme = () => {
    switch (theme) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('auto');
        break;
      case 'auto':
        setTheme('light');
        break;
    }
  };

  const getIcon = () => {
    if (theme === 'auto') {
      return <i className="bi bi-circle-half"></i>;
    }
    return actualTheme === 'dark' 
      ? <i className="bi bi-moon-fill"></i>
      : <i className="bi bi-sun-fill"></i>;
  };

  const getTooltip = () => {
    switch (theme) {
      case 'light':
        return 'Hell-Modus aktiv';
      case 'dark':
        return 'Dunkel-Modus aktiv';
      case 'auto':
        return 'System-Modus aktiv';
    }
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
