
import React, {useEffect} from 'react';
import KeysItem from '../keysItem/keysItem';
import s from './style.module.scss'


interface Props {
  isActiveKeyses: boolean,
  data: any,
}

 
interface KeysBlockState {
  classes: string,
  isActiveKeyses: boolean,
  data: any,
}
class KeysBlock extends React.Component<Props, KeysBlockState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      classes: [s.notActive].join(' '),
      isActiveKeyses: this.props.isActiveKeyses,
      data: this.props.data,
    };
  }

  componentDidMount(): void {
      this.setState({
        classes: [s.active].join(' ')
      })
  }

  componentDidUpdate(prevProps: Props): void {
    // Проверяем, изменился ли isActiveKeyses и отличается ли от текущего состояния
    if (prevProps.isActiveKeyses !== this.props.isActiveKeyses && this.state.isActiveKeyses !== this.props.isActiveKeyses) {
      // Прокручиваем к верху страницы
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Обновляем состояние, только если значение изменилось
      this.setState({
        classes: this.props.isActiveKeyses ? s.active : s.notActive,
        isActiveKeyses: this.props.isActiveKeyses,
      });
    }
  }

  

  render() { 

      return ( 
        
        <div className={s.block + ' ' + this.state.classes}>
          <div className={s.container + ' container'}>
            <p className={s.heading + ' heading'}>{this.props.data.heading}</p>
            <p className={s.text + ' regularText'}>{this.props.data.text}</p>
            <div className={s.wrapper}>
              {this.props.data.keyses.map((el : any) => {
                  return (
                      <div className={s.item} key={el.id} style={{transitionDelay: (el.id / 2) * 100 + 'ms'}} >
                        <KeysItem 
                          isLink={true}
                          id={el.id} 
                          name={el.name} 
                          desc={el.desc} 
                          isActive={false} 
                          link={el.link} 
                          instuments={el.instuments} 
                          img={el.img}
                          onItemClick={()=>{ }}
                        />
                      </div>
                  )
                })}
            </div>
          </div>
        </div>
       );
  }
}
 
export default KeysBlock;