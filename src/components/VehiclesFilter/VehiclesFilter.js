import React, { Component } from 'react';
import { Scrollbars, DataBars } from 'components';
import styles from './VehiclesFilter.scss';

export default class VehiclesFilter extends Component {
  render() {
    let max = 0;
    for(var i in argusComponents.target.ECU) {
      if(argusComponents.target.ECU[i].total > max)
        max = argusComponents.target.ECU[i].total;
    }

    for(var i in argusComponents.target.MSG) {
      if(argusComponents.target.MSG[i].total > max)
        max = argusComponents.target.MSG[i].total;
    }

    for(var i in argusComponents.target.Vehicle) {
      if(argusComponents.target.Vehicle[i].total > max)
        max = argusComponents.target.Vehicle[i].total;

    }

    if(max > 1000)  max = 10000;
    if(max <= 1000)  max = 1000;
    if(max <= 500)  max = 500;
    if(max <= 100)  max = 100;
    if(max <= 10)   max = 10;
    if(max <= 5)    max = 5;

    let maxDomain = max;



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
                  maxHeight: maxDomain,
                }}
                onChange={ this.props.onChange.bind(this, el) }
              />);
            })}
          </div>
        </Scrollbars>
      </div>
    </div>);
  };
}

