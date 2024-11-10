'use client'

import { useRouter } from 'next/navigation'; // Импорт из next/navigation
import s from './style.module.scss'

interface Props {
  path: string;
  text: string;
  timer: number;
}

function ButtonPath({ path, text, timer }: Props) {
  const router = useRouter();

  const onButtonClick = () => {
    setTimeout(() => {
      router.push(path);
    }, timer);
  };

  return ( 
    <button className={s.button + ' regularText'} onClick={onButtonClick}>
      {text}
    </button>
  );
}

export default ButtonPath;