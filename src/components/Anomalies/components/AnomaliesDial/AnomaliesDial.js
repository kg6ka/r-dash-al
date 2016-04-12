import React, { Component } from 'react';
import d3 from 'd3';
import { CarsQuantity } from '..';

export default class AnomaliesDial extends Component {
  constructor(props) {
    super(props);
    this.screenWidth = window.innerWidth;
    this.componentWidth = this.screenWidth / 2.2;
    this.componentHeight = this.screenWidth / 5.7;
    this.innerRadius = this.screenWidth / 14.1;
    this.outerRadius = this.screenWidth / 16;
    this.redAngle = this.getRedAngle(props.percentRight);
    this.blueAngle = this.getBlueAngle(props.percentRight);
    this.arc = d3.svg.arc()
      .startAngle(0)
      .innerRadius(this.innerRadius + 4)
      .outerRadius(this.outerRadius + 2);
    this.translateString =
      `translate(${this.componentWidth / 2}, ${this.componentHeight / 2})`
    ;
  }

  componentWillReceiveProps(nextProps) {
    this.tweenArc(this.redAngle, this.getRedAngle(nextProps.percentRight), 'redArc');
    this.tweenArc(this.blueAngle, this.getBlueAngle(nextProps.percentRight), 'blueArc');
    this.redAngle = this.getRedAngle(nextProps.percentRight);
    this.blueAngle = this.getBlueAngle(nextProps.percentRight);
  }

  getRedAngle(percent) {
    return - percent * 3.6;
  }

  getBlueAngle(percent) {
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
    const url = 'url(#' + clipPath + ')';
    const offset = clipPath === 'redClip' ? 10 : 1;
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
    const percentString = '^ ' + percent + '%';
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
      stroke={'#246faf'}
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
    >{ percentString }</text>
    { this.drawScale() }
    { this.drawInnerScale() }
    { this.drawGradient('url(#redGradient)', 'redClip') }
    { this.drawGradient('url(#blueGradient)', 'blueClip') }
    <clipPath id="redClip">
      { this.drawArc(this.redAngle, 'redArc') }
    </clipPath>
    <clipPath id="blueClip">
      { this.drawArc(this.blueAngle, 'blueArc') }
    </clipPath>
    <radialGradient id="redGradient">
      <stop offset="70%" stopColor="#000" stopOpacity='0' />
      <stop offset='90%' stopColor="#f00" stopOpacity='.8' />
      <stop offset='91%' stopColor="#f00" stopOpacity='.3' />
      <stop offset='100%' stopColor="#f90" stopOpacity='0' />
    </radialGradient>
    <radialGradient id="blueGradient">
      <stop offset="80%" stopColor="#000" stopOpacity='0' />
      <stop offset="100%" stopColor="#2fc6f4" stopOpacity='.8' />
    </radialGradient>
  </g>
  );
  }
}
