import React, { Component, PropTypes } from 'react';
const { object, func } = PropTypes;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CarsStatus, Anomalies, FleetActivity, Categories,
  Target, AlertsList, Map } from 'components';
import { getCarsStatus } from './../../redux/modules/carsStatus';
import { getTotalAnomalies } from './../../redux/modules/totalAnomalies';
import { getFleetActivities } from './../../redux/modules/fleetActivities';
import { getCategories } from './../../redux/modules/categories';
import { getTarget } from './../../redux/modules/target';
import { getMap } from './../../redux/modules/map';
import { getCurrentTags } from './../../redux/modules/getTags';
import { getAlertsData, showAlerts, deleteAlert } from './../../redux/modules/alertsList';
import { setTime, removeTime, stopTime,setUpdateTime } from './../../redux/modules/time';
import styles from './Dashboard.scss';
import layout from '../App/App.scss';
import cx from 'classnames';

export default class Dashboard extends Component {
  static propTypes = {
    getTags: object,
    getCurrentTags: func,
    location: object,
    getCarsStatus: func,
    getTotalAnomalies: func,
    getFleetActivities: func,
    getCategories: func,
    getTarget: func,
    getMap: func,
    getAlertsData: func,
    totalAnomalies: object,
    showAlerts: func,
    deleteAlert: func,
    alertsList: object,
    target: object,
    map: object,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      totalAnomalies: {
        suspiciousSum: 0,
        blockedSum: 0,
        totalSum: 0,
        suspiciousPercent: 0,
        blockedPercent: 0,
        cars1: 0,
        cars2: 0,
        cars3: 0,
      },
      fleetActivities: [{
        time: 0,
        activitys: 0,
        suspicious: 0,
        blocked: 0,
        startTime: new Date().getTime() - (3600 * 24 * 30 * 1000),
      }],
      registeredVehicles: {
        activities: [],
        registeredVehicles: [],
        updatedVehicles: [],
      },
      categories: [],
    };
  }

  componentDidMount() {
    if (!this.props.getTags.currentTag) {
      this.props.getCurrentTags();
    } else {
      this.props.getMap(this.props.getTags.currentTag, this.getCurrentAction(this.props.location).relativeTime);
      this.props.getAlertsData();
      this.getNewProps(this.props.getTags.currentTag);
      this.props.setTime(this.getNewProps.bind(this, this.props.getTags.currentTag));
    }
    this.props.removeTime();
  }

  componentWillReceiveProps(props) {
    if (props.categories.data.length &&
        this.props.categories.data.length !== props.categories.data.length) {
      this.setState({
        categories: this.categoriesData(props),
      });
    }

    if (props.getTags.currentTag !== this.props.getTags.currentTag && props.getTags.currentTag) {
      this.getNewProps(props.getTags.currentTag);
      this.props.getMap(props.getTags.currentTag, this.getCurrentAction(props.location).relativeTime);
      this.props.getAlertsData();
      this.props.setTime(this.getNewProps.bind(this, props.getTags.currentTag));
    }

    if (props.location.hash && this.props.location.hash !== props.location.hash) {
      this.getNewProps(props.getTags.currentTag);
      this.getNewPropsForMap(props.getTags.currentTag);
    }

    if (props.carsStatus.activities.length) {
      const result = {
        registered: props.carsStatus.registeredVehicles[0].count,
        activity: props.carsStatus.activities[props.carsStatus.activities.length - 1]
          .values[0].value / props.carsStatus.registeredVehicles[0].count * 100,
        updated: props.carsStatus.updatedVehicles[0].count
          / props.carsStatus.registeredVehicles[0].count * 100,
        percentRegistered: 12,
      };

      this.setState({
        registeredVehicles: result,
      });
    }

    if (props.fleetActivities.data.length) {
      this.setState({
        fleetActivities: this.fleetActivitiesData(props),
      });
    }

    if (props.totalAnomalies.data.length &&
      props.totalAnomalies.data.length !== this.props.totalAnomalies.data.length) {
      this.setState({
        totalAnomalies: this.totalAnomaliesData(props),
      });
    }
  }

  getCurrentAction(location) {
    const action = location.hash ? location.hash.substring(1) : '10m';
    let relativeTime = new Date().getTime();
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
    return {
      relativeTime,
      period,
    };
  }

  getNewProps(tagId) {
    const { period, relativeTime } = this.getCurrentAction(this.props.location);
    this.props.getCarsStatus(tagId, period, relativeTime);
    this.props.getTotalAnomalies(tagId, period, relativeTime);
    this.props.getFleetActivities(tagId, period, relativeTime);
    this.props.getCategories(tagId, relativeTime);
    this.props.getTarget(tagId, relativeTime);
    this.props.setUpdateTime(new Date().getTime());
  }

  getNewPropsForMap(tagId) {
    const { relativeTime } = this.getCurrentAction(this.props.location);
    this.props.getMap(tagId, relativeTime);
    this.props.getAlertsData();
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

  changeAlertsVisibilty = () => {
    this.props.showAlerts(false);
  }

  deleteAlert = (alertsType, desc2) => {
    this.props.deleteAlert(alertsType, desc2);
  }

  totalAnomaliesData(props) {
    const suspiciousAndBlockedSum = props.totalAnomalies.data.reduce((curValue, item) => ({
      suspiciousSum: curValue.suspiciousSum + item.values[0].value,
      blockedSum: curValue.blockedSum + item.values[1].value,
    }), { suspiciousSum: 0, blockedSum: 0 });
    const totalSum = suspiciousAndBlockedSum.suspiciousSum;
    return {
      suspiciousSum: suspiciousAndBlockedSum.suspiciousSum - suspiciousAndBlockedSum.blockedSum,
      blockedSum: suspiciousAndBlockedSum.blockedSum,
      totalSum,
      suspiciousPercent: (suspiciousAndBlockedSum.suspiciousSum
        - suspiciousAndBlockedSum.blockedSum) / totalSum * 100,
      blockedPercent: suspiciousAndBlockedSum.blockedSum / totalSum * 100,
      cars1: props.totalAnomalies.cars1,
      cars2: props.totalAnomalies.cars2,
      cars3: props.totalAnomalies.cars3,
    };
  }

  fleetActivitiesData(props) {
    const resultArray = [];
    const startTime = this.getCurrentAction(props.location).relativeTime;

    for (let i = 0; props.fleetActivities.data.length > i; i++) {
      if (!props.carsStatus.activities[i] || !props.fleetActivities.data[i]) {
        break;
      }

      const _activitys = (props.carsStatus.activities[i]) ? props.carsStatus.activities[i].values[0].value : 0;
      const newBar = {
        time: props.fleetActivities.data[i].timestamp,
        startTime,
        activitys: _activitys,
        suspicious: props.fleetActivities.data[i].values[0].value,
        blocked: props.fleetActivities.data[i].values[1].value,
      };
      resultArray.push(newBar);
    }
    return resultArray;
  }

  render() {
    return (
      <div>
        <div className={layout.layout}>
          <div className={cx(
            layout.layoutSideRight,
            layout.layoutCol20,
            this.props.alertsList.showAlerts ? '' : layout.notActive
           )}
          >
            <AlertsList
              alerts={this.props.alertsList}
              onClick={this.changeAlertsVisibilty}
              onResolveClick={this.deleteAlert}
            />
          </div>
          <div className={cx(layout.layoutSideLeft, layout.layoutCol80)}>
            <div className={cx(layout.layoutCol45, styles.backgroundGradient)}>
              <CarsStatus
                registeredCars={ this.state.registeredVehicles.registered }
                percentRegistered={ this.state.registeredVehicles.percentRegistered }
                active={ this.state.registeredVehicles.activity }
                uptodate={ this.state.registeredVehicles.updated }
                updateData={'13.01.16'}
              />
            </div>
            <div className={cx(layout.borderRight, layout.layoutCol55, styles.backgroundGradient)}>
              <Anomalies
                anomalies={ this.state.totalAnomalies.totalSum }
                cars1={ this.state.totalAnomalies.cars1 }
                percent={ this.state.totalAnomalies.blockedPercent }
                percentRight={ this.state.totalAnomalies.suspiciousPercent }
                unblocked={ this.state.totalAnomalies.suspiciousSum }
                cars2={ this.state.totalAnomalies.cars2 }
                blocked={ this.state.totalAnomalies.blockedSum }
                cars3={ this.state.totalAnomalies.cars3 }
              />
            </div>
            <div className={cx(layout.layoutSideRight, layout.layoutCol30)}>
              <Target
                data={ this.props.target }
              />
            </div>
            <div className={cx(styles.fleetActivities, layout.layoutSideLeft, layout.layoutCol70)}>
              <div className={cx(styles.backgroundGradient, styles.fleetActivity)}>
                <FleetActivity
                  data={ this.state.fleetActivities }
                  alertChange={ this.props.alertsList.showAlerts }
                  registered={ this.props.carsStatus.registeredVehicles.length
                    ? this.props.carsStatus.registeredVehicles[0].count : 0 }
                />
              </div>
              <div className={cx(styles.fleetActivity, layout.layoutCol50, layout.height50)}>
                <Categories
                  name="categories"
                  data={ this.state.categories }
                />
              </div>
              <div className={cx(layout.layoutCol50, layout.height50)}>
                <Map
                  locations={this.props.map.data}
                  desc={this.props.map.center.desc}
                  lng={this.props.map.center.lng}
                  lat={this.props.map.center.lat}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({
    carsStatus,
    totalAnomalies,
    fleetActivities,
    categories,
    target,
    map,
    alertsList,
    getTags,
    }) => ({
      carsStatus,
      totalAnomalies,
      fleetActivities,
      categories,
      target,
      map,
      alertsList,
      getTags,
    }),
    dispatch => bindActionCreators({
      getCarsStatus,
      showAlerts,
      deleteAlert,
      getTotalAnomalies,
      getFleetActivities,
      getCategories,
      getTarget,
      getMap,
      getAlertsData,
      getCurrentTags,
      setTime,
      removeTime,
      stopTime,
      setUpdateTime,
    }, dispatch)
)(Dashboard);
