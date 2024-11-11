import { useEffect, useState } from 'react';
import s from './style.module.scss'
import { useTheme } from '@/app/ThemeContext';

interface props {
  text: string,
}

function Theme({text} : props) {
  // useEffect(() => {
  //   if(theme === 'dark') {
  //     setThemeClass([s.light].join(' '))
  //   } else if(theme === 'light') {
  //     setThemeClass([s.dark].join(' '))
  //   } else {
  //   }
    
  //   setIsLoaded(true);
  // }, [theme]);


  // const changeTheme = () => {
  //   setStyleClick([s.clicked].join(' '));
  //   setTimeout(() => {
  //     toggleTheme()
  //   }, 500);
  //   setTimeout(() => {
  //     if(theme === 'light') {
  //       setThemeClass([s.light].join(' '))
  //     } else if(theme === 'dark') {
  //       setThemeClass([s.dark].join(' '))
  //     }
  //     setStyleClick([s.notClicked].join(' '));
  //   }, 2500);
  // }

  return ( 
    <div className={s.lightBlock}>
      <p className={s.settingsItem}>{text}</p>
      <div className={s.lightCyrc}></div>
    </div>
   );
}

export default Theme;