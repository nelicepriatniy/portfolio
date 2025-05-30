import ContactForm from '../contactForm/ContactForm'
import s from './style.module.scss'

interface instruments {
  [key: string]: string; // Пример: ключ = строка, значение = строка
}
interface Props {
  activeIndex: number,
  numOfSlide: number
  data: instruments,
}

function Contacts({activeIndex, numOfSlide, data}: Props) {
  const classBlock = (activeIndex: number, numOfSlide: number)=>{
    if(activeIndex === numOfSlide) {
      return ([s.active].join(' '))
      // return (s.block + ' ' + s.active)
    } else {
      return ([s.notActive].join(' '))
      // return (s.block)
    }
  }
  return ( 
    <div className={s.contacts + ' ' + classBlock(activeIndex, numOfSlide)}>
      <div className={s.container + ' container'}>
        <div className={s.contactsLeft}>
          <p className={s.headingL + ' heading'}>{data.heading}</p>
          <p className={s.textL + ' regularText'}>
            {data.text}
          </p>
          <div className={s.list}>
            <div className={s.listTop}>
              <a href="https://t.me/Nelicepriatni" target='_blank' className={s.listTopItem}>Telegram</a>
              <a href="https://vk.com/nelicepriatniy" target='_blank' className={s.listTopItem}>VK</a>
            </div>
            <p className={s.listBtm}>{data.time} </p>
          </div>
        </div>
        <div className={s.contactFormContainer}>
          <ContactForm  isDesk={true}
                        sucsessMessage={data.sucsessMessage}
                        errorMessage={data.errorMessage}
                        heading={data.formHeading} 
                        name={data.formName} 
                        contact={data.formContact} 
                        message={data.formMessage}
                        button={data.formButton}
                        policy={data.formPolicy}
                        policyName={data.policyName}
                        buttonsend={data.buttonsend}
                         />
        </div>
      </div>
    </div>
   );
}

export default Contacts;