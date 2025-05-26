import React from 'react';
import s from './style.module.scss';

interface Props {
  activeIndex: number;
  numOfSlide: number;
}

interface State {
  classes: string;
}

class FrontBlock extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      classes: s.notActive, // изначально notActive
    };
  }

  componentDidMount() {
    this.updateClasses(this.props.activeIndex, this.props.numOfSlide);
  }

  componentDidUpdate(prevProps: Props) {
    // если props изменились — обновляем класс
    if (
      prevProps.activeIndex !== this.props.activeIndex ||
      prevProps.numOfSlide !== this.props.numOfSlide
    ) {
      this.updateClasses(this.props.activeIndex, this.props.numOfSlide);
    }
  }

  updateClasses(activeIndex: number, numOfSlide: number) {
    const classes = activeIndex === numOfSlide ? s.active : s.notActive;
    this.setState({ classes });
  }

  render() {
    return (
      <div className={`${s.block} ${this.state.classes}`}>
        <div className={`${s.container} container`}>
          <div className={s.heading}>
            <p className={s.headingText}>WYAcheslav</p>
            <p className={`${s.subText} regularText`}>senior</p>
            <p className={`${s.subText} regularText`}>frontend developer</p>
            <p className={`${s.subText} regularText`}>web designer</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FrontBlock;
