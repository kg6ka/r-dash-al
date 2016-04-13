import React, { Component, PropTypes } from 'react';
const { number } = PropTypes;
import { ViewPercent } from 'components';
import { CarsQuantity, AnomaliesDial } from './components';

export default class Anomalies extends Component {
  static propTypes = {
    anomalies: number,
    cars1: number,
    percent: number,
    percentRight: number,
    unblocked: number,
    cars2: number,
    blocked: number,
    cars3: number,
  };

  constructor(props) {
    super(props);
    this.screenWidth = window.innerWidth;
    this.componentWidth = this.screenWidth / 2.2;
    this.componentHeight = this.screenWidth / 5.7;
    this.percentRight = Math.round(props.percentRight);
  }

  componentWillReceiveProps(nextProps) {
    this.percentRight = Math.round(nextProps.percentRight);
  }

  drawTitle() {
    return (
      <text
        className="glowText"
        x={ this.screenWidth / 96 }
        y={ this.screenWidth / 54.6 }
        fill={'#2fc6f4'}
        fontSize={ this.screenWidth / 120 }
      >
        TOTAL ANOMALIES
      </text>
    );
  }

  drawAxisLine(x1, y1, x2, y2) {
    return (
      <line
        x1={ x1 }
        y1={ y1 }
        x2={ x2 }
        y2={ y2 }
        stroke={'white'}
        strokeWidth="1"
      ></line>
    );
  }

  leftText() {
    const { unblocked, cars2 } = this.props;
    const carsTitle = `${unblocked} Suspicious`;
    const cars = cars2;
    const translateString =
      `translate(${this.componentWidth / 16.2}, ${this.componentHeight / 2.4})`
    ;
    return this.drawText(translateString, this.percentRight, cars, carsTitle, '#fad900');
  }

  rightText() {
    const { blocked, cars3 } = this.props;
    const carsTitle = `${blocked} Blocked`;
    const cars = cars3;
    const translateString = `translate(${this.screenWidth / 2.8},${this.componentHeight / 2.4})`;
    return this.drawText(translateString, 100 - this.percentRight, cars, carsTitle, '#f00');
  }

  drawText(translateString, percent, cars, carsTitle, color) {
    const fontSize = this.screenWidth / 106.7;
    const offset = this.screenWidth / 30;
    const calcY = this.screenWidth / 120 + fontSize;
    return (
      <g transform={translateString}>
        <ViewPercent
          percent={ percent }
          x={ offset }
          y={ 0 }
          color={ color }
        />
        <text
          x={ offset }
          y={ calcY }
          fontSize={ fontSize }
          fontFamily="PTSans"
          fill={'white'}
          style={{ textAnchor: 'middle' }}
        >{ carsTitle }</text>
        <CarsQuantity
          cars={ cars }
          x={ offset }
          y={ calcY + 1.75 * fontSize }
        />
      </g>
    );
  }

  render() {
    const { anomalies, cars1, percent } = this.props;
    const offset = window.innerWidth / 127.6;
    const calcY = this.componentHeight / 2;
    const calcX = this.screenWidth / 6.83 - offset;
    return (
      <div className={'anomaliesBlock'}>
        <svg
          height="100%"
          width="100%"
        >
          { this.drawTitle() }
          { this.leftText() }
          { this.drawAxisLine(this.screenWidth / 8.7 - offset, calcY, calcX, calcY) }
          { this.drawAxisLine(
              calcX,
              calcY - this.screenWidth / 128,
              calcX,
              calcY + this.screenWidth / 128)
          }
          { this.drawAxisLine(this.componentWidth - this.screenWidth / 8.7 + offset, calcY,
            this.componentWidth - calcX, calcY) }
          { this.drawAxisLine(this.componentWidth - calcX, calcY - this.screenWidth / 128,
            this.componentWidth - calcX, calcY + this.screenWidth / 128) }
          { this.rightText() }
          <AnomaliesDial
            anomalies={ anomalies }
            cars={ cars1 }
            percent={ percent }
            percentRight={ this.percentRight }
          />
        </svg>
      </div>
    );
  }
}

window.Anomalies = Anomalies;
