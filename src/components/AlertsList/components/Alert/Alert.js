import React, { PropTypes } from 'react';
import styles from '../../Alerts.scss';

const Alert = ( { onClick, name, number, messages, vehicleId, date }) => (
  <div className={styles.row}>
    <div className={styles.divInRow}>
      <span className={styles.topdiv}>
          {number}
        <img  src={'/assets/images/alerts/icon-car.svg'} />
      </span>
      <span className={styles.resolve} onClick={onClick}>Resolve</span>
    </div>
    <div className={styles.divInRow}>
      <div className={styles.name_id}>
        <span>{name}</span> |
        <span>{vehicleId}</span>
      </div>
    </div>
    <div className={styles.divInRow}>
        <span className={styles.btmdiv}>
          <img  src={'/assets/images/alerts/Alerts.png'} />
          {messages}
        </span>
        <span className={styles.date}>{date.toDateString()}</span>
    </div>
  </div>
)

Alert.propTypes = {
  onClick: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  messages: PropTypes.number.isRequired,
  vehicleId: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
};

export default Alert;
