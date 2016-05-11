import React, { Component, PropTypes } from 'react';
const { array, string } = PropTypes;
import d3 from 'd3';
import cx from 'classnames';
import styles from './../FleetActivity/FleetActivity.scss';
import componentStyle from './FilterTable.scss';
import expand from './../FleetActivity/images/expand.svg';
import Pointer from './../CarsStatus/components/Pointer/Pointer';

export default class FilterTable extends Component {
  static propTypes = {
    data: array,
  };

  componentDidMount() {
    this.drawCharts();
    this.chartsDecoration();
  }

  constructor(props) {
    super(props);
    this.coordinate = [0, 0, 0, 0];
    this.state = {
      listHide: true,
      currentValue: 'March 02, 17:21 - March 03, 00:30',
    };
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
    const { data } = this.props;
    const charts = d3.select('.charts');
    const width = window.innerWidth / 1.85;
    const height = window.innerWidth / 11.43;
    const margin = window.innerWidth / 40;
    const axisWidth = width - 2 * margin;
    const axisHeigth = height - margin;
    const quantity = 112;
    const timeTicks = [];
    let tick = 0;
    for (let i = 0; i < 8; i++) {
      timeTicks.push(new Date(data[data.length - quantity - 1 + tick].time));
      tick += 16;
    }

    const svg = charts
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3.time.scale()
      .domain([new Date(data[data.length - quantity - 1].time),
        new Date(data[data.length - 1].time)])
      .range([margin, axisWidth]);

    const y1 = d3.scale.linear()
      .domain([0, 400])
      .range([axisHeigth, margin / 2]);

    const y2 = d3.scale.linear()
      .domain([0, 10000])
      .range([axisHeigth, margin / 2]);

    const yAxis2 = d3.svg.axis()
      .scale(y2)
      .tickSize(-(axisWidth - margin))
      .orient('right')
      .tickValues([0, 2500, 5000, 7500, 10000])
      .tickPadding(10)
      .tickFormat(d => {
        if (d === 0) {
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
      .tickFormat(d3.time.format('%H:%M'))
      .tickValues(timeTicks);

    svg.append('g')
      .attr('class', 'yAxis2')
      .attr('transform', `translate(${axisWidth},0)`)
      .call(yAxis2);

    svg.append('g')
      .attr('class', 'xAxis')
      .attr('transform',
      `translate(0,${axisHeigth})`)
      .call(xAxis);

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
      .attr('y', d => y1(d.val2))
      .attr('width', (axisWidth - margin) / (quantity - 1))
      .attr('height', d => axisHeigth - y1(d.val2))
      .attr('fill', '#c90000');

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
      .attr('y', d => y1(d.val1))
      .attr('width', (axisWidth - margin) / (quantity - 1))
      .attr('height', d => axisHeigth - y1(d.val1))
      .attr('fill', '#f5c300');

    svg.append('line')
       .attr('x1', margin)
       .attr('y1', height - 7)
       .attr('x2', width - 64)
       .attr('y2', height - 7)
       .attr('stroke', '#37434b');

    const brushmove = () => {
      const s = brush.extent();
      const first = x(s[0]);
      this.coordinate[0] = first;
      this.coordinate[2] = x(s[1]);
      this.coordinate = [first, this.coordinate[1], x(s[1]), this.coordinate[3]];

      svg.select('.selectLine')
        .attr('class', 'selectLine')
        .attr('x1', this.coordinate[0])
        .attr('y1', this.coordinate[1])
        .attr('x2', this.coordinate[2])
        .attr('y2', this.coordinate[3])
        .attr('stroke', '#2fc6f4');
    }

    const brush = d3.svg.brush()
      .x(x)
      .extent([new Date(data[data.length - quantity - 1].time),
        new Date(data[data.length - 1].time)])
      .on("brushstart", brushstart)
      .on("brush", brushmove)
      .on("brushend", brushend);

    this.coordinate = [margin, height - 7, width - 64, height - 7];
    function brushstart() {
      svg.classed("selecting", true);
    }



    svg.append('line')
      .attr('class', 'selectLine')
      .attr('x1', this.coordinate[0])
      .attr('y1', this.coordinate[1])
      .attr('x2', this.coordinate[2])
      .attr('y2', this.coordinate[3])
      .attr('stroke', '#2fc6f4');

    function brushend() {
      svg.classed("selecting", !d3.event.target.empty());
    }

    const brushg = svg.append('g')
      .attr('class', 'brush')
      .call(brush);

    brushg.selectAll("rect")
      .attr("height", height)
      .attr('fill', 'rgba(47, 198, 244, 0.27)');

    brushg.selectAll('.resize')
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 50)
      .attr('r', 5)
      .attr('stroke-width', 6)
      .attr('stroke', '#2fc6f4')
      .attr('transform', 'translate(0,' +  height / 2 + ')');

    brushstart();
    brushmove();
  }

  listOnClick() {
    this.setState({
      listHide: !this.state.listHide,
    });
  }

  itemClick(item) {
    this.setState({
      listHide: true,
      currentValue: item.time,
    })
  }

  render() {
    const margin = window.innerWidth / 40;
    const width = window.innerWidth / 1.85;
    return (
      <div className={componentStyle.bodyComponent}>
        <svg
          width={width}
          height={30}
          >
          <text
            className="glowText"
            x={ margin }
            y={ window.innerWidth / 54.6 }
            fill={'#2fc6f4'}
            fontSize={ window.innerWidth / 120 }
            >
            FLEET ACTIVITY
          </text>
        </svg>
        <div className={componentStyle.close}>X</div>
        <div className={componentStyle.dataList}>
          <div>{this.state.currentValue} <span className={componentStyle.showListItem} onClick={this.listOnClick.bind(this)}>></span></div>
          <ul className={cx({
                [componentStyle.hiddenList]: this.state.listHide,
                [componentStyle.showList]: !this.state.listHide,
                [componentStyle.list]: true
            })}>
            {this.props.data.map((item) => {
              return <li onClick={this.itemClick.bind(this, item)}>{item.time}</li>;
            })}
          </ul>
        </div>
        <div className={componentStyle.expandImage}>
          <svg
            width="50"
            height="50"
            >
            <image
            x="0"
            y="0"
            xlinkHref={ expand }
            width="25"
            height="25"
            />
          </svg>
        </div>
        <g
          className="charts"
          transform={`translate(${window.innerWidth / 45},${window.innerWidth / 15.61})`}
          >
          <filter id="topGlow" width="100%" height="160%" x="0" y="-0.55">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </g>
      </div>
    );
  }
}
