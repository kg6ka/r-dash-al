import React, { Component } from 'react';
import { HeaderSite, CarsStatus, Anomalies, FleetActivity, Categories,
  Target, VisibleAlertsList, Map } from 'components';
import styles from './Dashboard.scss';
import cx from 'classnames';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      alertsVisibility: false,
    };
  }

  componentDidMount() {
    store.subscribe(()=> this.setState({ index: 0 })).bind(this);
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
            (this.state.alertsVisibility) && styles.notActive
           )}
          >
            <VisibleAlertsList onClick={this.changeAlertsVisibilty} />
          </div>
          <div className={cx(styles.layoutSideLeft, styles.layoutCol80)}>
            <div className={cx(styles.backgroundGradient, styles.fleetStatus)}>
              <CarsStatus
                registeredCars={ argusComponents.fleetStatus.registered }
                percentRegistered={12}
                active={ argusComponents.fleetStatus.activity }
                uptodate={ argusComponents.fleetStatus.updated }
                updateData={'13.01.16'}
              />
              <Anomalies
                anomalies={ argusComponents.totalAnomalies.total_sum }
                cars1={ argusComponents.totalAnomalies.cars1 }
                percent={ argusComponents.totalAnomalies.blocked_percent }
                percentRight={ argusComponents.totalAnomalies.suspicious_percent }
                unblocked={ argusComponents.totalAnomalies.suspicious_sum }
                cars2={ argusComponents.totalAnomalies.cars2 }
                blocked={ argusComponents.totalAnomalies.blocked_sum }
                cars3={ argusComponents.totalAnomalies.cars3 }
              />
            </div>
            <div className={cx(styles.layoutSideRight, styles.layoutCol30)}>
              <Target />
            </div>
            <div className={cx(styles.fleetStatus, styles.layoutSideLeft, styles.layoutCol70)}>
              <div className={cx(styles.backgroundGradient, styles.fleetActivity)}>
                <FleetActivity />
              </div>
              <div className={cx(styles.fleetActivity, styles.layoutCol50)}>
                <Categories name="categories" />
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
