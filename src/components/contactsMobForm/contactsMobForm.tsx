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

function ContactsMobForm({activeIndex, numOfSlide, data}: Props) {
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
        <div className={s.contactFormContainer}>
          <ContactForm  isDesk={false}
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

export default ContactsMobForm;