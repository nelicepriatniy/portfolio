// components/Preloader.tsx
'use client'

import React, { useEffect, useState } from 'react';


const Preloader = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Используем событие onLoad, чтобы контролировать завершение загрузки
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 500); // Пример задержки на 1 секунду

    return () => clearTimeout(timer); // Очистка таймера, если компонент размонтируется
  }, []);

  return (
    <div className={isPageLoaded ? 'page-loaded' : 'page-loading'}>
      <div className="loader">
        {/* <div className="spinner"></div> */}

        <div className="lines">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;