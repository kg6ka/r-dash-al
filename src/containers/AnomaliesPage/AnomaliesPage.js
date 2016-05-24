import React, { Component, PropTypes } from 'react';
const { func, object } = PropTypes;
import { bindActionCreators } from 'redux';
import { Categories, MSGfilter, VehiclesFilter, ConfidenceFilter,
  FilterTable, MapsPopup, AnomaliesList, BackBtn } from 'components';
import styles from './Anomalies.scss';
import layout from '../App/App.scss';
import cx from 'classnames';
import { connect } from 'react-redux';
import { openMapsPopup } from 'redux/modules/mapsPopup';
import { getCategories } from './../../redux/modules/categories';
import { getAnomaliesList } from './../../redux/modules/anomaliesList';
import { getFleetActivities } from './../../redux/modules/fleetActivities';
import { getCarsStatus } from './../../redux/modules/carsStatus';
import { getAnomaliesConfidence } from './../../redux/modules/confidenceFilter';
import { getCurrentTags } from './../../redux/modules/getTags';
import { getTarget } from './../../redux/modules/target';

export default class AnomaliesPage extends Component {
  static propTypes = {
    openMapsPopup: func,
    getCategories: func,
    getAnomaliesList: func,
    anomaliesList: object,
    getTags: object,
    getCurrentTags: func,
    location: object,
    getCarsStatus: func,
    getFleetActivities: func,
    getAnomaliesConfidence: func,
  };

  constructor(props) {
    super(props);
    this.state = {
      bars: {
        result: [],
        total: 0,
      },
      confidence: {
        data: [],
      },
      anomalies: [],
    };
  }

  componentDidMount() {
    if (!this.props.getTags.data.length || !this.props.getTags.data[0].tagId) {
      this.props.getCurrentTags();
    } else {
      this.getNewProps(this.props);
      window.setInterval(this.getNewProps.bind(this, this.props), 10000);
    }
  }

  componentWillReceiveProps(props) {
    if (props.getTags.data.length > 0 &&
      this.props.getTags.data.length > 0 &&
      props.getTags.data[0].tagId !== this.props.getTags.data[0].tagId) {
      this.getNewProps(props);
      window.setInterval(this.getNewProps.bind(this, props), 10000);
    }
    if (props.location.hash && this.props.location.hash !== props.location.hash) {
      this.getNewProps(props);
    }

    if (props.anomaliesList.data.length !== this.props.anomaliesList.data.length) {
      this.setState({
        anomalies: props.anomaliesList.data,
      });
    }

    if (props.fleetActivities.data.length !== 0
      && props.carsStatus.activities.length !== 0) {
      const result = this.fleetActivitiesData(props);
      this.setState({
        bars: {
          result,
          total: props.carsStatus.registeredVehicles[0].count,
        },
      });
    }
    if (props.categories.data.length) {
      this.setState({
        categories: this.categoriesData(props),
      });
    }

    if (props.confidenceFilter.data.length) {
      const confidence = {};

      const informationData = [
        { offset: window.innerWidth / 25.26, color: '#ffeeb2', val: 50 },
        { offset: window.innerWidth / 15.5, color: '#ffe400', val: 60 },
        { offset: window.innerWidth / 11.2, color: '#f07742', val: 100 },
        { offset: window.innerWidth / 8.73, color: '#ff7f00', val: 93 },
        { offset: window.innerWidth / 7.16, color: '#ff7f00', val: 48 },
        { offset: window.innerWidth / 7.16, color: '#ff7f00', val: 48 },
      ];

      const items = props.confidenceFilter.data.map((item, index) =>
        ({
          total: item.total,
          offset: informationData[index].offset,
          color: informationData[index].color,
          key: item.key,
        })
      );

      confidence.data = items;

      let max = 0;
      for (let i; i < items.length; i++) {
        if (confidence.data[i].total > max) {
          max = confidence.data[i].total;
        }
      }

      if (max > 500) max = 1000;
      if (max <= 500) max = 500;
      if (max <= 100) max = 100;
      if (max <= 10) max = 10;
      if (max <= 5) max = 5;

      this.setState({
        confidence: {
          data: items,
          maxDomain: max,
        },
      });
    }
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

    const filterData = this.props.anomaliesList.data.filter((item) =>
      item.timestamp > min && item.timestamp < max);
    this.setState({
      anomalies: filterData,
    });
  }

  getNewProps(props) {
    const action = props.location.hash ? props.location.hash.substring(1) : '10m';
    let relativeTime = new Date().getTime();
    let period = '';
    switch (action) {
      case '10m': period = '5s';
        relativeTime = relativeTime - 60000 * 10;
        break;
      case '1h': period = '30s';
        relativeTime = relativeTime - 60000 * 60;
        break;
      case '1d': period = '10m';
        relativeTime = relativeTime - 60000 * 60 * 24;
        break;
      case '1w': period = '1h';
        relativeTime = relativeTime - 60000 * 60 * 24 * 7;
        break;
      case '1m': period = '6h';
        relativeTime = relativeTime - 60000 * 60 * 24 * 7 * 4;
        break;
    }

    this.props.getCarsStatus(props.getTags.data[0].tagId, period, relativeTime);
    this.props.getCategories(props.getTags.data[0].tagId, relativeTime);
    this.props.getAnomaliesList(props.getTags.data[0].tagId, relativeTime);
    this.props.getCarsStatus(props.getTags.data[0].tagId, period, relativeTime);
    this.props.getFleetActivities(props.getTags.data[0].tagId, period, relativeTime);
    this.props.getAnomaliesConfidence(props.getTags.data[0].tagId, relativeTime);
    this.props.getTarget(props.getTags.data[0].tagId, relativeTime);
  }

