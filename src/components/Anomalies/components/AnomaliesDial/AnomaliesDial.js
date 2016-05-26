import React, { Component, PropTypes } from 'react';
const { number } = PropTypes;
import d3 from 'd3';
import { CarsQuantity } from '..';

export default class AnomaliesDial extends Component {
  static propTypes = {
    anomalies: number,
    cars: number,
    percent: number,
    percentRight: number,
  };

  constructor(props) {
    super(props);
    this.screenWidth = window.innerWidth;
    this.componentWidth = this.screenWidth / 2.2;
    this.componentHeight = this.screenWidth / 5.7;
    this.innerRadius = this.screenWidth / 14.1;
    this.outerRadius = this.screenWidth / 16;
    this.yellowAngle = this.getYellowAngle(props.percentRight);
    this.redAngle = this.getRedAngle(props.percentRight);
    this.arc = d3.svg.arc()
      .startAngle(0)
      .innerRadius(this.innerRadius + window.innerWidth / 120)
      .outerRadius(this.outerRadius);
    this.translateString =
      `translate(${this.componentWidth / 2}, ${this.componentHeight / 2})`;
  }

  componentWillReceiveProps(nextProps) {
    this.tweenArc(this.yellowAngle, this.getYellowAngle(nextProps.percentRight), 'yellowArc');
    this.tweenArc(this.redAngle, this.getRedAngle(nextProps.percentRight), 'redArc');
    this.yellowAngle = this.getYellowAngle(nextProps.percentRight);
    this.redAngle = this.getRedAngle(nextProps.percentRight);
  }

  getYellowAngle(percent) {
    return - percent * 3.6;
  }

  getRedAngle(percent) {
    return (100 - percent) * 3.6;
  }

  drawScale() {
    const angles = [];
    let startAngle = 0;
    for (let i = 0; i < 8; i++) {
      angles.push(startAngle);
      startAngle += 45;
    }
    return angles.map((el, idx) =>
      <line
        key={ idx }
        x1={ 0 }
        y1={ this.screenWidth / 16 + 4 }
        x2={ 0 }
        y2={ this.screenWidth / 14.1 }
        stroke={'#fff'}
        strokeWidth="1"
        transform={`${this.translateString} rotate(${el})`}
      />
    );
  }

  drawInnerScale() {
    const angles = [];
    let startAngle = 0;
    for (let i = 0; i < 72; i++) {
      angles.push(startAngle);
      startAngle += 5;
    }
    return angles.map((el, idx) =>
      <line
        key={ idx }
        x1={ 0 }
        y1={ this.screenWidth / 17 }
        x2={ 0 }
        y2={ this.screenWidth / 16 }
        stroke={'#fff'}
        strokeWidth="1"
        transform={`${this.translateString} rotate(${el})`}
      />
    );
  }

  drawGradient(fill, clipPath) {
    const url = `url(#${clipPath})`;
    const offset = window.innerWidth / 120;
    return (
    <circle
      cx={ this.componentWidth / 2 }
      cy={ this.componentHeight / 2 }
      r={ this.innerRadius + offset }
      fill={ fill }
      clipPath={ url }
    />
    );
  }

  drawArc(angle, className) {
    const endAngle = angle * Math.PI / 180;
    const arc = this.arc
      .endAngle(endAngle)();
    return (
      <path
        d={ arc }
        className={ className }
        transform={ this.translateString }
      >
      </path>
    );
  }

  tweenArc(oldAngle, currAngle, name) {
    const self = this;
    function arcTween(transition) {
      transition.attrTween('d', () => {
        const currentAngle = oldAngle * Math.PI / 180;
        const newAngle = currAngle * Math.PI / 180;
        const interpolate = d3.interpolate(currentAngle, newAngle);
        return t => self.arc.endAngle(interpolate(t))();
      });
    }

    d3.select(`.${name}`)
      .transition()
      .duration(1000)
      .call(arcTween);
  }

  render() {
    const offset = this.componentWidth / 9.28 / 2;
    const { anomalies, cars, percent } = this.props;
    const percentString = (percent > 0) ? `^${percent}%` : '';
    return (
      <g>
        <circle
          cx={ this.componentWidth / 2 }
          cy={ this.componentHeight / 2 }
          r={ this.innerRadius }
          stroke="white"
          strokeWidth="1"
        />
        <circle
          cx={ this.componentWidth / 2 }
          cy={ this.componentHeight / 2 }
          r={ this.outerRadius }
          stroke="white"
          strokeWidth="1"
        />
        <text
          x={ this.componentWidth / 2 }
          y={ this.componentHeight / 2.4 }
          fontSize={ this.screenWidth / 35.6 }
          fontFamily="modeka"
          fill="white"
          style={{ textAnchor: 'middle' }}
        >
          { anomalies }
        </text>
        <text
          x={ this.componentWidth / 2 }
          y={ this.componentHeight / 2 }
          fontSize={ this.screenWidth / 150 }
          fontFamily="PTSans"
          fill="white"
          style={{ textAnchor: 'middle' }}
        >Anomalies</text>
        <line
          x1={ this.componentWidth / 2 - offset }
          y1={ this.componentHeight / 2 + this.screenWidth / 120 }
          x2={ this.componentWidth / 2 + offset }
          y2={ this.componentHeight / 2 + this.screenWidth / 120 }
          stroke="#C3660F"
          strokeWidth="2"
        ></line>
        <CarsQuantity
          cars={ cars }
          offset={ offset }
          x={ this.componentWidth / 2 }
          y={ this.componentHeight / 2 + this.screenWidth / 40 }
        />
        <text
          x={ this.componentWidth / 2 }
          y={ this.componentHeight / 2 + this.screenWidth / 25 }
          fontSize={ this.screenWidth / 160 }
          fontFamily="PTSans"
          fill="#f00"
          style={{ textAnchor: 'middle' }}
        >
          { percentString }
        </text>
        { this.drawScale() }
        { this.drawInnerScale() }
        { this.drawGradient('url(#yellowGradient)', 'yellowClip') }
        { this.drawGradient('url(#redGradient)', 'redClip') }
        <clipPath id="yellowClip">
          { this.drawArc(this.yellowAngle, 'yellowArc') }
        </clipPath>
        <clipPath id="redClip">
          { this.drawArc(this.redAngle, 'redArc') }
        </clipPath>
        <linearGradient id="orangeLine">
          <stop offset="0%" stopColor="#0b0a0a" />
          <stop offset="50%" stopColor="#C3660F" />
          <stop offset="100%" stopColor="#0b0a0a" />
        </linearGradient>
        <radialGradient id="yellowGradient">
          <stop offset="70%" stopColor="#0b0a0a" stopOpacity="0" />
          <stop offset="87%" stopColor="#fad900" stopOpacity=".5" />
          <stop offset="89%" stopColor="#fad900" stopOpacity=".6" />
          <stop offset="100%" stopColor="#0b0a0a" stopOpacity=".1" />
        </radialGradient>
        <radialGradient id="redGradient">
          <stop offset="70%" stopColor="#0b0a0a" stopOpacity="0" />
          <stop offset="87%" stopColor="#f00" stopOpacity=".5" />
          <stop offset="89%" stopColor="#f00" stopOpacity=".6" />
          <stop offset="100%" stopColor="#0b0a0a" stopOpacity=".7" />
        </radialGradient>
      </g>
    );
  }
}
