import React, { Component, PropTypes } from 'react';
const { func } = PropTypes;
// import data from './data.js';
import { Categories, MSGfilter, VehiclesFilter, ConfidenceFilter,
  FilterTable, MapsPopup,AnomaliesList } from 'components';
import styles from './Anomalies.scss';
import layout from '../App/App.scss';
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
    this.state.anomalies = argusComponents.fleetActivity.bars;
  }

  onChangeSelect(range) {
    const rangeToData = [
      new Date(range[0]).getTime(),
      new Date(range[1]).getTime(),
    ];
    let max;
    let min;
    if (rangeToData[0] > rangeToData[1]) {
      max = rangeToData[0];
      min = rangeToData[1];
    } else {
      max = rangeToData[1];
      min = rangeToData[0];
    }
    const filterData = this.state.anomalies.filter((item) => new Date(item.time) > min && new Date(item.time) < max);

    this.setState({
      anomalies: filterData,
    });
  }

  render() {
    const data = argusComponents.fleetActivity.bars;
    return (

      <div className={layout.layout}>
        <div className="backBtn"></div>
        <div className={cx(layout.layoutSideRight, layout.layoutCol50)}>
            <AnomaliesList anomalies={ this.state.anomalies } />
        </div>
        <div
          className={cx(layout.layoutSideLeft,layout.layoutCol50)}
          onClick={ this.props.openMapsPopup }
        >

          <div className={cx(styles.backgroundGradient)}>
            <FilterTable data={ data } onChange={::this.onChangeSelect} />
          </div>
          <div className={cx(layout.layoutCol50,layout.height50,layout.borderRightButtom)}>
            <MSGfilter />
          </div>
          <div className={cx(layout.layoutCol50,layout.height50)}>
            <VehiclesFilter />
          </div>
          <div className={cx(layout.layoutCol50,layout.height50)}>
            <Categories name="filter by category" filter="true" />
          </div>
          <div className={cx(layout.layoutCol50,layout.height50,layout.borderLeftTop)}>
            <ConfidenceFilter />
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
