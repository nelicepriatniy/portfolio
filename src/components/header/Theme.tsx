import { useEffect, useState, useMemo } from 'react';
import s from './style.module.scss';
import { useTheme } from '@/app/ThemeContext';

interface Props {
  text: string;
}

function Theme({ text }: Props) {
  const { theme, toggleTheme } = useTheme();
  const [styleClick, setStyleClick] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Использование useMemo для классов
  const themeClass = useMemo(() => {
    if (theme === 'dark') return s.dark;
    if (theme === 'light') return s.light;
    return s.theme;  // или дефолтный класс, если тема не задана
  }, [theme]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const changeTheme = () => {
    setStyleClick(s.clicked);
    setTimeout(() => {
      toggleTheme();
    }, 500);

    // Убираем класс по завершению
    setTimeout(() => {
      setStyleClick(s.notClicked);
    }, 2500);
  };

  return (
    <div className={`${s.lightBlock} ${styleClick} ${themeClass}`}>
      <p className={s.settingsItem} onClick={changeTheme}>{text}</p>
      <div className={s.lightCyrc}></div>
    </div>
  );
}

export default Theme;
