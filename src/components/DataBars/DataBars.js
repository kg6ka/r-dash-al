import React, { Component, PropTypes } from 'react';
const { object } = PropTypes;
import styles from './DataBars.scss';

export default class DataBars extends Component {
  static propTypes = {
    style: object,
    data: object,
  };

  calcPercent(val) {
    return (val * 100 / this.props.data.maxHeight  - 14);
  }

  render() {
    const { style: { width, height },
      data: { val, msg, suspicious, blocked } } = this.props;
    return (
      <svg width={ width } height={ height } className={styles.chart} onClick={ this.props.onChange }>
        <rect
          x="30%"
          y={`${100 - this.calcPercent(blocked)}%`}
          width="10%"
          height={`${this.calcPercent(blocked) - 10}%`}
          fill="url(#blockedGradient)"
        />
        <rect
          x="60%"
          y={`${100 - this.calcPercent(suspicious)}%`}
          width="10%"
          height={`${this.calcPercent(suspicious) - 10}%`}
          fill="url(#suspiciousGradient)"
        />
        <line x1="15%" y1="90%" x2="85%" y2="90%" stroke="#fff" strokeWidth="1" />
        <text
          className={styles.title}
          fontSize={ window.innerWidth / 137 }
          x="50%"
          y="10%"
        >
          { val }
        </text>
        <text
          className={styles.title}
          fontSize={ window.innerWidth / 160 }
          x="50%"
          y="99%"
        >
          { msg }
        </text>
        <linearGradient
          id="suspiciousGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#ffc90d" />
          <stop offset="100%" stopColor="#ef7a24" />
        </linearGradient>
        <linearGradient
          id="blockedGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#a60e14" />
          <stop offset="100%" stopColor="#8f000a" />
        </linearGradient>
      </svg>
    );
  }
}
