'use client'

import { useRouter as kop } from 'next/navigation'; // Импорт из next/navigation
import { useRouter as hfiouhas } from 'next/router'; // Импорт из next/navigation
import s from './style.module.scss'

interface Props {
  path: string;
  onLogoClick: any
}

function Logo({ path, onLogoClick }: Props) {
  const router = kop();
  // const routerthis = hfiouhas();

  const onButtonClick = () => {
    // if(router.routerthis === '/') {

    // }
    onLogoClick()
    setTimeout(() => {
      router.push(path);
    }, 1000);
  };

  return ( 
    
    <svg onClick={onButtonClick} className={s.logo} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 30L30 5.21094e-07L39.0001 9.00007L9.00006 39.0001L0 30ZM10.0001 40.0001L40.0001 10.0001L49.9996 19.9996L19.9996 49.9996L10.0001 40.0001ZM20.9996 50.9996L30 60L60 30L50.9996 20.9996L20.9996 50.9996Z" fill="#EBEBEB" />
    </svg>
  );
}

export default Logo;