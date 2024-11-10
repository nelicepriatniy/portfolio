import React from 'react';
import s from './style.module.scss'
import { GetServerSideProps } from 'next';

interface Props {
  activeIndex: number,
  numOfSlide: number,
}


 
interface FrontBlockState {
  activeIndex: number,
  numOfSlide: number,
  classes: string,
  // heading: string,
}

 
class FrontBlock extends React.Component<Props, FrontBlockState> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      activeIndex: props.activeIndex,
      numOfSlide: props.numOfSlide,
      classes: [s.testClass].join(' '),
      // heading: 
    };
  }

  classBlock(activeIndex: number, numOfSlide: number){
    console.log(this.state);
    
  }

  

  componentDidMount() {
    this.classBlock = (activeIndex: number, numOfSlide: number)=>{
      let classes = [s.active].join(' ')
          if(activeIndex === numOfSlide) {
            classes = [s.active].join(' ')
          } else {
            classes = [s.notActive].join(' ')
          }
          return this.state = {
            activeIndex: this.props.activeIndex,
            numOfSlide: this.props.numOfSlide,
            classes: classes,
          }
    }
    setTimeout(() => {
      this.classBlock(this.props.activeIndex, this.props.numOfSlide)
    }, 50);
  }

  render() { 
      return ( 
        <div className={s.block + ' ' + this.classBlock(this.props.activeIndex, this.props.numOfSlide) + ' ' + this.state.classes}>
          <div className={s.container + ' container'}>
            <div className={s.heading}>
              <p className={s.headingText}>WYAcheslav</p>
              <p className={s.subText + ' regularText'}>senior</p> 
              <p className={s.subText + ' regularText'}>frontend developer</p>
              <p className={s.subText + ' regularText'}>web desinger</p>
            </div>
          </div>
        </div>
       );
  }
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { lang } = context.query;
  const initialLanguage = lang || "en"; // Используйте lang из query или значение по умолчанию

  return {
    props: { initialLanguage },
  };
};
 
export default FrontBlock;