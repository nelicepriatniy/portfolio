"use client";
import s from "./style.module.scss";
import Header from "@/components/header/Header";
import React, { useEffect, useState } from "react";
import "swiper/swiper-bundle.css";

import Light from "@/components/light/Light";
import KeysesBlock from "@/components/keysesBlock/KeysesBlock";
import { ThemeProvider } from "../ThemeContext";

import dataEn from "@/store/lang/en.json";
import dataRu from "@/store/lang/ru.json";

export default function Home() {
  const [pageDataEn, setPageDataEn] = useState<any>(null);
  const [pageDataRu, setPageDataRu] = useState<any>(null);
  const [currentSlides, setCurrentSlides] = React.useState(1);
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(1);
  const [isActiveKeyses, setIsActiveKeyses] = React.useState(true);
  const [lang, setLang] = React.useState("en");
  let data;

  useEffect(() => {
    async function getWpData(id: number, setter: any) {
      try {
        const res = await fetch(`https://wwwyacheslav.ru:8443/wp-json/wp/v2/pages/${id}`);
        const json = await res.json();
        setter(json.acf);
        
      } catch (err) {
        console.log(err);
      }
    }

    getWpData(6, setPageDataRu);
    getWpData(14, setPageDataEn);
  }, []);

  if (lang === "ru") {
    data = dataRu;
  } else {
    data = dataEn;
  }

  const setLangLocal = (lang: string) => {
    localStorage.setItem("language", lang);
    setActiveSlideIndex(activeSlideIndex + 1);
    setIsActiveKeyses(false);
    setTimeout(() => {
      setLang(lang);
    }, 700);
    setTimeout(() => {
      setIsActiveKeyses(true);
    }, 1000);
  };
  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setLang(storedLang);
    }
    if (typeof window !== "undefined" && !localStorage.getItem("language")) {
      const locale = navigator.language;
      const language = locale.split("-")[0];
      setLang(language); // Устанавливаем язык браузера
    }
  }, []);

  const toggleClass = () => {
    setIsActiveKeyses((isActiveKeyses) => !isActiveKeyses);
    setCurrentSlides(0);
  };

  return (
    <ThemeProvider>
      <main className={s.main}>
        {(lang === "ru" && pageDataRu) &&
          <Header
            texts={pageDataRu.tekst_temy}
            currentLang={lang}
            onLangChange={setLangLocal}
            onLogoClick={toggleClass}
            current={currentSlides}
            activeIntex={activeSlideIndex}
          />
        }
        {(lang === "en" && pageDataEn) &&
          <Header
            texts={pageDataEn.tekst_temy}
            currentLang={lang}
            onLangChange={setLangLocal}
            onLogoClick={toggleClass}
            current={currentSlides}
            activeIntex={activeSlideIndex}
          />
        }
        <Light slide={currentSlides} current={currentSlides} />
        {/* <KeysesBlock data={data.keysesPage} isActiveKeyses={isActiveKeyses} /> */}
        {lang === "ru" && pageDataRu && pageDataRu.dobavit_kejs_page && (
  <KeysesBlock data={{ keyses: pageDataRu.dobavit_kejs_page, heading: pageDataRu.heading, text : pageDataRu.text }} isActiveKeyses={isActiveKeyses} />
)}

{lang === "en" && pageDataEn && pageDataEn.dobavit_kejs_page && (
  <KeysesBlock data={{ keyses: pageDataEn.dobavit_kejs_page, heading: pageDataEn.heading, text : pageDataEn.text }} isActiveKeyses={isActiveKeyses} />
)}

      </main>
    </ThemeProvider>
  );
}
