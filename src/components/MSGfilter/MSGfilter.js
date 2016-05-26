import React, { Component } from 'react';
import { RadioButtons, Scrollbars, DataBars } from 'components';
import styles from './MSGfilter.scss';

const buttonsNames = ['ID', 'ECU'];

export default class MSGfilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'ID',
    };
  }

  handlerClick(event) {
    this.setState({
      checked: event.currentTarget.value,
    });
  }

  render() {
    let max = 0;
    for (const i in this.props.data.ECU) {
      if (this.props.data.ECU[i].total > max) {
        max = this.props.data.ECU[i].total;
      }
    }

    for (const i in this.props.data.MSG) {
      if (this.props.data.MSG[i].total > max) {
        max = this.props.data.MSG[i].total;
      }
    }

    for (const i in this.props.data.Vehicle) {
      if (this.props.data.Vehicle[i].total > max) {
        max = this.props.data.Vehicle[i].total;
      }
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
          <div className="glowText">filter by message</div>
          <div className={styles.buttonsBlock}>
            <RadioButtons
              names={ buttonsNames }
              checked={ this.state.checked }
              handlerClick ={:: this.handlerClick}
              style={{
                width: '49%',
                height: '6.7%',
              }}
            />
          </div>
        </div>
        <div className={styles.scroll}>
          <Scrollbars>
            <div className={styles.charts}>
              { this.props.data[this.state.checked == 'ID' ? 'MSG' : this.state.checked].map((el, idx) => {
              const { key,total,blocked } = el;
              return (<DataBars
                key={ idx }
                style={{
                  width: window.innerWidth / 28.5,
                  height: '80%',
                }}
                onChange={ this.props.onChange.bind(this, el, this.state.checked) }
                data={{
                  val:total,
                  msg:key,
                  suspicious:total - blocked,
                  blocked: blocked,
                  maxHeight: '200',
                }}
              />);
              })}
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
