import React, { Component, PropTypes } from 'react';
const { func } = PropTypes;
import data from './data.js';
import { Categories, MSGfilter, VehiclesFilter, ConfidenceFilter,
  FilterTable, MapsPopup, HeaderSite } from 'components';
import styles from './Anomalies.scss';
import cx from 'classnames';
import { connect } from 'react-redux';
import { openMapsPopup } from 'redux/modules/mapsPopup';

export default class AnomaliesPage extends Component {
  static propTypes = {
    openMapsPopup: func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <HeaderSite onClick={ this.changeAlertsVisibilty } />
        <div
          className={cx(styles.anomaliesContent, styles.anomalyBlock)}
          onClick={ this.props.openMapsPopup }
        >
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
                <div className={cx(styles.component, styles.anomalyInBlock, styles.category)}>
                  <Categories name="filter by category" filter="true" />
                </div>
                <div className={cx(styles.component, styles.anomalyInBlock)}>
                  <ConfidenceFilter />
                </div>
              </div>
          </div>
          <MapsPopup />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ mapsPopup }) => ({ mapsPopup }),
  { openMapsPopup }
)(AnomaliesPage);
