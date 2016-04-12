import React, { Component } from 'react';
import logo from './images/volkswagen_logo.svg';
import d3 from 'd3';

export default class RegisteredCars extends Component {
  constructor(props) {
    super(props);
    this.screenWidth = window.innerWidth;
    this.innerRadius = this.screenWidth / 20.76;
    this.outerRadius = this.screenWidth / 17.86;
    this.imgLength = this.screenWidth / 27.4;
  }

  render() {
    const { registered, percent } = this.props;
    const calcPercentY = (this.outerRadius * 2 + this.imgLength / 2) - this.screenWidth / 32.54;
    const percentString = `^ ${percent}%`;
    const translateGroup = `translate(${this.screenWidth / 68.57},${this.screenWidth / 32.54})`;
    const translateString =
      `translate(${this.outerRadius},${this.outerRadius + this.imgLength / 3})`
    ;
    const arc = d3.svg.arc()
      .startAngle(0)
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius)
      .endAngle(360)();
    return (
      <g transform={translateGroup}>
        <radialGradient id="registeredGradient">
          <stop offset="80%" stopColor="#323232" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b4145" />
          <stop offset="100%" stopColor="#0f171b" />
        </linearGradient>
        <path
          className={'registeredCars'}
          d={arc}
          fill={ '#fff' }
          transform={ translateString }
        />
        <circle
          cx={ this.outerRadius }
          cy={ this.outerRadius + this.imgLength / 3 }
          r={ this.innerRadius }
          stroke="black"
          strokeWidth="1"
          fill="url(#gradient)"
        ></circle>
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
          fontSize={ this.screenWidth / 35.58 }
          fontFamily="modeka"
          fill="white"
          style={{ textAnchor: 'middle' }}
        >{ registered }</text>
        <text
          x={ this.outerRadius }
          y={ calcPercentY - this.screenWidth / 70 }
          fontSize={10}
          fontFamily="PTSans"
          fill="white"
          style={{ textAnchor: 'middle' }}
        >Registered Cars</text>
        <text
          x={ this.outerRadius }
          y={ calcPercentY }
          fontSize={10}
          fontFamily="PTSans"
          fill="#40b967"
          style={{ textAnchor: 'middle' }}
        >{ percentString }</text>
      </g>
    );
  }
}
