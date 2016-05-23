import React, { Component } from 'react';
import { RadioButtons, Scrollbars, DataBars } from 'components';
import styles from './MSGfilter.scss';

const buttonsNames = ['ID', 'ECU'];
const data = [
  { val: '160',
    msg: '0x103',
    suspicious: '100',
    blocked: '160',
  },
  { val: '100',
    msg: '0x2A3',
    suspicious: '120',
    blocked: '90',
  },
  { val: '100',
    msg: '0x55E',
    suspicious: '90',
    blocked: '120',
  },
  { val: '30',
    msg: '0x145',
    suspicious: '60',
    blocked: '90',
  },
  { val: '20',
    msg: '0x26',
    suspicious: '70',
    blocked: '50',
  },
  { val: '160',
    msg: '0x103',
    suspicious: '100',
    blocked: '160',
  },
  { val: '100',
    msg: '0x2A3',
    suspicious: '120',
    blocked: '90',
  },
  { val: '100',
    msg: '0x55E',
    suspicious: '90',
    blocked: '120',
  },
  { val: '30',
    msg: '0x145',
    suspicious: '60',
    blocked: '90',
  },
  { val: '20',
    msg: '0x26',
    suspicious: '70',
    blocked: '50',
  },
];

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
