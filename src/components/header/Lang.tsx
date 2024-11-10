import s from './style.module.scss'
import { useState } from 'react';

interface Props {
  onLangChange: any,
  currentLang: string,
}

function Lang({onLangChange, currentLang} : Props) {
  const [isOpen, setIsOpen] = useState(false)

  const changeClasses = ()=>{
    setIsOpen(isOpen => !isOpen)
  }
  const closeClasses = ()=>{
    setIsOpen(false)
  }


  const classes = ()=>{
    if(isOpen) {
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
    <div className={s.langContainer + ' ' + classes()} onMouseLeave={closeClasses}>
      <div className={s.langTop} onClick={changeClasses}>
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