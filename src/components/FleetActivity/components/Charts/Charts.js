import React, { Component, PropTypes } from 'react';
const { array, string, number } = PropTypes;
import d3 from 'd3';
import blueCar from '../../images/blueCar.svg';

export default class Charts extends Component {
  static propTypes = {
    data: array,
    color1: string,
    color2: string,
    color3: string,
    registered: number,
  };

  componentWillReceiveProps(props) {
    if (props.data.length > 0) {
      this.drawCharts();
      this.chartsDecoration();
    }
  }

  chartsDecoration() {
    d3.selectAll('.tick text')
      .style({
        'font-size': `${window.innerWidth / 136.6}`,
        'font-family': 'PTSans',
      });

    d3.selectAll('.domain')
      .style({ fill: 'none' });

    d3.selectAll('.xAxis text')
      .style({ fill: '#8f9295' });

    d3.selectAll('.yAxis1 text')
      .style({ fill: '#ffbc16' });

    d3.selectAll('.yAxis2 text')
      .style({ fill: '#2fc6f4' });

    d3.selectAll('.axisLine')
      .style({
        stroke: '#8f9295',
        'stroke-width': 1,
      });

    d3.selectAll('.tick line')
      .style({ stroke: '#8f9295', 'stroke-size': 1, 'stroke-opacity': 0.3 });
  }

