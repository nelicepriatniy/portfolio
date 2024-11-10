'use client'
import s from './style.module.scss'
import Header from '@/components/header/Header';
import React, { useEffect } from 'react';
import 'swiper/swiper-bundle.css';

import Light from '@/components/light/Light';
import KeysesBlock from '@/components/keysesBlock/KeysesBlock';
import { ThemeProvider } from '../ThemeContext';

import dataEn from '@/store/lang/en.json'
import dataRu from '@/store/lang/ru.json'

export default function Home() {
  const [currentSlides, setCurrentSlides] = React.useState(1)
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(1)
  const [isActiveKeyses, setIsActiveKeyses] = React.useState(true)
  const [lang, setLang] = React.useState('en')
  let data;

  if(lang === 'en') {
    data = dataEn
  } else {
    data = dataRu
  }


  const setLangLocal = (lang : string)=>{
    localStorage.setItem('language', lang)
    setActiveSlideIndex( activeSlideIndex + 1);
    setIsActiveKeyses(false)
    setTimeout(() => {
      setLang(lang)
    }, 700);
    setTimeout(() => {
      setIsActiveKeyses(true)
      console.log(isActiveKeyses);
    }, 1000);
    
  }
  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      setLang(storedLang);
    }
    if (typeof window !== 'undefined' && !localStorage.getItem('language')) {
      console.log(localStorage.getItem('language'));
      
      const locale = navigator.language;
      const language = locale.split('-')[0];
      setLang(language); // Устанавливаем язык браузера
      console.log(localStorage.getItem('language'));

    }
  }, []);
  

  const toggleClass = () => {
    setIsActiveKeyses(isActiveKeyses => !isActiveKeyses);
    setCurrentSlides(0)
  };

  


  return (
    <ThemeProvider>
      <main className={s.main}>
        <Header texts={data.heading} currentLang={lang} onLangChange={setLangLocal} onLogoClick={toggleClass} current={currentSlides} activeIntex={activeSlideIndex} />
        <Light slide={currentSlides} current={currentSlides} />
        {/* <SampleText heading="Keyses" text="In this page you can see all my best keyses" /> */}
        <KeysesBlock data={data.keysesPage} isActiveKeyses={isActiveKeyses} />
      </main>
    </ThemeProvider>
  );
}