import React, { Component } from 'react';
import { CarsStatus, Anomalies, Delimiter } from 'components';
console.log('cs', CarsStatus);

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: Math.random(),
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        percent: Math.random(),
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        <CarsStatus
          registeredCars={'35,203'}
          percentRegistered={12}
          active={Math.random() * 100}
          uptodate={Math.random() * 100}
          updateData={'13.01.16'}
        />
        <Anomalies
          anomalies={310}
          cars1={90}
          percent={10}
          percentRight={Math.random() * 100}
          unblocked={100}
          cars2={89}
          blocked={210}
          cars3={5}
        />
        <Delimiter />
      </div>
    );
  }
}