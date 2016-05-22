import React, { PropTypes } from 'react';
import styles from '../../Alerts.scss';

const MsgAlert = ( { onClick, name, number, messages, vehicleId, date }) => (
    <div className={styles.row}>
        <div className={styles.divInRow}>
      <span className={styles.topdiv}>
           {messages}
          <img  src={'/assets/images/alerts/Alerts.png'} />
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
                  <img src={'/assets/images/alerts/icon-car.svg'} />
              {number}

      </span>

            <span className={styles.date}>{date.toDateString()}</span>
        </div>
    </div>
)

MsgAlert.propTypes = {
    onClick: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    messages: PropTypes.number.isRequired,
    vehicleId: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
};

export default MsgAlert;