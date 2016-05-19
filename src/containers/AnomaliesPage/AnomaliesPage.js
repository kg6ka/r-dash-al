import React, { Component, PropTypes } from 'react';
const { func } = PropTypes;
import { bindActionCreators } from 'redux';
import { Categories, MSGfilter, VehiclesFilter, ConfidenceFilter,
  FilterTable, MapsPopup, AnomaliesList } from 'components';
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

export default class AnomaliesPage extends Component {
  static propTypes = {
    openMapsPopup: func,
  };

  constructor(props) {
    super(props);
    this.state = {
      bars: [],
      confidence: {
        data: [],
      },
    };
    this.state.anomalies = argusComponents.fleetActivity.bars;
  }

  componentDidMount() {
    this.props.getCategories('11111111-1111-1111-3333-000000000031');
    this.props.getAnomaliesList('11111111-1111-1111-3333-000000000031');
    this.props.getCarsStatus('11111111-1111-1111-3333-000000000031', this.props.routeParams.period || '5s');
    this.props.getFleetActivities('11111111-1111-1111-3333-000000000031', this.props.routeParams.period || '5s');
    this.props.getAnomaliesConfidence('11111111-1111-1111-3333-000000000031');
  }

  fleetActivitiesData(props) {
    return props.carsStatus.activities.reduce((curValue, item, index) => {
      const newBar = {
        time: item.timestamp,
        activitys: item.values[0].value,
        suspicious: props.fleetActivities.data[index].values[0].value,
        blocked: props.fleetActivities.data[index].values[1].value,
      };
      return [...curValue, newBar];
    }, []);
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

  componentWillReceiveProps(props) {
    if (this.props.routeParams.period !== props.routeParams.period) {
      this.props.getCarsStatus('11111111-1111-1111-3333-000000000031', props.routeParams.period || '5s');
      this.props.getFleetActivities('11111111-1111-1111-3333-000000000031', this.props.routeParams.period || '5s');
    }

    if (props.anomaliesList.data.length !== this.props.anomaliesList.data.length) {
      this.setState({
        anomalies: props.anomaliesList.data,
      });
    }

    if (props.fleetActivities.data.length !== 0
      && props.carsStatus.activities.length !== 0) {
      this.setState({
        bars: this.fleetActivitiesData(props),
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

      const items = props.confidenceFilter.data.map((item, index) => {
        return {
          total: item.total,
          offset: informationData[index].offset,
          color: informationData[index].color,
          key: item.key,
        };
      });

      confidence.data = items;

      let max = 0;
      for(let i; i < items.length; i++) {
        if(confidence.data[i].total > max) {
          max = confidence.data[i].total;
        }
      }

      if(max > 500) max = 1000;
      if(max <= 500) max = 500;
      if(max <= 100) max = 100;
      if(max <= 10) max = 10;
      if(max <= 5) max = 5;

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
                                              item.timestamp > min &&
                                              item.timestamp < max);

    this.setState({
      anomalies: filterData,
    });
  }

  filterByCategory(type) {
    const filterList = this.state.anomalies.filter((item) => item.detailedCause.toUpperCase() === type);
    this.setState({
      anomalies: filterList,
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
          className={cx(layout.layoutSideLeft, layout.layoutCol50)}
          onClick={ this.props.openMapsPopup }
        >

          <div className={cx(styles.backgroundGradient)}>
            <FilterTable data={ data } onChange={::this.onChangeSelect} />
          </div>
          <div className={cx(layout.layoutCol50, layout.height50, layout.borderRightButtom)}>
            <MSGfilter />
          </div>
          <div className={cx(layout.layoutCol50,layout.height50)}>
            <VehiclesFilter />
          </div>
          <div className={cx(layout.layoutCol50, layout.height50)}>
            <Categories name="filter by category" filter="true" data={ this.state.categories } onChange={ ::this.filterByCategory } />
          </div>
          <div className={cx(layout.layoutCol50, layout.height50, layout.borderLeftTop)}>
            <ConfidenceFilter max={ this.state.confidence.maxDomain } data={ this.state.confidence.data } />
          </div>
          <MapsPopup />
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
  }) => ({
    mapsPopup,
    categories,
    anomaliesList,
    fleetActivities,
    carsStatus,
    confidenceFilter,
  }),
    dispatch => bindActionCreators({
      openMapsPopup,
      getCategories,
      getAnomaliesList,
      getFleetActivities,
      getCarsStatus,
      getAnomaliesConfidence,
    }, dispatch)
)(AnomaliesPage);
