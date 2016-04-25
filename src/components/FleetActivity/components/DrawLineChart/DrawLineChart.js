import React, { Component, PropTypes } from 'react';
const { array, string } = PropTypes;
import d3 from 'd3';
import styles from '../../FleetActivity.scss';

export default class DrawLineChart extends Component {
  static propTypes = {
    data: array,
    color: string,
  };

  componentDidMount() {
    this.drawChart();
  }

  componentWillReceiveProps() {
    this.drawChart();
  }

  drawChart() {
    const { data, color } = this.props;
    const width = window.innerWidth / 1.93;
    const height = window.innerWidth / 11.43;
    const margin = window.innerWidth / 40;
    const axisWidth = width - 2 * margin;
    const axisHeigth = height - margin;

    const svg = d3.select('.lineChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const parseDate = d3.time.format('%H:%M');

    const x = d3.time.scale()
      .domain([new Date(data[data.length - 112].time),
        new Date(data[data.length - 1].time)])
      .range([margin, axisWidth]);

    const y = d3.scale.linear()
      .domain([0, 9000])
      .range([axisHeigth, margin / 2]);

    const yAxis = d3.svg.axis()
      .scale(y)
      .orient('right')
      .ticks(6);

    const xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .ticks(6)
      .tickFormat(parseDate);

    const area = d3.svg.area()
      .x(d => x(new Date(d.time)))
      .y0(axisHeigth)
      .y1(d => y(d.val * 50));

    svg.append('path')
      .attr('class', 'lineChart')
      .attr('d', area(data))
      .attr('stroke', 'white');

    svg.append('g')
      .attr('class', styles.xAxis)
      .attr('transform', `translate(0,${axisHeigth})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', styles.yAxis)
      .attr('transform', `translate(${axisWidth},0)`)
      .call(yAxis);
  }

  render() {
    return (
      <g
        className="lineChart"
        transform={`translate(${window.innerWidth / 21.3},${window.innerWidth / 15.61})`}
        fill={`url(#${this.props.color})`}
      ></g>
    );
  }
}
