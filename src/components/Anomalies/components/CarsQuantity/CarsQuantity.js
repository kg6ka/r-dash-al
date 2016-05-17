import React, { Component, PropTypes } from 'react';
const { number } = PropTypes;
import whitecar from './images/whiteCar.svg';

export default class CarsQuantity extends Component {
  static propTypes = {
    cars: number,
    offset: number,
    x: number,
    y: number,
  };

  constructor(props) {
    super(props);
    this.screenWidth = window.innerWidth;
  }

  render() {
    const { cars, x, y } = this.props;
    const koef = cars.toString().length;
    const fontSize = this.screenWidth / 106.7;
    const fontWidth = this.screenWidth / 180;
    const offset = (fontWidth + this.screenWidth / 120);
    const textX = x - offset / 2;
    const imageX = x + koef * fontWidth / 2;
    return (
      <g>
        <text
          x={ textX }
          y={ y }
          fontSize={ fontSize }
          fontFamily="modeka"
          fill="white"
          style={{ textAnchor: 'middle' }}
        >{ cars }</text>
        <image
          x={ imageX }
          y={ y - fontSize / 1.3 }
          xlinkHref={ whitecar }
          width={ this.screenWidth / 120 }
          height={ this.screenWidth / 120 }
        />
      </g>
    );
  }
}
