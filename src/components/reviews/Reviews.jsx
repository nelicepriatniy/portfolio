import { useEffect, useState } from 'react';
import RevItem from '../revItem/RevItem';
import s from './style.module.scss';


function Reviews({ activeIndex, numOfSlide, data }) {


  const ReviewsItemsNow = data.dobavit_otzyv
  const [isMob, setIsMob] = useState(false);
  const [item1, setItem1] = useState(0)
  const [item2, setItem2] = useState(1)
  const [item3, setItem3] = useState(2)
  const [classes, setClasses] = useState([s.wrapActive])

  let mobCurrItem;

  const classBlock = (activeIndex, numOfSlide) => {
    if (activeIndex === numOfSlide) {
      return ([s.active].join(' '))
      // return (s.block + ' ' + s.active)
    } else {
      return ([s.notActive].join(' '))
      // return (s.block)
    }
  }

  function getRandomNumber(min, max, excludeNumbers = []) {
    const possibleNumbers = [];
    for (let i = min; i <= max; i++) {
      possibleNumbers.push(i);
    }
    const availableNumbers = possibleNumbers.filter(num => !excludeNumbers.includes(num));
    if (availableNumbers.length === 0) {
      throw new Error('Нет доступных чисел в заданном диапазоне после исключения');
    }
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
  }

  function setItems() {
    if (!isMob) {
      const newItem1 = getRandomNumber(0, ReviewsItemsNow.length - 1);
      const newItem2 = getRandomNumber(0, ReviewsItemsNow.length - 1, [newItem1]);
      const newItem3 = getRandomNumber(0, ReviewsItemsNow.length - 1, [newItem1, newItem2]);

      setItem1(newItem1);
      setItem2(newItem2);
      setItem3(newItem3);
    } else {
      const curItem1 = item1;
      const newItem = getRandomNumber(0, ReviewsItemsNow.length - 1, [curItem1])
      setItem1(newItem)
    }
  }

  const reSetItem = () => {
    setClasses([s.rebuild]);
    setTimeout(() => {
      setItems()
      setClasses([s.wrapActive])
    }, 650)
  }

  useEffect(() => {
    setItems();

    if (window.innerWidth < 1280) {
      setIsMob(true);
    }
  }, []);


  return (
    <section className={s.block + ' container' + ' ' + classBlock(activeIndex, numOfSlide)}>
      <p className={s.heading}>{data.heading}</p>
      <div className={s.wrapper + ' ' + classes}>
        <div className={s.item}>
          <RevItem name={ReviewsItemsNow[item1].imya} desc={ReviewsItemsNow[item1].opisanie} link={ReviewsItemsNow[item1].ssylka} />
        </div>
        {!isMob ? (
          <div className={s.item}>
            <RevItem name={ReviewsItemsNow[item2].imya} desc={ReviewsItemsNow[item2].opisanie} link={ReviewsItemsNow[item2].ssylka} />
          </div>
        ) : null}
        {!isMob ? (
          <div className={s.item}>
            <RevItem name={ReviewsItemsNow[item3].imya} desc={ReviewsItemsNow[item3].opisanie} link={ReviewsItemsNow[item3].ssylka} />
          </div>
        ) : null}
      </div>
      <div className={s.buttons}>
        <button className={s.more} onClick={reSetItem}>{data.tekst_knopki}</button>
      </div>
    </section>
  )
}

export default Reviews;
