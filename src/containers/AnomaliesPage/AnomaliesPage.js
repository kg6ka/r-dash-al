import React, { Component } from 'react';
import { Categories } from 'components';
import styles from './Anomalies.scss';
import data from './data.js';

export default class AnomaliesPage extends Component {
  constructor(props) {
    debugger;
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className={styles.fleetActivity}>
          <Categories name="filter by category" />
        </div>
      </div>
    );
  }
}
