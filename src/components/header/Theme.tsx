import { useEffect, useState } from 'react';
import s from './style.module.scss'
import { useTheme } from '@/app/ThemeContext';

interface props {
  text: string,
}

function Theme({text} : props) {
  const { theme, toggleTheme } = useTheme();
  // const {styleClick, setStyleClick} = useState('')
  const [styleClick, setStyleClick] = useState([].join(' '));
  const [themeClass, setThemeClass] = useState([s.theme].join(' '));
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if(theme === 'light') {
      setThemeClass([s.dark].join(' '))
      console.log('light');
    } else if(theme === 'dark') {
      setThemeClass([s.light].join(' '))
      console.log('dark');
    } else {
      console.log('error');
      
    }
    console.log('redrer');
    
    setIsLoaded(true);
  }, []);


  const changeTheme = () => {
    setStyleClick([s.clicked].join(' '));
    setTimeout(() => {
      toggleTheme()
    }, 500);
    setTimeout(() => {
      if(theme === 'light') {
        setThemeClass([s.light].join(' '))
      } else if(theme === 'dark') {
        setThemeClass([s.dark].join(' '))
      }
      setStyleClick([s.notClicked].join(' '));
    }, 2500);
  }

  return ( 
    <div className={s.lightBlock + ' ' + styleClick + ' ' + themeClass}>
      <p className={s.settingsItem}  onClick={changeTheme}>{text}</p>
      <div className={s.lightCyrc}></div>
    </div>
   );
}

export default Theme;