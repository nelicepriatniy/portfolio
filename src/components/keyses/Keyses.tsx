// import Swiper from 'swiper';
import KeysItem from '../keysItem/keysItem';
import s from './style.module.scss'
import React, { useState, useEffect, useTransition } from 'react';
import ButtonPath from '../buttonPath/ButtonPath';
import keys1 from '../../../public/keyses/keys1.png'
import keys9 from '../../../public/keyses/keys9.png'
import keys17 from '../../../public/keyses/keys17.png'


interface map {
  id: number
  name: string
  desc: string
  isActive: boolean
  link: string
  instuments: any
  img: string
}


interface Props {
  activeIndex: number,
  numOfSlide: number,
  data: any,
}

function Keyses({ activeIndex, numOfSlide, data }: Props) {
  const [keyses, setKeyses] = useState(data.keyses)
  const [classes, setClasses] = useState([].join(' '))
  const [classesDesc, setClassesDesc] = useState([].join(' '))
  const [activeId, setActiveId] = React.useState(2)
  const [activeDesc, setActiveDesc] = React.useState(keyses[1].desc)

  
  // const heading = useTransition()

  

  const activeItemChange = (id: number) => {
    setClassesDesc([s.changing].join(' '))
    setActiveId(id)
    setTimeout(() => {
      setActiveDesc(data.keyses[id - 1].desc)
    }, 500);
    setTimeout(() => {
      setClassesDesc([s.changingSet].join(' '))
    }, 800);
  }

  useEffect(() => {
    setKeyses(data.keyses)
    if (activeIndex === numOfSlide) {
      setClasses(s.active);
      setTimeout(() => {
        setActiveDesc(data.keyses[1].desc)
        setActiveId(2)
      }, 500);
    } else {
      setClasses(s.notActive);
    }
  }, [activeIndex, numOfSlide, keyses]);

  const removeActiviti = () => {
    setClasses([s.notActive].join(' '))
  }

  

  return (
    <div className={s.keyses + ' container ' + classes}>
      <p className={s.heading + ' heading'}>{data.heading}</p>
      <div className={s.wrapper}>
        {keyses.map(({ id, name, desc, isActive, link, instuments, img }: map ) => {
          if (activeId === id) {
            return (
              <div className={s.item} key={id} >
                <KeysItem
                  isLink={false}
                  id={id}
                  name={name}
                  desc={desc}
                  isActive={true}
                  link={link}
                  instuments={instuments}
                  img={img}
                  onItemClick={activeItemChange}
                />
              </div>
            )
          } else {
            return (
              <div className={s.item} key={id} >
                <KeysItem
                  isLink={false}
                  id={id}
                  name={name}
                  desc={desc}
                  isActive={false}
                  link={link}
                  instuments={instuments}
                  img={img}
                  onItemClick={activeItemChange}
                />
              </div>
            )
          }
        })}
      </div>
      <div className={s.descBlock}>
        <p className={s.desc + ' regularText'  + ' ' + classesDesc}>
          {activeDesc}</p>
        </div>
      <div className={s.seeAllKeysesBlock}>
        <a target='_blank' href={keyses[activeId - 1].link} className={'regularText'}>{data.seeThat}</a>
        {/* <a href="" className={s.seeAllKeyses + ' regularText'}>See All</a> */}
        <div onClick={removeActiviti} className={s.seeAllKeyses + ' regularText'}  >
          <ButtonPath path='/keyses' text={data.seeAll} timer={800} />
        </div>
      </div>

    </div>
  );
}

export default Keyses;