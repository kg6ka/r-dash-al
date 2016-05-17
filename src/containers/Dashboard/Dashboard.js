import React, { Component } from 'react';
import { CarsStatus, Anomalies, FleetActivity, Categories,
  Target, VisibleAlertsList, Map } from 'components';
import styles from './Dashboard.scss';
import layout from '../App/App.scss';
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
   
  changeAlertsVisibilty = () => {
    this.setState({
      alertsVisibility: !this.state.alertsVisibility,
    });
  }


  render() {
    return (
      <div>
        
        <div className={layout.layout}>
          <div className={cx(
            layout.layoutSideRight,
            layout.layoutCol20,
            (this.state.alertsVisibility) && styles.notActive
           )}
          >
            <VisibleAlertsList onClick={this.changeAlertsVisibilty} />
          </div>
          <div className={cx(layout.layoutSideLeft, layout.layoutCol80)}>
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
            <div className={cx(layout.layoutSideRight, layout.layoutCol30)}>
              <Target />
            </div>
            <div className={cx(styles.fleetStatus, layout.layoutSideLeft, layout.layoutCol70)}>
              <div className={cx(styles.backgroundGradient, styles.fleetActivity)}>
                <FleetActivity />
              </div>
              <div className={cx(styles.fleetActivity, layout.layoutCol50,layout.height50)}>
                <Categories name="categories" />
              </div>
              <div className={cx(layout.layoutCol50,layout.height50)}>
                <Map lat={48.856614} lng={2.3522219} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
