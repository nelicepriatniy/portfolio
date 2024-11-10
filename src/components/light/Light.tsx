import s from './style.module.scss'

interface props {
  slide: number,
  current: number,
}

function Light({slide, current}: props) {
  const classNum = (i : number)=>{
    if(i == 0) {
      return [s.num0]
    } else if(i == 1) {
      return [s.num1]
    } else if(i == 2) {
      return [s.num2]
    } else if (i > 2) {
      return [s.num2]
    }
  }



  return ( 
    <div className={s.light + ' ' + classNum(slide)}></div>
   );
}

export default Light;