  fleetActivitiesData(props) {
    const resultArray = [];
    for (let i = 0; props.fleetActivities.data.length > i; i++) {
      if (!props.carsStatus.activities[i] || !props.fleetActivities.data[i]) {
        break;
      }
      const newBar = {
        time: props.fleetActivities.data[i].timestamp,
        activitys: props.carsStatus.activities[0].values[0].value,
        suspicious: props.fleetActivities.data[0].values[0].value,
        blocked: props.fleetActivities.data[0].values[1].value,
      };
      resultArray.push(newBar);
    }
    return resultArray;
  }

  categoriesData(props) {
    const old = [
      { offset: window.innerWidth / 25.26, color: '#b2d733' },
      { offset: window.innerWidth / 15.5, color: '#13aa38' },
      { offset: window.innerWidth / 11.2, color: '#1156e4' },
      { offset: window.innerWidth / 8.73, color: '#904fff' },
      { offset: window.innerWidth / 7.16, color: '#fff' },
    ];

    const sum = props.categories.data.reduce((curValue, item) => curValue + item.total, 0);

    return props.categories.data.reduce((curValue, item, index) => {
      const dataCategory = {
        text: item.key.replace(/_/g, ' '),
        percent: Math.floor(item.total * 100 / sum),
        offset: old[index].offset,
        color: old[index].color,
      };
      return [...curValue, dataCategory];
    }, []);
  }

  filterByCategory(type) {
    const filterList = this.state.anomalies.filter((item) =>
      item.cause === type.trim().replace(/ /g, '_').toUpperCase());
    this.setState({
      anomalies: filterList,
    });
  }

  filterByMessage(data, filter) {
    let filterData;
    if (filter === 'ID') {
      filterData = this.state.anomalies.filter((item) => item.messageId === data.key);
    } else {
      filterData = this.state.anomalies.filter((item) => item.targetEcus.indexOf(data.key) !== -1);
    }

    this.setState({
      anomalies: filterData,
    });
  }

  confidenceFilter(type) {
    const filterList = this.state.anomalies.filter((item) => item.likelihood.toString() === type);
    this.setState({
      anomalies: filterList,
    });
  }

  filterByVehicles(data) {
    const filterList = this.state.anomalies.filter((item) =>
      item.vehicleId.toString() === data.key);
    this.setState({
      anomalies: filterList,
    });
  }

  render() {
    return (
      <div className={cx(layout.layout, styles.anomaliesContent)}>
        <div className={styles.anomaliesHeader}>
        <BackBtn />
        </div>
        <div
          className={cx(layout.layoutSideLeft, layout.layoutCol50)}
        >
          <div className={cx(styles.backgroundGradient)}>
            <FilterTable data={ this.state.bars.result } total={ this.state.bars.total } onChange={::this.onChangeSelect} />
          </div>
          <div className={cx(layout.layoutCol50, layout.height50, layout.borderRightButtom)}>
            <MSGfilter data={ this.props.target } onChange={ ::this.filterByMessage } />
          </div>
          <div className={cx(layout.layoutCol50, layout.height50)}>
            <VehiclesFilter data={ this.props.target } onChange={ ::this.filterByVehicles } />
          </div>
          <div className={cx(layout.layoutCol50, layout.height50)}>
            <Categories
              name="filter by category"
              filter="true"
              data={ this.state.categories }
              onChange={ ::this.filterByCategory }
            />
          </div>
          <div className={cx(layout.layoutCol50, layout.height50, layout.borderLeftTop)}>
            <ConfidenceFilter
              max={ this.state.confidence.maxDomain }
              data={ this.state.confidence.data }
              onChange={ ::this.confidenceFilter }
            />
          </div>
          <MapsPopup />
        </div>
        <div className={cx(layout.layoutSideRight, layout.layoutCol50, styles.anomaliesList)}>
            <AnomaliesList anomalies={ this.state.anomalies } />
        </div>
      </div>
    );
  }
}

export default connect(
  ({
    mapsPopup,
    categories,
    anomaliesList,
    fleetActivities,
    carsStatus,
    confidenceFilter,
    getTags,
    target,
  }) => ({
    mapsPopup,
    categories,
    anomaliesList,
    fleetActivities,
    carsStatus,
    confidenceFilter,
    getTags,
    target,
  }),
    dispatch => bindActionCreators({
      openMapsPopup,
      getCategories,
      getAnomaliesList,
      getFleetActivities,
      getCarsStatus,
      getAnomaliesConfidence,
      getCurrentTags,
      getTarget,
    }, dispatch)
)(AnomaliesPage);
