'use client'
import Header from '@/components/header/Header';
import React, { use, useEffect, useState } from 'react';
import { SwiperSlide, Swiper,  } from "swiper/react";
import { Mousewheel, EffectFade  } from 'swiper/modules'
import 'swiper/swiper-bundle.css';

import s from './style.module.scss';
import FronBlock from '@/components/frontBlock/FrontBlock';
import Keyses from '@/components/keyses/Keyses';
import Contacts from '@/components/contacts/Contacts';
import Light from '@/components/light/Light';
import { ThemeProvider } from './ThemeContext';

import dataEn from '@/store/lang/en.json'
import dataRu from '@/store/lang/ru.json'
import ContactsMobForm from '@/components/contactsMobForm/contactsMobForm';


 function Home() {
  const [currentSlides, setCurrentSlides] = React.useState(0)
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0)
  const [lang, setLang] = React.useState('en')
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  // const pathname = useParams();

  let data;

  if(lang === 'ru') {
    data = dataRu
  } else {
    data = dataEn
  }


  const setLangLocal = (lang : string)=>{
    localStorage.setItem('language', lang)
    setActiveSlideIndex( activeSlideIndex + 1);
    
    setTimeout(() => {
      setLang(lang)
    }, 700);

    setTimeout(() => {
      setActiveSlideIndex( activeSlideIndex);
    }, 900);

  }
  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      setLang(storedLang);
    }
    if (typeof window !== 'undefined' && !localStorage.getItem('language')) {
      
      const locale = navigator.language;
      const language = locale.split('-')[0];
      setLang(language); // Устанавливаем язык браузера
    }


    // Функция для проверки ширины экрана
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth <= 1200);
    };

    // Слушаем изменения размера экрана
    window.addEventListener('resize', handleResize);

    // Проверяем при монтировании компонента
    handleResize();

    // Убираем слушатель при размонтировании компонента

    if(window.innerWidth <= 1200) {
      setCurrentSlides(4)
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  return (
    <ThemeProvider>
        <Header texts={data.heading} currentLang={lang} onLangChange={setLangLocal} onLogoClick={()=>{ }} current={currentSlides} activeIntex={activeSlideIndex} />
        <Light slide={activeSlideIndex} current={currentSlides} />
        <Swiper
          className={s.slider}
          direction='vertical'
          speed={400}
          modules={[Mousewheel, EffectFade]}
          effect="fade"
          mousewheel={{ enabled: true, forceToAxis: true, }} // Configuring mousewheel
          // onSwiper={(swiper)=>{setCurrentSlides(swiper.slides.length); setActiveSlideIndex(swiper.activeIndex)}}
          onSlideChangeTransitionStart={(swiper)=>{setActiveSlideIndex(swiper.activeIndex)}}
          onAfterInit={(swiper)=>{setCurrentSlides(swiper.slides.length); setActiveSlideIndex(swiper.activeIndex)}}
        >
          <SwiperSlide>
            <FronBlock activeIndex={activeSlideIndex} numOfSlide={0}  />
          </SwiperSlide>
          <SwiperSlide>
            <Keyses data={data.keyses} activeIndex={activeSlideIndex} numOfSlide={1} />
          </SwiperSlide>
          <SwiperSlide>
            <Contacts data={data.contacts} activeIndex={activeSlideIndex} numOfSlide={2} />
          </SwiperSlide>
          {isScreenSmall && (
          <SwiperSlide >
            <ContactsMobForm data={data.contacts} activeIndex={activeSlideIndex} numOfSlide={3} />
          </SwiperSlide>)
          }
        </Swiper>
    </ThemeProvider>
  );
}

export default  Home