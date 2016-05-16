import React, { Component, PropTypes } from 'react';
const { string, number, array } = PropTypes;
import { ViewPercent } from 'components';
import Pointer from '../Pointer/Pointer';
import d3 from 'd3';

export default class PercentColumn extends Component {
  static propTypes = {
    className: string,
    percent: number,
    lable: array,
    description: array,
  };

  constructor(props) {
    super(props);
    this.screenWidth = window.innerWidth;
    this.height = this.screenWidth / 8.35;
    this.color = this.choseColor(props.percent);
    this.calcX = this.screenWidth / 37.65;
    this.lableY = this.screenWidth / 9.5;
    this.descriptionY = this.screenWidth / 12.4;
  }

  componentWillReceiveProps(nextProps) {
    this.tweenPercent(nextProps.percent);
    this.color = this.choseColor(nextProps.percent);
  }

  drawScale() {
    const pxStep = this.height / 21;
    const arr = [];
    for (let i = 1; i < 21; i++) {
      arr.push(i);
    }
    return arr.map((idx) => (
      <line
        key={ idx }
        x1="0"
        y1={ pxStep * idx }
        x2={ idx % 2 ? 2 : 5 }
        y2={ pxStep * idx }
        stroke="#858585"
        strokeWidth="1"
      />
    ));
  }

  choseColor(percent) {
    if (percent < 17) { return '#f00'; }
    if (percent < 75) { return '#fad900'; }
    return '#00d331';
  }

  drawPercets() {
    const translateString = `translate(${this.screenWidth / 76.8},${this.height})`;
    const height = this.props.percent * this.height / 100 * 0.95;
    return (
      <g transform={`${translateString} rotate(180)`}>
        <rect
          className={ this.props.className }
          fill="url(#rainbowPattern)"
          x={ 0 }
          y={ 0 }
          width={ this.screenWidth / 192 }
          height={ height }
        />
        <Pointer
          className={ `${this.props.className}Pointer` }
          mountPoint={ height }
        />
      </g>
    );
  }

  drawPattern() {
    const percentStep = 3;
    const pxStep = this.height * 20 / 21 * 0.99 / 33;
    let currPerc = 0;
    const arr = [];
    for (let i = 1; i < 34; i++) {
      currPerc = 1 + percentStep * i;
      arr.push({ idx: i, color: this.choseColor(currPerc) });
    }
    return arr.map((el) =>
      <line
        key={el.idx}
        x1="0"
        y1={ pxStep * el.idx }
        x2="12"
        y2={ pxStep * el.idx }
        stroke={ el.color }
        strokeWidth="1"
      />
    );
  }

  tweenPercent(percent) {
    const curr = this.props.percent * this.height / 100 * 0.95;
    const next = percent * this.height / 100 * 0.95;
    d3.select(`.${this.props.className}`)
      .transition()
      .duration(1000)
      .attrTween('height', () => d3.interpolate(curr, next));
  }

  drawDescription() {
    const { description } = this.props;
    return (
      <g>
        <text
          x={ this.calcX }
          y={ this.descriptionY }
          fontSize={ this.screenWidth / 147.7 }
          fontFamily="PTSans"
          fill="#aaa7a7"
        >{ description[0] }</text>
        <text
          x={ this.calcX }
          y={ this.descriptionY + this.screenWidth / 110 }
          fontSize={ this.screenWidth / 147.7 }
          fontFamily="PTSans"
          fill="#aaa7a7"
        >{ description[1] }</text>
      </g>
    );
  }

  render() {
    const { percent, lable, description } = this.props;
    return (
      <g width={ this.screenWidth / 10.53 }>
        <rect
          x="0"
          y="0"
          width={ this.screenWidth / 54.86 }
          height={ this.screenWidth / 8.35 }
          stroke="black"
          fill="url(#backgroundGradient)"
        />
          { this.drawScale() }
          { this.drawPercets() }
        <ViewPercent
          percent={ percent }
          x={ this.screenWidth / 25 }
          y={ this.screenWidth / 60 }
          color={ this.color }
        />
        <text
          x={ this.calcX }
          y={ this.lableY }
          fontSize={ this.screenWidth / 106.7 }
          fontFamily="PTSans"
          fill="#fff"
        >{ lable[0] }</text>
        <text
          x={ this.calcX }
          y={ this.lableY + this.screenWidth / 80 }
          fontSize={ this.screenWidth / 106.7 }
          fontFamily="PTSans"
          fill="#fff"
        >{ lable[1] }</text>
        { description
          ? this.drawDescription()
          : null }
        <linearGradient id="backgroundGradient">
          <stop offset="0%" stopColor="#0c0b0b" stopOpacity="0" />
          <stop offset="90%" stopColor="#151515" />
          <stop offset="20%" stopColor="#151515" stopOpacity="1" />
          <stop offset="90%" stopColor="#070707" />
          <stop offset="100%" stopColor="#070707" />
        </linearGradient>
        <pattern id="rainbowPattern" x="0" y="0" width="1" height="1">
          { this.drawPattern() }
        </pattern>
      </g>
    );
  }
}
