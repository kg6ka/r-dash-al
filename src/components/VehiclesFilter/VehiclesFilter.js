import React from 'react';
import { Scrollbars, DataBars } from 'components';
import styles from './VehiclesFilter.scss';

const VehiclesFilter = () => {
  return (<div className={styles.msgFilter}>
      <div>
        <div className="glowText">Filter by vehicles</div>
      </div>
      <div className={styles.scroll}>
        <Scrollbars>
          <div className={styles.charts}>
            { argusComponents.target['Vehicle'].map((el, idx) => {
              const { key, total, blocked } = el;
              return (<DataBars
                key={ idx }
                style={{
                  width: window.innerWidth / 28.5,
                  height: '80%',
                }}
                data={{
                  val: total,
                  msg: key,
                  suspicious: total - blocked,
                  blocked: blocked,
                  maxHeight: '400',
                }}
              />);
            })}
          </div>
        </Scrollbars>
      </div>
    </div>);
};

export default VehiclesFilter;
