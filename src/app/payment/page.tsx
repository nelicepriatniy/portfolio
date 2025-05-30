"use client";

import { useEffect, useState } from "react";
import s from "./style.module.scss";
import { ThemeProvider } from "../ThemeContext";

function PayPage() {
  const [hours, setHours] = useState<any>('часы');
  const [payForHour, setPayForHour] = useState<any>(900);
  const [pay, setPay] = useState<any>(0);

  function go() {
    const timeSplit = hours.split(":");
    let allTime = hours || 0;

    if (timeSplit.length > 1) {
      allTime = 0;
      allTime = Number(timeSplit[0]) * 60 + Number(timeSplit[1]);
      allTime = allTime / 60;
    } else {
      allTime = hours;
    }

    setPay(allTime * payForHour);
  }

  useEffect(() => {
  });

  return (
    <ThemeProvider>
      <div className={s.wraper}>
        <input
          type="text"
          className={s.input}
          placeholder="часы"
          value={hours}
          onChange={(e) => {
            setHours(e.target.value);
          }}
          onFocus={(e)=>{setHours('');}}
        />
        <input
          type="text"
          className={s.input}
          placeholder="ставка в час"
          value={payForHour}
          onChange={(e) => {
            setPayForHour(e.target.value);
          }}
          onFocus={(e)=>{setPayForHour('');}}
        />
        <button className={s.submt} onClick={go}>
          расчитать
        </button>
        <p className={s.itog}>{pay}</p>
      </div>
    </ThemeProvider>
  );
}

export default PayPage;
