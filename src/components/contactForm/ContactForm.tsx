import { FormEvent, useState } from 'react'
import s from './style.module.scss'
import Link from 'next/link'
import ButtonPath from '../buttonPath/ButtonPath'

interface Props {
  heading: string
  name: string
  contact: string
  message: string
  button: string
  policy: string
  policyName: string
  isDesk: boolean
}


interface FormData {
  name: string;
  email: string;
  message: string;
}

function ContactForm({heading,
  name,
  contact,
  message,
  button,
  policy,
  policyName,
  isDesk
} : Props) {
    const [isEmptyName, setIsEmptyName] = useState([s.normal].join(' '));
    const [isEmptycontact, setIsEmptycontact] = useState([s.normal].join(' '));
    const [isEmptyPolicy, setIsEmptyPolicy] = useState([s.normal].join(' '));
    const [isPolicy, setIsPolicy] = useState(false)
    const [statuses, setStatus] = useState<string>('');
    const [formData, setFormData] = useState({name: '',contact: '', message: '' });
    const handleChange = (e : any) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      console.log(formData);
    };

    const setMobClass = () =>{
      if(isDesk) {
        return [s.desk]
      } else {
        return [s.mob]
      }
    }



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    if(isPolicy) {
      setIsEmptyPolicy([s.normal].join(' '))
      if(formData.name != '' && formData.contact != '') {
        setIsEmptyName([s.normal].join(' '))
        setIsEmptycontact([s.normal].join(' '))
        // try {
        //   const response = await fetch('https://wyacheslav.netlify.app/api/sendToTelegram', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData), // Отправляем данные формы в виде JSON
        //   });
    
        //   if (response.ok) {
        //     setStatus('Сообщение успешно отправлено!');
        //     setFormData({ name: '', contact: '', message: '' }); // Очищаем поля формы после отправки
        //   } else {
        //     setStatus('Ошибка при отправке сообщения.');
        //   }
        // } catch (error) {
        //   setStatus('Ошибка сети.');
        // }

          const response = await fetch('/.netlify/functions/sendToTelegram', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const result = await response.json();
          if (result.success) {
            console.log('Message sent successfully');
          } else {
            console.error('Failed to send message:', result.error);
          }
      } else if(formData.name == '' && formData.contact == '') {
        setIsEmptyName([s.red].join(' '))
        setIsEmptycontact([s.red].join(' '))
      } else if(formData.name == '') {
        setIsEmptyName([s.red].join(' '))
        setIsEmptycontact([s.normal].join(' '))
      } else if(formData.contact == '') {
        setIsEmptycontact([s.red].join(' '))
        setIsEmptyName([s.normal].join(' '))
      } else {
        setStatus('something wrong')
      }
    } else {
      setIsEmptyPolicy([s.red].join(' '))
    }

  };


  return ( 
    <form className={s.form + ' ' + setMobClass()} onSubmit={handleSubmit}>
      <p className={s.heading + ' heading'}>{heading}</p>
      <input value={formData.name} type="text" className={s.input + '  ' + isEmptyName} placeholder={name} onChange={handleChange} name="name" />
      <input value={formData.contact} type="text" className={s.input + '  ' + isEmptycontact} placeholder={contact} onChange={handleChange} name="contact" />
      <textarea value={formData.message} onChange={handleChange} name="message" className={s.stextarea + ' ' + s.input} placeholder={message}></textarea>
      <button type='submit' className={s.submt}>{button}</button>
      <label className={s.label  + ' ' + isEmptyPolicy}>
        <input type="checkbox" className={s.policyCheckbox} onChange={()=>{setIsPolicy(isPolicy => !isPolicy)}} />
        <div className={s.policyVisual}>
          <svg className={s.policySvg} viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="2.31421" width="1.84893" height="9.24466" rx="0.924466" transform="rotate(-30 0 2.31421)" fill="#EEEEEE" />
            <rect x="12.6455" width="1.91555" height="12.7328" rx="0.957775" transform="rotate(45 12.6455 0)" fill="#EEEEEE" />
          </svg>
        </div>
        <p className={s.policyText}>{policy} <ButtonPath path={'/policy'} text={policyName} timer={0} /> </p>
      </label>
      <p className={' regularText ' + s.status}>{statuses}</p>
    </form>
    
   );
}

export default ContactForm;