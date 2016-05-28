import React, { Component, PropTypes } from 'react';
const { string, array, func } = PropTypes;
import styles from './Categories.scss';
import d3 from 'd3';
import cx from 'classnames';

export default class Categories extends Component {
  static propTypes = {
    name: string,
    filter: string,
    data: array,
    onChange: func,
  };

  constructor(props) {
    super(props);
    this.state = {
      hovered: null,
      quantity: props.data ? props.data.length : 0,
      data: props.data || [],
    };
    this.colors = ['#b2d733', '#13aa38', '#1156e4', '#904fff', '#0099cc',
      '#ff7f50', '#ff9394', '#bbfa9f', '#8c0a2f', '#fffe93'];
  }

  componentWillReceiveProps(props) {
    if (props.data) {
      this.setState({
        data: props.data,
        quantity: props.data.length,
      });
    }
  }

  getOffset(idx) {
    return idx === this.state.hovered ? window.innerWidth / 120 : window.innerWidth / 240;
  }

  getCaregoryOffset() {
    const w = window.innerWidth;
    if (this.state.quantity <= 5) {
      return [window.innerWidth / 25.26, window.innerWidth / 15.5,
        window.innerWidth / 11.2, window.innerWidth / 8.73, window.innerWidth / 7.16];
    }
    return [0.03 * w, 0.044 * w, 0.058 * w, 0.072 * w, 0.086 * w, 0.100 * w,
      0.114 * w, 0.128 * w, 0.142 * w, 0.156 * w];
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
    const pie = d3.layout.pie()
      .value((d) => d.percent)
      .sort(null);

    const data = pie(this.state.data)[this.state.hovered];

    let angle = 0;
    if (data) {
      const start = data.startAngle * 180 / 3.14;
      const end = data.endAngle * 180 / 3.14;
      angle = (end - start) / 2 + start;
    }

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
      <g
        transform={ `translate(${window.innerWidth / 20},
          ${window.innerWidth / 20}) rotate(${angle})` }
      >
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
        { pie(this.state.data).map((el, idx) =>
            <path
              key={ `slice-${idx}` }
              fill={ this.colors[idx] }
              d={ arc(el, idx) }
            />
          )}
      </g>
    );
  }

  drawInformation(data, idx) {
    const { text } = data;
    const limit = 20;
    const title = text.length >= limit ? `${text.slice(0, limit)}...` : text;
    const rectX = window.innerWidth / 83.5;
    const rectSide = window.innerWidth / 135;
    return (
      <g
        className={ styles.information }
        key={ idx }
        transform={ `translate(0, ${this.getCaregoryOffset()[idx]})` }
        onMouseOver={ this.handleOver.bind(this, idx) }
        onMouseOut={ this.handleOut.bind(this) }
        onClick={ this.props.onChange ? this.props.onChange.bind(this, title) : null }
      >
        <rect
          x={ rectX }
          y="0"
          width={ rectSide }
          height={ rectSide }
          fill={ this.colors[idx] }
        />
        <text
          className={ cx({
            [styles.hovered]: this.state.hovered === idx,
          }) }
          x={ rectX + rectSide * 2 }
          y={ rectSide }
          fill={ this.state.hovered === idx ? this.colors[idx] : 'white' }
        >
          { title }
        </text>
        <text
          className={ cx({
            [styles.hovered]: this.state.hovered === idx,
          }) }
          x={ window.innerWidth / 8 }
          y={ rectSide }
          fill={ this.state.hovered === idx ? this.colors[idx] : 'white' }
        >
          { Math.round(data.percent) } %
        </text>
        { this.state.hovered === idx ?
            <g
              transform={`translate(${window.innerWidth / 7.2},${window.innerWidth / 455})`}
              fill={ this.colors[idx] }
            >
              <text
                x={window.innerWidth / 90}
                y={window.innerWidth / 180}
                fill="#13aa38"
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
          fill="#2fc6f4"
          fontSize={ window.innerWidth / 120 }
        >
          {this.props.name}
        </text>
        <g transform={ this.props.filter ? 'scale(0.8, 0.85)' : null }>
          { this.state.data.map((el, idx) => this.drawInformation(el, idx)) }
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
