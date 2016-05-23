import React, { Component, PropTypes } from 'react';
const { object, func } = PropTypes;
import { connect } from 'react-redux';
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
import { bindActionCreators } from 'redux';
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
        time: 67567,
        activitys: 0,
        suspicious: 0,
        blocked: 0,
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
    if (!this.props.getTags.data.length) {
      this.props.getCurrentTags();
    } else {
      this.getNewProps();
    }
    window.setInterval(this.getNewProps.bind(this), 10000);
  }

  componentWillReceiveProps(props) {
    if (props.categories.data.length) {
      this.setState({
        categories: this.categoriesData(props),
      });
    }

    if (props.location.hash && this.props.location.hash !== props.location.hash) {
      this.getNewProps();
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

      if (props.fleetActivities.data.length) {
        this.setState({
          fleetActivities: this.fleetActivitiesData(props),
        });
      }
    }

    if (props.totalAnomalies.data.length &&
      props.totalAnomalies.data.length !== this.props.totalAnomalies.data.length) {
      this.setState({
        totalAnomalies: this.totalAnomaliesData(props),
      });
    }
  }

  getNewProps() {
    const action = this.props.location.hash.substring(1) || '10m';
    let relativeTime = new Date();
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

    this.props.getCarsStatus(this.props.getTags.data[0].tagId, period, relativeTime);
    this.props.getTotalAnomalies(this.props.getTags.data[0].tagId, period, relativeTime);
    this.props.getFleetActivities(this.props.getTags.data[0].tagId, period, relativeTime);
    this.props.getCategories(this.props.getTags.data[0].tagId, relativeTime);
    this.props.getTarget(this.props.getTags.data[0].tagId, relativeTime);
    this.props.getMap(this.props.getTags.data[0].tagId, relativeTime);
    this.props.getAlertsData();
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
    return props.fleetActivities.data.reduce((curValue, item) => {
      const newBar = {
        time: item.timestamp,
        activitys: props.carsStatus.activities[0].values[0].value,
        suspicious: item.values[0].value,
        blocked: item.values[1].value,
      };
      return [...curValue, newBar];
    }, []);
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
    }, dispatch)
)(Dashboard);
