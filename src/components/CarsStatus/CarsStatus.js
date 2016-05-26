import React, { Component, PropTypes } from 'react';
const { string, number } = PropTypes;
import { RegisteredCars, PercentColumn } from './components';

export default class CarsStatus extends Component {
  static propTypes = {
    registeredCars: number,
    percentRegistered: number,
    active: number,
    uptodate: number,
    updateData: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      active: props.active ? Math.round(props.active) : 0,
      uptodate: props.uptodate ? Math.round(props.uptodate) : 0,
    };
    this.screenWidth = window.innerWidth;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: Math.round(nextProps.active),
      uptodate: Math.round(nextProps.uptodate),
    });
  }

  render() {
    const { registeredCars, percentRegistered, updateData } = this.props;
    const translateString1 = `translate(${this.screenWidth / 6.3}, ${this.screenWidth / 33.7})`;
    const translateString2 = `translate(${this.screenWidth / 4}, ${this.screenWidth / 33.7})`;
    return (
      <div className={'carsStatus'}>
        <svg
          height="100%"
          width="100%"
        >
          <text
            className="glowText"
            x={ this.screenWidth / 96 }
            y={ this.screenWidth / 54.6 }
            fill={'#2fc6f4'}
            fontSize={this.screenWidth / 120}
            fontFamily="telegrafico"
          >
            FLEET STATUS
          </text>
          <RegisteredCars registered={ registeredCars } percent={ percentRegistered } />
          <g transform={ translateString1 }>
            { !isNaN(this.state.active) ?
              <PercentColumn
                className={'activeVehicles'}
                percent={ this.state.active }
                lable={['Active', 'Vehicles']}
              /> : null }
          </g>
          <g transform={ translateString2 }>
            { this.state.uptodate ?
              <PercentColumn
                className={'upToDateVehicles'}
                percent={ this.state.uptodate }
                lable={['Up to Date', 'Vehicles']}
                description={['Last Update', `${updateData}`]}
              /> : null }
          </g>
        </svg>
      </div>
    );
  }
}
