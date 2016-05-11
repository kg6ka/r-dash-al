import React, { Component } from 'react';
import styles from './ConfidenceFilter.scss';

const informationData = [
  { offset: window.innerWidth / 25.26, color: '#ffeeb2', val: 50 },
  { offset: window.innerWidth / 15.5, color: '#ffe400', val: 60 },
  { offset: window.innerWidth / 11.2, color: '#f07742', val: 100 },
  { offset: window.innerWidth / 8.73, color: '#ff7f00', val: 93 },
  { offset: window.innerWidth / 7.16, color: '#ff7f00', val: 48 },
];

export default class ConfidenceFilter extends Component {

  drawInformation(data, idx) {
    const rectSide = window.innerWidth / 120;
    return (
      <g
        className={ styles.information }
        key={ idx }
        transform={ `translate(0, ${data.offset})` }
      >
        <text
          x="6%"
          y={ rectSide }
          stroke="white"
        >
          { idx + 1 }
        </text>
        <rect
          x= "15%"
          y="3%"
          width={ data.val / 100 * window.innerWidth / 7 }
          height={ window.innerWidth / 384 }
          fill={ data.color }
        />
        <text
          x="94%"
          y={ rectSide }
          stroke="white"
          textAnchor="end"
        >
          { data.val }
        </text>
      </g>
    );
  }

  render() {
    return (
      <svg className={styles.categoriesComponent}>
        <text
          className="glowText"
          x="5%"
          y={ window.innerWidth / 54.6 }
          fill={'#2fc6f4'}
          fontSize={ window.innerWidth / 120 }
        >
          filter by confidence
        </text>
        <g transform="scale(1, 0.85)">
          { informationData.map((el, idx) => this.drawInformation(el, idx)) }
        </g>
      </svg>
    );
  }
}
