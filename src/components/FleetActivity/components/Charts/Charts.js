import React, { Component, PropTypes } from 'react';
const { array, string } = PropTypes;
import d3 from 'd3';
import styles from '../../FleetActivity.scss';

export default class Charts extends Component {
  static propTypes = {
    data: array,
    color1: string,
    color2: string,
    color3: string,
  };

  componentDidMount() {
    this.drawCharts();
  }

  componentWillReceiveProps() {
    this.drawCharts();
  }

  drawCharts() {
    const { data, color1, color2, color3 } = this.props;
    const width = window.innerWidth / 1.93;
    const height = window.innerWidth / 11.43;
    const margin = window.innerWidth / 40;
    const axisWidth = width - 2 * margin;
    const axisHeigth = height - margin;
    const quantity = 112;

    const svg = d3.select('.charts')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3.time.scale()
      .domain([new Date(data[0].time),
        new Date(data[data.length - 1].time)])
      .range([margin, axisWidth]);

    const y1 = d3.scale.linear()
      .domain([0, 400])
      .range([axisHeigth, margin / 2]);

    const y2 = d3.scale.linear()
      .domain([0, 9000])
      .range([axisHeigth, margin / 2]);

    const yAxis1 = d3.svg.axis()
      .scale(y1)
      .orient('left')
      .ticks(5);

    const yAxis2 = d3.svg.axis()
      .scale(y2)
      .orient('right')
      .ticks(5)
      .tickFormat(d => {
        if (d === 0) {
          return d;
        }
        return `${d / 1000} K`;
      });

    const xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .ticks(6)
      .tickFormat(d3.time.format('%H:%M'));

    const area = d3.svg.area()
      .x(d => x(new Date(d.time)))
      .y0(axisHeigth)
      .y1(d => y2(d.val3 * 50));

    svg.append('g')
      .attr('fill', `url(#${color3})`)
      .append('path')
      .attr('class', 'lineChart')
      .attr('d', area(data))
      .attr('stroke', 'white');

    svg.selectAll('.bar2')
      .data(['bar2'])
      .enter()
      .append('g')
      .attr('class', 'bar2')
      .selectAll('.barItem')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'barItem')
        .attr('x', (d) => x(new Date(d.time)))
        .attr('y', d => y1(d.val2))
        .attr('width', axisWidth / quantity)
        .attr('height', d => axisHeigth - y1(d.val2))
        .attr('fill', `url(#${color2})`);

    svg.selectAll('.bar1')
      .data(['bar1'])
      .enter()
      .append('g')
      .attr('class', 'bar1')
      .selectAll('.barItem')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'barItem')
        .attr('x', (d) => x(new Date(d.time)))
        .attr('y', d => y1(d.val1))
        .attr('width', axisWidth / quantity - 1)
        .attr('height', d => axisHeigth - y1(d.val1))
        .attr('fill', `url(#${color1})`);

    console.log(data.length);

    svg.append('g')
      .attr('class', styles.yAxis1)
      .attr('transform', `translate(${margin},0)`)
      .call(yAxis1);

    svg.append('g')
      .attr('class', styles.yAxis2)
      .attr('transform', `translate(${axisWidth},0)`)
      .call(yAxis2);

    svg.append('g')
      .attr('class', styles.xAxis)
      .attr('transform',
        `translate(0,${axisHeigth})`)
      .call(xAxis);

    d3.selectAll('.tick text')
     .style({ 'font-size': window.innerWidth / 100, 'font-fmily': 'PTSans' });

    d3.select('.yAxis1')
      .selectAll('.tick text')
      .style({ stroke: '#ffbc16' });

    d3.selectAll('.domain')
      .style({ fill: 'none' });

    d3.selectAll('.xAxis .tick line')
      .style({ stroke: 'gray' });
  }

  render() {
    return (
      <g
        className="charts"
        transform={`translate(${window.innerWidth / 21.3},${window.innerWidth / 15.61})`}
      ></g>
    );
  }
}
