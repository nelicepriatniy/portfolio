import { useEffect } from 'react';
import s from './style.module.scss'

interface props {
  data: any,
  isMain: boolean,
  isActiveKeyses: boolean,
}

function SampleText({data, isMain, isActiveKeyses}: props) {

  
  const isActiveClass = ()=>{
    if(isActiveKeyses) {
      return [s.active]
    } else {
      return [s.notActive]
    }
  }


  const mainHeading = () => {
    if(!isMain) {
      return [s.notMain]
    }
  }

  return ( 
    <div className={s.textBlock  + ' ' + mainHeading() + ' ' + isActiveClass()}>
      <div className={s.container + ' container'}>
        <p className={s.heading + ' heading' + ' ' + mainHeading()}>{data.heading}</p>
        <p className={s.text + ' regularText'}>{data.text}</p>
      </div>
    </div>
   );
}

export default SampleText;