  drawCharts() {
    const { data, color1, color2, color3 } = this.props;
    const charts = d3.select('.charts');
    const width = window.innerWidth / 1.85;
    const height = window.innerWidth / 11.43;
    const margin = window.innerWidth / 40;
    const axisWidth = width - 2 * margin;
    const axisHeigth = height - margin;
    const quantity = data.length - 1;

    if (!data[0] || data[0].time === 0) {
      return;
    }

    const currentData = new Date().getTime();
    const timeTicks = [];
    const jmpTime = (currentData - data[0].startTime) / 7;

    for (let i = 0; i < 7; i++) {
      timeTicks.push(new Date(data[0].startTime + (jmpTime * i)));
    }

    timeTicks.push(new Date(currentData));

    let maxSuspicious = 0;
    let maxBlocked = 0;
    let maxActivities = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].suspicious > maxSuspicious) {
        maxSuspicious = data[i].suspicious;
      }

      maxActivities = maxActivities > data[i].activitys ? maxActivities : data[i].activitys;
      maxBlocked = maxBlocked > data[i].blocked ? maxBlocked : data[i].blocked;
    }

    let maxY1 = maxBlocked > maxSuspicious ? maxBlocked : maxSuspicious;

    let leftScale = [];
    let rightScale = [];
    let leftTick = Math.round(((maxY1 * 1.7) / 10)) * 2;
    let rightTick = Math.round((maxActivities / 5));

    if (rightTick < 0.5) { 
      rightTick = 0.5;
    }
    for (let i = 0; i < 5; i++) {
      leftScale.push(leftTick * i);
      rightScale.push(rightTick * i);
    }

    charts.selectAll('svg').remove();
    charts.selectAll('image').remove();
    charts.selectAll('text').remove();

    const svg = charts
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3.time.scale()
      .domain([timeTicks[0], timeTicks[timeTicks.length - 1]])
      .range([margin, axisWidth]);

    const y1 = d3.scale.linear()
      .domain([0, leftTick * 5])
      .range([axisHeigth, margin / 2]);

    const y2 = d3.scale.linear()
      .domain([0, rightTick * 5])
      .range([axisHeigth, margin / 2]);

    const yAxis1 = d3.svg.axis()
      .scale(y1)
      .tickSize(-(axisWidth - margin))
      .orient('left')
      .tickValues(leftScale)
      .tickPadding(window.innerWidth / 128);

    const yAxis2 = d3.svg.axis()
      .scale(y2)
      .tickSize(-(axisWidth - margin))
      .orient('right')
      .tickValues(rightScale)
      .tickPadding(window.innerWidth / 128)
      .tickFormat(d => {
        if (d < 1000) {
          return d;
        }
        return `${d / 1000} K`;
      });

    const xAxis = d3.svg.axis()
      .scale(x)
      .tickSize(-(axisHeigth - margin / 4))
      .orient('bottom')
      .ticks(6)
      .tickPadding(window.innerWidth / 128)
      .tickFormat(d3.time.format('%H:%M:%S'))
      .tickValues(timeTicks);

    svg.append('g')
      .attr('class', 'yAxis1')
      .attr('transform', `translate(${margin},0)`)
      .call(yAxis1);

    svg.append('g')
      .attr('class', 'yAxis2')
      .attr('transform', `translate(${axisWidth},0)`)
      .call(yAxis2);

    svg.append('g')
      .attr('class', 'xAxis')
      .attr('transform',
        `translate(0,${axisHeigth})`)
      .call(xAxis);

    const area = d3.svg.area()
      .x(d => x(new Date(d.time)))
      .y0(axisHeigth)
      .y1(d => y2(d.activitys));

    svg.append('g')
      .attr('fill', `url(#${color3})`)
      .append('path')
      .attr('class', 'lineChart')
      .attr('d', area(data))
      .attr('stroke', 'white')
      .attr('filter', 'url(#topGlow)');

    svg.selectAll('.bar1')
      .data(['bar1'])
      .enter()
      .append('g')
      .attr('class', 'bar1')
      .selectAll('.barItem')
        .data(data.slice(0, quantity))
        .enter()
        .append('rect')
        .attr('class', 'barItem')
        .attr('x', d => x(new Date(d.time)))
        .attr('y', d => y1(d.suspicious))
        .attr('width', (d) => {
          let rectWidth = (axisWidth - margin) / quantity;
          if (x(new Date(d.time)) + rectWidth > axisWidth) {
            rectWidth = axisWidth - x(new Date(d.time) - margin);
          }
          return rectWidth;
        })
        .attr('height', d => axisHeigth - y1(d.suspicious))
        .attr('fill', `url(#${color1})`);

    svg.selectAll('.bar2')
      .data(['bar2'])
      .enter()
      .append('g')
      .attr('class', 'bar2')
      .selectAll('.barItem')
        .data(data.slice(0, quantity))
        .enter()
        .append('rect')
        .attr('class', 'barItem')
        .attr('x', (d) => x(new Date(d.time)))
        .attr('y', d => y1(d.blocked))
        .attr('width', (d) => {
          let rectWidth = (axisWidth - margin) / quantity;
          if (x(new Date(d.time)) + rectWidth > axisWidth) {
            rectWidth = axisWidth - x(new Date(d.time) - margin);
          }
          return rectWidth;
        })
        .attr('height', d => axisHeigth - y1(d.blocked))
        .attr('fill', `url(#${color2})`);

    charts.append('text')
      .text('#')
      .attr('x', margin * 0.45)
      .attr('y', margin / 5)
      .attr('fill', '#ffbc16')
      .attr('font-family', 'PTSans')
      .attr('font-weight', 'bold');

    charts.append('image')
      .attr('x', axisWidth + margin / 3)
      .attr('y', - margin / 4)
      .attr('xlink:href', blueCar)
      .attr('width', window.innerWidth / 120)
      .attr('height', window.innerWidth / 120);
  }

  render() {
    const margin = window.innerWidth / 40;
    const height = window.innerWidth / 11.43;
    const width = window.innerWidth / 1.85;
    const axisHeigth = height - margin;
    const axisWidth = width - 2 * margin;
    return (
      <g
        className="charts"
        transform={`translate(${window.innerWidth / 45},${window.innerWidth / 15.61})`}
      >
        <line
          className="axisLine"
          x1={ margin }
          y1={ 0 }
          x2={ margin }
          y2={ axisHeigth + margin * 0.2 }
        />
        <line
          className="axisLine"
          x1={ axisWidth }
          y1={ 0 }
          x2={ axisWidth }
          y2={ axisHeigth + margin * 0.2 }
        />
        <filter id="topGlow" width="100%" height="160%" x="0" y="-0.55">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </g>
    );
  }
}
