import React, { Component, PropTypes } from 'react';
const { string } = PropTypes;
import styles from './Categories.scss';
import d3 from 'd3';
import cx from 'classnames';

const externalLink =
  'M 8.3333327,8.3333 H 1.66667 V 1.6915 L 3.33333,1.6665 V 0 H 0 V 10 H 10.000003' +
  ' V 5.8333 H 8.3333327 v 2.5 z M 4.9999997,0 l 1.666673,1.6667 -2.500003,2.5' +
  ' 1.666663,1.6666 2.5,-2.5 L 10.000003,5 V 0 H 4.9999997 z';

const informationData = [
  { offset: window.innerWidth / 25.26, color: '#b2d733',
    text: 'READ ONLY DIAGNOSTICS', percent: 55 },
  { offset: window.innerWidth / 15.5, color: '#13aa38',
    text: 'TIMING ANOMALY', percent: 20 },
  { offset: window.innerWidth / 11.2, color: '#1156e4',
    text: 'IRRATIONAL DATA', percent: 12 },
  { offset: window.innerWidth / 8.73, color: '#904fff',
    text: 'BAD DIAGNOSTICS', percent: 5 },
  { offset: window.innerWidth / 7.16, color: '#fff',
    text: 'BUS OFF', percent: 8 },
];

export default class Categories extends Component {
  static propTypes = {
    name: string,
    filter: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      hovered: null,
      data: [],
    };
    this.category = argusComponents.category.length ? argusComponents.category : informationData;
  }

  componentWillReceiveProps(props) {
    if (props.data.length) {
      this.setState({
        categories: props.data,
      });
    }
  }

  getOffset(idx) {
    return idx === this.state.hovered ? window.innerWidth / 120 : window.innerWidth / 240;
  }

  handleOver(hovered) {
    this.setState({
      hovered,
    });
  }

  handleOut() {
    this.setState({
      hovered: null,
    });
  }

  drawPointer() {
    const points = `1,${window.innerWidth / 96} 0.5,0 0,${-window.innerWidth / 40}
      -0.5,0 -1,${window.innerWidth / 96}`;

    const arc = d3.svg.arc()
      .innerRadius(window.innerWidth / 213)
      .outerRadius(window.innerWidth / 106)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    const arc1 = d3.svg.arc()
      .innerRadius(0.5)
      .outerRadius(1.5)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    return (
      <g transform={ `translate(${window.innerWidth / 20},${window.innerWidth / 20})` }>
        <path className="arc" fill="url(#blueGradient)" d={ arc() } />
        <polygon
          stroke="#f75d00"
          strokeWidth="0.1"
          fill="#f75d00"
          points={ points }
          filter="url(#glow)"
        />

      <path
        className="arc"
        stroke="#f75d00"
        strokeWidth="0.1"
        fill="#f75d00"
        d={ arc1() }
        filter="url(#glow)"
      />
      </g>
    );
  }

  drawPieChart() {
    const h = window.innerWidth / 12;
    const r = h / 2;
    const w = window.innerWidth / 10;

    const pie = d3.layout.pie()
      .value((d) => d.percent)
      .sort(null);

    const arc = d3.svg.arc()
      .outerRadius((d, idx) => r + this.getOffset(idx))
      .innerRadius((d, idx) => r - this.getOffset(idx));
    return (
      <g className="chart" transform={ `translate(${w / 2},${w / 2})` }>
        { pie(this.state.data).map((d, idx) =>
          <path
            key={ `slice-${idx}` }
            fill={ d.data.color }
            d ={ arc(d, idx) }
          />
        ) }
      </g>
    );
  }

  drawInformation(data, idx) {
    const rectX = window.innerWidth / 83.5;
    const rectSide = window.innerWidth / 120;
    return (
      <g
        className={ styles.information }
        key={ idx }
        transform={ `translate(0, ${data.offset})` }
        onMouseOver={ this.handleOver.bind(this, idx) }
        onMouseOut={ ::this.handleOut }
        onClick={ this.props.onChange.bind(this, data.text) }
      >
        <rect
          x={ rectX }
          y="0"
          width={ rectSide }
          height={ rectSide }
          fill={ data.color }
        />
        <text
          className={ cx({
            [styles.hovered]: this.state.hovered === idx,
          }) }
          x={ rectX + rectSide * 2 }
          y={ rectSide }
          stroke={ this.state.hovered === idx ? data.color : 'white' }
        >
          { data.text }
        </text>
        <text
          className={ cx({
            [styles.hovered]: this.state.hovered === idx,
          }) }
          x={ window.innerWidth / 8 }
          y={ rectSide }
          stroke={ this.state.hovered === idx ? data.color : 'white' }
        >
          { data.percent } %
        </text>
        { this.state.hovered === idx ?
            <g
              transform={`translate(${window.innerWidth / 6.7},${window.innerWidth / 455})`}
              fill={ data.color }
            >
              <path d={ externalLink } />
              <text
                x={window.innerWidth / 90}
                y={window.innerWidth / 151.8}
                stroke="#13aa38"
              >
                ^15%
              </text>
            </g>
          : null }
      </g>
    );
  }

  render() {
    const translateString = this.props.filter
      ? `translate(${window.innerWidth / 7},${window.innerWidth / 23.4}) scale(0.7)`
      : `translate(${window.innerWidth / 5.6},${window.innerWidth / 23.4}) scale(0.9)`;
    return (
      <svg className={styles.categoriesComponent}>
        <text
          className="glowText"
          x="5%"
          y={ window.innerWidth / 54.6 }
          fill={'#2fc6f4'}
          fontSize={ window.innerWidth / 120 }
        >
          {this.props.name}
        </text>
        <g transform={ this.props.filter ? 'scale(0.8, 0.85)' : null }>
          { this.category.map((el, idx) => this.drawInformation(el, idx)) }
        </g>
        <g
          className="pieChart"
          transform={ translateString }
        >
          { this.drawPieChart() }
          { this.drawPointer() }
        </g>
        <radialGradient id="blueGradient">
          <stop offset="30%" stopColor="#2fc6f4" stopOpacity="1" />
          <stop offset="100%" stopColor="#2fc6f4" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" width="160%" height="160%" x="-0.3" y="-0.3">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
    );
  }
}
