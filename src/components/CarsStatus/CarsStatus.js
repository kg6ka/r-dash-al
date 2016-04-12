import React, { Component } from 'react';
import { RegisteredCars, PercentColumn } from './components'; 
export default class CarsStatus extends Component {

  constructor(props) {
    super(props);
    this.screenWidth = window.innerWidth;
    this.active = Math.round(props.active);
    this.uptodate = Math.round(props.uptodate);
  }

  componentWillReceiveProps(nextProps) {
    this.active = Math.round(nextProps.active);
    this.uptodate = Math.round(nextProps.uptodate);
  }

  render() {
    const { registeredCars, percentRegistered, updateData } = this.props;
    const translateString1 = 'translate(' + this.screenWidth / 6.3 + ', ' + this.screenWidth / 33.7 + ')';
    const translateString2 = 'translate(' + this.screenWidth / 4 + ', ' + this.screenWidth / 33.7 + ')';
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
          >
            FLEET STATUS
          </text>
          <RegisteredCars registered={ registeredCars } percent={ percentRegistered } />
          <g transform={ translateString1 }>
            <PercentColumn
              className={'activeVehicles'}
              percent={ this.active }
              lable={['Active', 'Vehicles']}
            />
          </g>
          <g transform={ translateString2 }>
            <PercentColumn
              className={'upToDateVehicles'}
              percent={ this.uptodate }
              lable={['Up to Date', 'Vehicles']}
              description={['Last Update', `${updateData}`]}
            />
          </g>
        </svg>
      </div>
    );
  }
}
