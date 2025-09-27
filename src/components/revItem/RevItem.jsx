import s from './style.module.scss';

function RevItem({ name, link, desc }) {
  return (
    <div className={s.item}>
      <div className={s.top}>
        <p className={s.name}>{name}</p>
        <a href={link} className={s.link}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 0V10.6357H11.2266V2.95508L1.18164 13L0 11.8184L10.0459 1.77246H2.36328V0H13Z" fill="white" />
          </svg>
        </a>
      </div>
      <div className={s.desc}>
        <p className={s.text}>{desc}</p>
      </div>
    </div>
  )

}


export default RevItem;
