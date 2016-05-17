import React from 'react';
import { Scrollbars, DataBars } from 'components';
import styles from './VehiclesFilter.scss';

const data = [
  { val: '20',
    msg: 'B1-1215-15',
    suspicious: '100',
    blocked: '160',
  },
  { val: '18',
    msg: 'B1-1215-18',
    suspicious: '120',
    blocked: '90',
  },
  { val: '17',
    msg: 'B1-1215-22',
    suspicious: '90',
    blocked: '120',
  },
  { val: '8',
    msg: 'B1-1215-30',
    suspicious: '60',
    blocked: '90',
  },
  { val: '5',
    msg: 'B1-1215-02',
    suspicious: '70',
    blocked: '50',
  },
  { val: '20',
    msg: 'B1-1215-15',
    suspicious: '100',
    blocked: '160',
  },
  { val: '18',
    msg: 'B1-1215-18',
    suspicious: '120',
    blocked: '90',
  },
  { val: '17',
    msg: 'B1-1215-22',
    suspicious: '90',
    blocked: '120',
  },
  { val: '8',
    msg: 'B1-1215-30',
    suspicious: '60',
    blocked: '90',
  },
  { val: '5',
    msg: 'B1-1215-02',
    suspicious: '70',
    blocked: '50',
  },
];
const VehiclesFilter = () =>
    <div className={styles.msgFilter}>
      <div>
        <div className="glowText">Filter by vehicles</div>
      </div>
      <div className={styles.scroll}>
        <Scrollbars>
          <div className={styles.charts}>
            { argusComponents.target['Vehicle'].map((el, idx) => {
              const { key,total,blocked } = el;
              return (<DataBars
                key={ idx }
                style={{
                  width: window.innerWidth / 28.5,
                  height: '80%',
                }}
                data={{
                  val:total,
                  msg:key,
                  suspicious:total - blocked,
                  blocked:blocked,
                  maxHeight: '400',
                }}
              />);
            })}
          </div>
        </Scrollbars>
      </div>
    </div>;

export default VehiclesFilter;
