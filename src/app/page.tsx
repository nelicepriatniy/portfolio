"use client";

import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Mousewheel, EffectFade } from "swiper/modules";
import "swiper/swiper-bundle.css";

import s from "./style.module.scss";
import Header from "@/components/header/Header";
import FronBlock from "@/components/frontBlock/FrontBlock";
import Keyses from "@/components/keyses/Keyses";
import Contacts from "@/components/contacts/Contacts";
import Light from "@/components/light/Light";
import { ThemeProvider } from "./ThemeContext";
import ContactsMobForm from "@/components/contactsMobForm/contactsMobForm";

function Home() {
  const [pageDataEn, setPageDataEn] = useState<any>(null);
  const [pageDataRu, setPageDataRu] = useState<any>(null);
  const [currentSlides, setCurrentSlides] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [lang, setLang] = useState("en");
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  const setLangLocal = (lang: string) => {
    localStorage.setItem("language", lang);
    setActiveSlideIndex(activeSlideIndex + 1);

    setTimeout(() => {
      setLang(lang);
    }, 700);

    setTimeout(() => {
      setActiveSlideIndex(activeSlideIndex);
    }, 900);
  };

  useEffect(() => {
    async function getWpData(id: number, setter: any) {
      try {
        const res = await fetch(`https://wwwyacheslav.ru:4443/wp-json/wp/v2/pages/${id}`);
        const json = await res.json();
        setter(json.acf);
        
      } catch (err) {
        console.log(err);
      }
    }

    getWpData(6, setPageDataRu);
    getWpData(14, setPageDataEn);
  }, []);

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setLang(storedLang);
    } else {
      const browserLang = navigator.language.split("-")[0];
      setLang(browserLang);
    }

    const handleResize = () => {
      setIsScreenSmall(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function constructor(dataf: any): [JSX.Element[], number] {
    const slides: JSX.Element[] = [];
    let datal = dataf;
    let count = 0;

    if (lang === "ru") {
      datal = pageDataRu;
    } else {
      datal = pageDataEn;
    }

    if (datal && datal.dobavit_blok) {
      for (let i = 0; i < datal.dobavit_blok.length; i++) {
        const block = datal.dobavit_blok[i];

        if (block.acf_fc_layout === "main_block") {
          slides.push(
            <SwiperSlide key={`main_${i}`}>
              <FronBlock activeIndex={activeSlideIndex} numOfSlide={count} />
            </SwiperSlide>
          );
          count++;
        }

        else if (block.acf_fc_layout === "keysesBlock") {
          slides.push(
            <SwiperSlide key={`keyses_${i}`}>
              <Keyses data={block} activeIndex={activeSlideIndex} numOfSlide={count} />
            </SwiperSlide>
          );
          count++;
        }

        else if (block.acf_fc_layout === "contacts_block") {
          slides.push(
            <SwiperSlide key={`contacts_${i}`}>
              <Contacts data={block} activeIndex={activeSlideIndex} numOfSlide={count} />
            </SwiperSlide>
          );
          count++;

          if (isScreenSmall) {
            slides.push(
              <SwiperSlide key={`contacts_mob_${i}`}>
                <ContactsMobForm data={block} activeIndex={activeSlideIndex} numOfSlide={count} />
              </SwiperSlide>
            );
            count++;
          }
        }
      }
    }

    return [slides, count];
  }

  useEffect(() => {
    if ((lang === "ru" && pageDataRu) || (lang === "en" && pageDataEn)) {
      const [_, count] = constructor(lang === "ru" ? pageDataRu : pageDataEn);
      setCurrentSlides(count);
    }
  }, [pageDataRu, pageDataEn, lang, isScreenSmall]);

useEffect(() => {
  fetch('/api/log');
}, []);

  const [slides] = constructor(lang === "ru" ? pageDataRu : pageDataEn);

  return (
    <ThemeProvider>
      {(lang === "ru" && pageDataRu) && (
        <Header
          texts={pageDataRu.tekst_temy}
          currentLang={lang}
          onLangChange={setLangLocal}
          onLogoClick={() => {}}
          current={currentSlides}
          activeIntex={activeSlideIndex}
        />
      )}
      {(lang === "en" && pageDataEn) && (
        <Header
          texts={pageDataEn.tekst_temy}
          currentLang={lang}
          onLangChange={setLangLocal}
          onLogoClick={() => {}}
          current={currentSlides}
          activeIntex={activeSlideIndex}
        />
      )}

      <Light slide={activeSlideIndex} current={currentSlides} />

      <Swiper
        className={s.slider}
        direction="vertical"
        speed={400}
        modules={[Mousewheel, EffectFade]}
        effect="fade"
        mousewheel={{ enabled: true, forceToAxis: true }}
        onSlideChangeTransitionStart={(swiper) => {
          setActiveSlideIndex(swiper.activeIndex);
        }}
      >
        {slides}
      </Swiper>
    </ThemeProvider>
  );
}

export default Home;
