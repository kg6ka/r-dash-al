import React, { PropTypes, Component } from 'react';
const { number, array, func } = PropTypes;
import styles from './ConfidenceFilter.scss';

export default class ConfidenceFilter extends Component {
  static propTypes = {
    max: number,
    onChange: func,
    data: array,
  };

  drawInformation(data, idx) {
    const suspicPersent = data.total / this.props.max;
    const rectSide = window.innerWidth / 120;
    return (
      <g
        className={ styles.information }
        key={ idx }
        transform={ `translate(0, ${data.offset})` }
        onClick={ this.props.onChange.bind(this, data.key) }
      >
        <rect
          x="6%"
          y="2%"
          width="80%"
          height={ window.innerWidth / 154 }
          fillOpacity="0"
        />
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
            width={ (window.innerWidth / 7) * suspicPersent }
            height={ window.innerWidth / 384 }
            fill={ data.color }
          />
          <text
            x="94%"
            y={ rectSide }
            stroke="white"
            textAnchor="end"
          >
            { data.total }
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
          { this.props.data.map((el, idx) => this.drawInformation(el, idx)) }
        </g>
      </svg>
    );
  }
}
