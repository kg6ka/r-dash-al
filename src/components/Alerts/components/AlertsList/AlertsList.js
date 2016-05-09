import React, { PropTypes, Component } from 'react'
import styles from '../../Alerts.scss'
import Alert from '../Alert/Alert'

class AlertsList extends Component {
    componentWillMount() {
        this.props.fetchAlerts();
    }
    render() {
        const alerts = this.props.alerts;
        return (
            <div className={styles.alerts}>
                <img className={styles.carImage} src={`/assets/images/alerts/car.png`}/>
                <div className={styles.alertsHeader}>
                    <span className={styles.alertsNumber}>ALERTS | {alerts.length}</span>
                    <div>
                        <span className={styles.vehicle}>Vehicle</span>
                        <span className={styles.msg}>MSG</span>
                    </div>
                </div>
                {alerts.map(alert =>
                    <Alert
                        key={alert.id}
                        {...alert}
                        onClick={() => this.props.onResolveClick(alert.id)}
                    />
                )}
            </div>
        );
    }
}


export default AlertsList;