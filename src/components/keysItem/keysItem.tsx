import Image from 'next/image';
import s from './style.module.scss'

interface instrumentProps {
  name: string,
  id: number
}

interface props {
  name: string,
  desc: string,
  isActive: boolean,
  link: string,
  instuments: instrumentProps[],
  img: any,
  id: string,
  isLink: boolean,
  onItemClick: (id: string) => void; // Тип для функции
}

function KeysItem({name, desc, isActive, link, instuments, img, id, isLink, onItemClick}: props) {
  const onItemClickLocal = ()=>{
    onItemClick(id)
  }

  const activeClasses = ()=>{
    if(isActive) {
      return [s.active]
    } else {
      return
    }
  }

  const isLinkRender = ()=>{
    if(isLink) {
      return (
        <a target='_blank' href={link} className={s.link}></a>
      )
    }
  }

  const isLinkDesk = ()=>{
    if(isLink) {
      return [s.linkedin]
    } else {
      return [s.notLinkedin]
    }
  }

  return ( 
    <div data-id={id} className={s.item + ' ' + activeClasses() + ' ' + isLinkDesk()} onClick={onItemClickLocal}>
      {isLinkRender()}
      <div className={s.top}>
        <Image className={s.img} src={img} width={300} height={300} alt={name + 'image'} />
        <div className={s.topInfo}>
          <p className={s.topInfoText + ' regularText'}>
            {name}
          </p>
        </div>
      </div>
      <div className={s.btm}>
        {instuments.map(({ name, id })=>(
          <div key={id} className={s.instrument}>{name}</div>
        ))}
      </div>
      <div className={s.desk}>
        <p className={s.descText + ' regularText'}> {desc}</p>
      </div>
    </div>
   );
}

export default KeysItem;