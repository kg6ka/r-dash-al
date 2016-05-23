import React, { Component, PropTypes } from 'react';
const { number } = PropTypes;
import logo from './images/volkswagen_logo.svg';
import metalBtn from '../images/metalBtn.svg';
import d3 from 'd3';

export default class RegisteredCars extends Component {
  static propTypes = {
    registered: number,
    percent: number,
  };

  constructor(props) {
    super(props);
    this.screenWidth = window.innerWidth;
    this.innerRadius = this.screenWidth / 20.76;
    this.outerRadius = this.screenWidth / 17.86;
    this.imgLength = this.screenWidth / 27.4;
    this.translateGroup = `translate(${this.screenWidth / 68.57},${this.screenWidth / 32.54})`;
  }

  drawScale() {
    const translateScale = `translate(${this.outerRadius},
      ${this.outerRadius + this.imgLength / 3})`;
    const angles = [];
    let startAngle = 0;
    for (let i = 0; i < 45; i++) {
      angles.push(startAngle);
      startAngle += 6;
    }
    const x = this.innerRadius - this.screenWidth / 384;
    return angles.map((el, idx) =>
      <line
        key={ idx }
        x1={ idx % 2 ? x - this.screenWidth / 174.5 : x - this.screenWidth / 128 }
        y1={ 0 }
        x2={ x }
        y2={ 0 }
        stroke={"#0A0E12"}
        strokeWidth="1"
        transform={`${translateScale}rotate(${135 + el})`}
      ></line>
    );
  }

  render() {
    const { registered, percent } = this.props;
    const calcPercentY = window.innerWidth / 9.65 - window.innerWidth / 96;
    const percentString = (percent > 0) ? `^ ${percent}%` : '';
    const translateString =
      `translate(${this.outerRadius},${this.outerRadius + this.imgLength / 3})`
    ;
    const arc = d3.svg.arc()
      .startAngle(0)
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius + window.innerWidth / 192)
      .endAngle(360)();

    return (
      <g transform={this.translateGroup}>
        <radialGradient id="registeredGradient">
          <stop offset="80%" stopColor="#323232" />
          <stop offset="90%" stopColor="#000" />
          <stop offset="90%" stopColor="#2fc6f4" stopOpacity=".1" />
          <stop offset="100%" stopColor="#0b0a0a" stopOpacity=".05" />
        </radialGradient>
        <path
          d={arc}
          fill="url(#registeredGradient)"
          transform={ translateString }
        />
        <circle
          cx={ this.outerRadius }
          cy={ this.outerRadius + this.imgLength / 3 }
          r={ this.innerRadius }
          stroke="black"
          strokeWidth="1"
          fill="#10191E"
        ></circle>
        { this.drawScale() }
        <image
          x={ this.outerRadius - this.imgLength / 2 }
          y={ 0 }
          xlinkHref={ logo }
          width={ this.imgLength }
          height={ this.imgLength }
        />
        <text
          x={ this.outerRadius }
          y={ this.outerRadius + this.imgLength / 3 }
          fontSize={ this.screenWidth / 38.4 }
          fontFamily="modeka"
          fill="white"
          style={{ textAnchor: 'middle' }}
        >{ registered }</text>
        <text
          x={ this.outerRadius }
          y={ calcPercentY - this.screenWidth / 96 }
          fontSize={ window.innerWidth / 137 }
          fontFamily="PTSans"
          fill="white"
          style={{ textAnchor: 'middle' }}
        >Registered Vehicles</text>
        <text
          x={ this.outerRadius }
          y={ calcPercentY }
          fontSize={ window.innerWidth / 137 }
          fontFamily="PTSans"
          fill="#40b967"
          style={{ textAnchor: 'middle' }}
        >{ percentString }</text>
        <image
          x={ this.outerRadius - window.innerWidth / 300 }
          y={ window.innerWidth / 9.65 - window.innerWidth / 300 }
          xlinkHref={ metalBtn }
          width={ window.innerWidth / 150 }
          height={ window.innerWidth / 150 }
        />
      </g>
    );
  }
}
