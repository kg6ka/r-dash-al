import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderSite, CarsStatus, Anomalies, FleetActivity, Categories,
  Target, VisibleAlertsList, Map } from 'components';
import { getCarsStatus } from './../../redux/modules/carsStatus';
import { getTotalAnomalies } from './../../redux/modules/totalAnomalies';
import { getFleetActivities } from './../../redux/modules/fleetActivities';
import { getCategories } from './../../redux/modules/categories';
import { getTarget } from './../../redux/modules/target';
import { getMap } from './../../redux/modules/map';
import { bindActionCreators } from 'redux';
import styles from './Dashboard.scss';
import cx from 'classnames';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      alertsVisibility: false,
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
    this.props.getCarsStatus('11111111-1111-1111-3333-000000000031');
    this.props.getTotalAnomalies('11111111-1111-1111-3333-000000000031');
    this.props.getFleetActivities('11111111-1111-1111-3333-000000000031');
    this.props.getCategories('11111111-1111-1111-3333-000000000031');
    this.props.getTarget('11111111-1111-1111-3333-000000000031');
    this.props.getMap('11111111-1111-1111-3333-000000000031');
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
    if (props.categories.data.length) {
      this.setState({
        categories: this.categoriesData(props),
      });
    }

    if (props.carsStatus.activities.length) {
      const result = {
        registered: props.carsStatus.registeredVehicles[0].count,
        activity: props.carsStatus.activities[props.carsStatus.activities.length - 1].values[0].value
        / props.carsStatus.registeredVehicles[0].count * 100,
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

  totalAnomaliesData(props) {
    const suspiciousAndBlockedSum = props.totalAnomalies.data.reduce((curValue, item) => {
      return {
        suspiciousSum: curValue.suspiciousSum + item.values[0].value,
        blockedSum: curValue.blockedSum + item.values[1].value,
      };
    }, { suspiciousSum: 0, blockedSum: 0 });
    const totalSum = suspiciousAndBlockedSum.suspiciousSum + suspiciousAndBlockedSum.blockedSum;
    return {
      suspiciousSum: suspiciousAndBlockedSum.suspiciousSum,
      blockedSum: suspiciousAndBlockedSum.blockedSum,
      totalSum,
      suspiciousPercent: suspiciousAndBlockedSum.suspiciousSum / totalSum  * 100,
      blockedPercent: suspiciousAndBlockedSum.blockedSum / totalSum  * 100,
      cars1: props.totalAnomalies.cars1,
      cars2: props.totalAnomalies.cars2,
      cars3: props.totalAnomalies.cars3,
    };
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

  changeAlertsVisibilty =() => {
    this.setState({
      alertsVisibility: !this.state.alertsVisibility,
    });
  }

  render() {
    return (
      <div>
        <HeaderSite onClick={ this.changeAlertsVisibilty } />
        <div className={styles.layout}>
          <div className={cx(
            styles.layoutSideRight,
            styles.layoutCol20,
            { [this.state.alertsVisibility]: styles.notActive },
            )}
          >
            <VisibleAlertsList onClick={this.changeAlertsVisibilty} />
          </div>
          <div className={cx(styles.layoutSideLeft, styles.layoutCol80)}>
            <div className={cx(styles.backgroundGradient, styles.fleetStatus)}>
              <CarsStatus
                registeredCars={ this.state.registeredVehicles.registered }
                percentRegistered={ this.state.registeredVehicles.percentRegistered }
                active={ this.state.registeredVehicles.activity }
                uptodate={ this.state.registeredVehicles.updated }
                updateData={'13.01.16'}
              />
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
            <div className={cx(styles.layoutSideRight, styles.layoutCol30)}>
              <Target data={this.props.target} />
            </div>
            <div className={cx(styles.fleetStatus, styles.layoutSideLeft, styles.layoutCol70)}>
              <div className={cx(styles.backgroundGradient, styles.fleetActivity)}>
                <FleetActivity data={ this.state.fleetActivities } />
              </div>
              <div className={cx(styles.fleetActivity, styles.layoutCol50)}>
                <Categories name="categories" data={ this.state.categories } />
              </div>
              <div className={styles.layoutCol50}>
                <Map lat={48.856614} lng={2.3522219} />
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
    map
    }) => ({
      carsStatus,
      totalAnomalies,
      fleetActivities,
      categories,
      target,
      map,
    }),
    dispatch => bindActionCreators({
      getCarsStatus,
      getTotalAnomalies,
      getFleetActivities,
      getCategories,
      getTarget,
      getMap,
    }, dispatch)
)(Dashboard);
