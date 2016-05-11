import React, { Component } from 'react';
import { Categories, FilterTable } from 'components';
import styles from './Anomalies.scss';
import data from './data.js';
import cx from 'classnames';

export default class AnomaliesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className={styles.fleetActivity}>
          <Categories name="filter by category" />
        </div>
        <div className={cx(styles.backgroundGradient, styles.fleetActivity)}>
          <FilterTable data={ data }
                          color1={'suspiciousGradient'}
                          color2={'blockedGradient'}
                          color3={'transmittingGradient'}
          />
        </div>

      </div>
    );
  }
}
