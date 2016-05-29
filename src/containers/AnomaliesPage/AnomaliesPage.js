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
import { getAnomaliesList, updateTimeRange, setFilter, clearFilter } from './../../redux/modules/anomaliesList';
import { getFleetActivities } from './../../redux/modules/fleetActivities';
import { getCarsStatus } from './../../redux/modules/carsStatus';
import { getAnomaliesConfidence } from './../../redux/modules/confidenceFilter';
import { getCurrentTags } from './../../redux/modules/getTags';
import { getTarget } from './../../redux/modules/target';
import { setTime, removeTime, stopTime } from './../../redux/modules/time';

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
      timeRange:[new Date().getTime() - 180000,new Date().getTime()]
    };
  }

  componentDidMount() {
    if (!this.props.getTags.currentTag) {
      this.props.getCurrentTags();
    } else {
      this.getNewProps(this.props.getTags.currentTag);
      this.props.setTime(this.getNewProps.bind(this, this.props.getTags.currentTag));
    }

    this.props.stopTime();
    this.props.updateTimeRange(this.getRelativeTime().relativeTime, new Date().getTime());
    const range = [this.props.anomaliesList.startTime, this.props.anomaliesList.endTime];
    this.getFilteredData(range, this.props);
  }

  componentWillReceiveProps(props) {
    if (props.getTags.currentTag !== this.props.getTags.currentTag && props.getTags.currentTag) {
      this.getNewProps(props.getTags.currentTag);
      this.props.setTime(this.getNewProps.bind(this, props.getTags.currentTag));
    }

    if (props.location.hash && this.props.location.hash !== props.location.hash) {
      this.getNewProps(props.getTags.currentTag);
      this.props.updateTimeRange(this.getRelativeTime().relativeTime, new Date().getTime());
    }

    if (props.anomaliesList.data.length) {
      this.setState({
        anomalies: props.anomaliesList.data,
      });
    }else{
      this.setState({
        anomalies: [],
      });
    }

    if (props.fleetActivities.data.length) {
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

      if (this.props.anomaliesList.startTime !== props.anomaliesList.startTime
        || this.props.anomaliesList.endTime !== props.anomaliesList.endTime) {

        const range = [props.anomaliesList.startTime, props.anomaliesList.endTime];
        this.getFilteredData(range, props);
      }

      this.setState({
        confidence: {
          data: items,
          maxDomain: max,
        },
      });
    }
  }
  getFilteredData(range, props) {
    let max;
    let min;
    if (range[0] > range[1]) {
      max = range[0];
      min = range[1];
    } else {
      max = range[1];
      min = range[0];
    }
    const filterData = props.anomaliesList.data.filter((item) => {
      const itemDate = new Date(item.timestamp).getTime();
      return itemDate > min && itemDate < max;
    });

    this.setState({
      anomalies: filterData,
    });
  }

  getRelativeTime (tagId) {
    const action = this.props.location.hash ? this.props.location.hash.substring(1) : '10m';
    let nowTime = new Date().getTime();
    let relativeTime = nowTime;
    
    let period = '5s';
    switch (action) {
      case '10m':
        period = '5s';
        relativeTime = relativeTime - 60000 * 10;
        break;
      case '1h':
        period = '30s';
        relativeTime = relativeTime - 60000 * 60;
        break;
      case '1d':
        period = '10m';
        relativeTime = relativeTime - 60000 * 60 * 24;
        break;
      case '1w':
        period = '1h';
        relativeTime = relativeTime - 60000 * 60 * 24 * 7;
        break;
      case '1m':
        period = '6h';
        relativeTime = relativeTime - 60000 * 60 * 24 * 7 * 4;
        break;
      default:
        period = '5s';
        relativeTime = relativeTime - 60000 * 10;
        break;
    }

    relativeTime = Math.round(relativeTime);
    return {period, relativeTime, nowTime};
  }
  getNewProps(tagId) {
    const { nowTime, relativeTime, period } = this.getRelativeTime();

    this.props.getCarsStatus(tagId, period, relativeTime, nowTime);
    this.props.getCategories(tagId, relativeTime, nowTime);
    this.props.getAnomaliesList(tagId, relativeTime, nowTime);
    this.props.getCarsStatus(tagId, period, relativeTime, nowTime);
    this.props.getFleetActivities(tagId, period, relativeTime, nowTime);
    this.props.getAnomaliesConfidence(tagId, relativeTime, nowTime);
    this.props.getTarget(tagId, relativeTime, nowTime);
  }


  updateRange(from,to) {
    this.props.getAnomaliesList(this.props.getTags.currentTag, from, to);
    this.props.getAnomaliesConfidence(this.props.getTags.currentTag, from, to);
    this.props.getTarget(this.props.getTags.currentTag, from, to);
    this.setState({
      timeRange:[from,to]
    })
  }

  fleetActivitiesData(props) {
    const resultArray = [];
    for (let i = 0; props.fleetActivities.data.length > i; i++) {
      if (!props.carsStatus.activities[i] || !props.fleetActivities.data[i]) {
        break;
      }
      const newBar = {
        time: props.fleetActivities.data[i].timestamp,
        activitys: props.carsStatus.activities[i].values[0].value,
        suspicious: props.fleetActivities.data[i].values[0].value,
        blocked: props.fleetActivities.data[i].values[1].value,
      };
      resultArray.push(newBar);
    }
    return resultArray;
  }

  clearFilter() {
//     this.setState({
//       anomalies: props.anomaliesList.data,
//     });
    let fileds = document.querySelectorAll('.table-search-input');
    if(fileds.length > 0)
      Object.keys(fileds).map(i => fileds[i].value = '');
  }

  categoriesData(props) {
    const sum = props.categories.data.reduce((curValue, item) => curValue + item.total, 0);

    return props.categories.data.reduce((curValue, item) => {
      const dataCategory = {
        text: item.key.replace(/_/g, ' '),
        percent: Math.floor(item.total * 100 / sum),
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
    const range = [this.props.anomaliesList.startTime, this.props.anomaliesList.endTime];
    const { relativeTime } = this.getRelativeTime();
    return ( 
      <div className={cx(layout.layout, styles.anomaliesContent)}>
        <div className={styles.anomaliesHeader}>
        <BackBtn />
        </div>
        <div
          className={cx(layout.layoutSideLeft, layout.layoutCol45)}
        >
          <div className={cx(styles.backgroundGradient)}>
            <FilterTable
              data={ this.state.bars.result }
              time={ relativeTime }
              updateRange={ (fT, sT) => this.updateRange(fT, sT) }
              timeRange={this.state.timeRange}
              total={ this.state.bars.total }

              />
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
        <div className={cx(layout.layoutSideRight, layout.layoutCol55, styles.anomaliesList)}>
          <AnomaliesList
            currentTag={ this.props.getTags.currentTag }
            location={ this.props.location }
            anomalies={ this.state.anomalies }
            filters={ this.props.anomaliesList.filters }
            setFilter={ this.props.setFilter }
            clearFilter={ this.clearFilter }/>
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
      setTime,
      removeTime,
      updateTimeRange,
      stopTime,
      setFilter,
      clearFilter,
    }, dispatch)
)(AnomaliesPage);
