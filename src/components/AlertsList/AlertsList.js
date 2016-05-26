import React, { PropTypes, Component } from 'react';
const { object, func } = PropTypes;
import styles from './Alerts.scss';
import Alert from './components/Alert/Alert';
import MsgAlert from './components/MsgAlert/MsgAlert';

export default class AlertsList extends Component {
  static propTypes = {
    alerts: object,
    onClick: func,
    onResolveClick: func,
  };

  constructor(props) {
    super(props);
    this.state = { type: 'alertsVehicle' };
  }

  filterClickHandler(type) {
    this.setState({ type });
  }

  render() {
    const alerts = this.props.alerts[this.state.type];
    return (
      <div className={styles.alerts} >
        <div className={styles.close} onClick={ ::this.props.onClick }>
          <span>×</span>
        </div>
        <img className={styles.carImage} alt="car" src="/assets/images/alerts/car.png" />
        <div className={styles.alertsHeader}>
          <div className={styles.alertsNumber}>
            <span>ALERTS </span>|
            <span> {alerts.length}</span>
          </div>
          <div className={styles.alertsFilter}>
            <span
              className={ this.state.type === 'alertsVehicle' ? styles.active : '' }
              onClick={ this.filterClickHandler.bind(this, 'alertsVehicle') }
            >
              Vehicle
            </span>
            <span
              className={ this.state.type === 'alertsMessage' ? styles.active : '' }
              onClick={ this.filterClickHandler.bind(this, 'alertsMessage') }
            >
              MSG
            </span>
          </div>
        </div>
        { this.state.type === 'alertsVehicle'
        ? alerts.map((alert, idx) =>
          <Alert
            key={ idx }
            number={ alert.count1 }
            name={ alert.desc1 }
            messages={ alert.count2 }
            vehicleId={ alert.desc2 }
            date={ new Date(alert.timestamp) }
            onClick={ () => this.props.onResolveClick('alertsVehicle', alert.desc2) }
          />)
          : alerts.map((alert, idx) =>
            <MsgAlert
              key={ idx }
              number={ alert.count1 }
              name={ alert.desc1 }
              messages={ alert.count2 }
              vehicleId={ alert.desc2 }
              date={ new Date(alert.timestamp) }
              onClick={ () => this.props.onResolveClick('alertsMessage', alert.desc2) }
            />)}
      </div>
    );
  }
}
