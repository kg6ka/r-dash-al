import React, { Component, PropTypes } from 'react';
const { array, string } = PropTypes;
import d3 from 'd3';
import styles from '../../FleetActivity.scss';
import blueCar from '../../images/blueCar.svg';

export default class Charts extends Component {
  static propTypes = {
    data: array,
    color1: string,
    color2: string,
    color3: string,
  };

  componentDidMount() {
    this.drawCharts();
    this.chartsDecoration();
  }
  componentDidUpdate(prevProps, prevState)  {
    this.drawCharts();
    this.chartsDecoration();  
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
      .style({ stroke: '#8f9295' });

    d3.selectAll('.yAxis1 text')
      .style({ stroke: '#ffbc16' });

    d3.selectAll('.yAxis2 text')
      .style({ stroke: '#2fc6f4' });

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
    let tickValuesCars = [];
    let tickValuesYAxis1 = [];

    const timeTicks = [];
    let tick = 0;
    for (let i = 0; i < 8; i++) {
      timeTicks.push(new Date(data[tick].time));
      tick += Math.round(quantity / 7);
      if(tick > quantity) tick = quantity;
    }

    tickValuesCars = [0,0.5,1,1.5,2];
    
    if(argusComponents.fleetActivity.registered > 2)
      tickValuesCars = [0,2.5,5,7.5,10];
   
    if(argusComponents.fleetActivity.registered >= 10)
      tickValuesCars = [0,25,50,75,100];
   
    if(argusComponents.fleetActivity.registered >= 100)
      tickValuesCars = [0,250,500,750,1000];
        
    if(argusComponents.fleetActivity.registered >= 1000)
      tickValuesCars = [0,2500,5000,7500,10000];

    tickValuesYAxis1 = [0, 5, 10, 15,20];

               
//     console.log(data);
    charts.selectAll("svg").remove();
    charts.selectAll("image").remove();
    charts.selectAll("text").remove();
        
    const svg = charts
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3.time.scale()
      .domain([new Date(data[0].time),
        new Date(data[data.length - 1].time)])
      .range([margin, axisWidth]);

    const y1 = d3.scale.linear()
      .domain([0, tickValuesYAxis1[4]])
      .range([axisHeigth, margin / 2]);

    const y2 = d3.scale.linear()
      .domain([0, tickValuesCars[4]])
      .range([axisHeigth, margin / 2]);

    const yAxis1 = d3.svg.axis()
      .scale(y1)
      .tickSize(-(axisWidth - margin))
      .orient('left')
      .tickValues(tickValuesYAxis1)
      .tickPadding(window.innerWidth / 128);

    const yAxis2 = d3.svg.axis()
      .scale(y2)
      .tickSize(-(axisWidth - margin))
      .orient('right')
      .tickValues(tickValuesCars)
      .tickPadding(window.innerWidth / 128)
      .tickFormat(d => {
        if (d < 1000)
          return d;
        else
          return `${d / 1000} K`;
      });

    const xAxis = d3.svg.axis()
      .scale(x)
      .tickSize(-(axisHeigth - margin / 4))
      .orient('bottom')
      .ticks(6)
      .tickPadding(window.innerWidth / 128)
      .tickFormat(d3.time.format('%H:%M'))
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
        .data(data.slice(0, data.length - 1))
        .enter()
        .append('rect')
        .attr('class', 'barItem')
        .attr('x', d => x(new Date(d.time)))
        .attr('y', d => y1(d.suspicious))
        .attr('width', (axisWidth - margin) / (quantity - 1))
        .attr('height', d => axisHeigth - y1(d.suspicious))
        .attr('fill', `url(#${color1})`);


    svg.selectAll('.bar2')
      .data(['bar2'])
      .enter()
      .append('g')
      .attr('class', 'bar2')
      .selectAll('.barItem')
        .data(data.slice(0, data.length - 1))
        .enter()
        .append('rect')
        .attr('class', 'barItem')
        .attr('x', (d) => x(new Date(d.time)))
        .attr('y', d => y1(d.blocked))
        .attr('width', (axisWidth - margin) / (quantity - 1))
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
