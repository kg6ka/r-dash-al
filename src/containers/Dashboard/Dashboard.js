import React, { Component } from 'react';
import { CarsStatus, Anomalies } from 'components';
import styles from './Dashboard.scss';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: Math.random(),
    };
    window.setInterval(() => {
      this.setState({
        percent: Math.random(),
      });
    }, 2000);
  }

  render() {
    return (
      <x-layout className={styles.backgroundGradient}>
        <section className="side-right col-20">
           side-right
        </section>
        <section className="side-left col-80">
          <section className="side-left col-100 blue-shadow">
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
          </section>
          <section className="side-right col-20">
             side-right
          </section>
          <section className="side-left col-80">
            <section className="side-left col-100 blue-shadow">
            </section>
            <section className="side-right col-50">
               side-right
            </section>
            <section className="side-left col-50">
            </section>
          </section>
        </section>
      </x-layout>
    );
  }
}
