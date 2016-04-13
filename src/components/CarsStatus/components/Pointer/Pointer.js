import React, { Component, PropTypes } from 'react';
const { number, string } = PropTypes;
import metalBtn from '../images/metalBtn.svg';
import d3 from 'd3';

export default class Pointer extends Component {
  static propTypes = {
    mountPoint: number,
    className: string,
  };

  componentWillReceiveProps(nextProps) {
    this.tween(this.props.mountPoint, nextProps.mountPoint);
  }

  tween(from, to) {
    d3.selectAll(`.${this.props.className}`)
      .transition()
      .duration(1000)
      .attrTween('transform', () =>
        d3.interpolateString(`translate(0,${from})`, `translate(0,${to})`)
      );
  }

  render() {
    return (
      <g
        transform={`translate(0, ${this.props.mountPoint})`}
        className={this.props.className}
      >
        <g fill="white">
          <circle
            cx={ window.innerWidth / 60 }
            cy={ 0 }
            r={ window.innerWidth / 480 }
          />
          <polygon
            points={`${window.innerWidth / 60},${window.innerWidth / 480}
              ${window.innerWidth / 60},${- window.innerWidth / 480}
              ${window.innerWidth / 130},0`}
          />
        </g>
        <image
          x={ window.innerWidth / 60 - window.innerWidth / 480 }
          y={ - window.innerWidth / 720 }
          xlinkHref={ metalBtn }
          width={ window.innerWidth / 240 }
          height={ window.innerWidth / 240 }
        />
        <filter id="glow" x="-10%" y="-10%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10 10" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="glow" />
            <feMergeNode in="glow" />
          </feMerge>
        </filter>
    </g>
    );
  }
}
