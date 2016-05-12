import React, { Component } from 'react';
import data from './data.js';
import { Categories, MSGfilter, VehiclesFilter, ConfidenceFilter, FilterTable } from 'components';
import styles from './Anomalies.scss';
import cx from 'classnames';

export default class AnomaliesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.anomalyBlock}>
        <div className={cx(styles.backgroundGradient, styles.fleetActivity)}>
          <FilterTable data={ data } />
        </div>
        <div className={cx(styles.filters, styles.anomalyInBlock)}>
            <div className={cx(styles.barsFilters, styles.lineBlock)}>
              <div className={cx(styles.component, styles.anomalyInBlock)}>
                <MSGfilter />
              </div>
              <div className={cx(styles.component, styles.anomalyInBlock)}>
                <VehiclesFilter />
              </div>
            </div>
            <div className={cx(styles.chartsFilters, styles.lineBlock)}>
              <div className={cx(styles.component, styles.anomalyInBlock)}>
                <Categories name="filter by category" filter="true" />
              </div>
              <div className={cx(styles.component, styles.anomalyInBlock)}>
                <ConfidenceFilter />
              </div>
            </div>
        </div>
      </div>
    );
  }
}
