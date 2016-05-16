import React, { PropTypes, Component } from 'react'
import styles from '../../Alerts.scss'
import Alert from '../Alert/Alert'

class AlertsList extends Component {
    componentWillMount() {
        this.props.fetchAlerts();
    }
    render() {
        const alerts = this.props.alerts.msg;
        return (
            <div className={styles.alerts} >
                <div className={styles.close} onClick={this.props.onClick}>
                    <span>X</span>
                    </div>
                <img className={styles.carImage} src={`/assets/images/alerts/car.png`}/>
                <div className={styles.alertsHeader}>
                    <div className={styles.alertsNumber}>
                        <span>ALERTS </span>|
                        <span> {alerts.length}</span>
                     </div>
                    <div>
                        <span className={styles.vehicle}>Vehicle</span>
                        <span className={styles.msg}>MSG</span>
                    </div>
                </div>
                {alerts.map(alert =>
                    <Alert
                        key={alert.desc1}
                        number={alert.count1}
                        name={alert.desc1}
                        messages={alert.count2}
                        vehicleId={alert.desc2}
                        date={new Date(alert.timestamp)}
                        onClick={() => this.props.onResolveClick(alert.desc2)}
                    />
                )}
            </div>
        );
    }
}


export default AlertsList;
