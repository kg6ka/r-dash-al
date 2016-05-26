import React, { Component } from 'react';
import { Scrollbars, DataBars } from 'components';
import styles from './VehiclesFilter.scss';

export default class VehiclesFilter extends Component {

  render() {
    let max = 0;
    for (const i in this.props.data.ECU) {
      if (this.props.data.ECU[i].total > max)
        max = this.props.data.ECU[i].total;
    }

    for (const i in this.props.data.MSG) {
      if (this.props.data.MSG[i].total > max)
        max = this.props.data.MSG[i].total;
    }

    for (const i in this.props.data.Vehicle) {
      if (this.props.data.Vehicle[i].total > max)
        max = this.props.data.Vehicle[i].total;
    }

    if (max > 1000) max = 10000;
    if (max <= 1000) max = 1000;
    if (max <= 500) max = 500;
    if (max <= 100) max = 100;
    if (max <= 10) max = 10;
    if (max <= 5) max = 5;

    const maxDomain = max;

    return (
      <div className={styles.msgFilter}>
        <div>
          <div className="glowText">Filter by vehicles</div>
        </div>
        <div className={styles.scroll}>
          <Scrollbars>
            <div className={styles.charts}>
              { this.props.data.Vehicle.map((el, idx) => {
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
                    blocked,
                    maxHeight: maxDomain,
                  }}
                  />);
              })}
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  };
}
