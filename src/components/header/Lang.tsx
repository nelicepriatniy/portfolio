import s from './style.module.scss'
import { useState } from 'react';

interface Props {
  onLangChange: any,
  currentLang: string,
}

function Lang({onLangChange, currentLang} : Props) {
  const [isActive, setIsActive] = useState(false)

  const classes = ()=>{
    if(isActive) {
      return [s.open]
    } else {
      return[s.close]
    }
  }

  const langChange = (lang : string) => {
    onLangChange(lang)
  }

  const toggleLang = ()=>{
    if(currentLang == 'ru') {
      return 'en'
    } else if(currentLang == 'en') {
      return 'ru'
    } else {
      return 'en'
    }
  }

  

  return ( 
    <div className={s.langContainer + ' ' + classes()} >
      <div className={s.langTop} >
        <p className={s.settingsItem} onClick={()=>{langChange(toggleLang())}} >{currentLang}</p>
      </div>
      {/* <div className={s.langBtm}>
        <p className={s.settingsItem} onClick={()=>{langChange('en')}}>En</p>
        <p className={s.settingsItem}onClick={()=>{langChange('ru')}}>Ru</p>
      </div> */}
    </div>
   );
}

export default Lang;