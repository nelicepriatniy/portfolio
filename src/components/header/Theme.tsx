import { useState } from 'react';
import s from './style.module.scss'
import { useTheme } from '@/app/ThemeContext';

interface props {
  text: string,
}

function Theme({text} : props) {
  const { theme, toggleTheme } = useTheme();
  // const {styleClick, setStyleClick} = useState('')
  const [styleClick, setStyleClick] = useState([].join(' '));

  const changeTheme = () => {
    setStyleClick([s.clicked].join(' '));
    setTimeout(() => {
      toggleTheme()
    }, 500);
    setTimeout(() => {
      setStyleClick([s.notClicked].join(' '));
    }, 2000);
  }

  return ( 
    <div className={s.lightBlock + ' ' + styleClick}>
      <p className={s.settingsItem}  onClick={changeTheme}>{text}</p>
      <div className={s.lightCyrc}></div>
    </div>
   );
}

export default Theme;