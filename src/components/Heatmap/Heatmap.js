import React, { Component } from 'react';

export default class Heatmap extends Component {
  render() {
    return (
      <svg width={ window.innerWidth / 3.39 } height={ window.innerWidth / 6.1 }>
        <text
          className="glowText"
          x={ window.innerWidth / 96 }
          y={ window.innerWidth / 54.6 }
          fill={'#2fc6f4'}
          fontSize={ window.innerWidth / 120 }
        >
          HEATMAP
        </text>
      </svg>
    );
  }
}
