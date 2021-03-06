import React, { PropTypes, Component } from 'react';
const { object } = PropTypes;
import styles from './Target.scss';
import { Designations } from '../FleetActivity/components';
import { DataView } from './components';
import { RadioButtons } from 'components';
import Scrollbar from 'react-custom-scrollbars';

const buttonsNames = ['ECU', 'MSG', 'Vehicle'];

export default class Target extends Component {
  static propTypes = {
    data: object,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: 'ECU',
    };
  }

  handlerClick(event) {
    this.setState({
      checked: event.currentTarget.value,
    });
  }

  renderTrack({ style }) {
    const trackStyle = {
      width: '2%',
      position: 'absolute',
      height: '90%',
      right: 0,
      top: 0,
      bottom: 0,
      borderRadius: '3px',
      cursor: 'pointer',
      backgroundColor: '#070707',
    };
    return (
      <div
        style={{ ...style, ...trackStyle }}
      />
    );
  }

  renderThumb({ style }) {
    const thumbStyle = {
      backgroundColor: '#2fc6f4',
      borderRadius: '3px',
    };
    return (
        <div
          style={{ ...style, ...thumbStyle }}
        />
    );
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

    const range = [5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000,
      1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1000000000];

    for (let i = 0; i <= range.length; i++) {
      if (max < range[i]) {
        max = range[i];
        break;
      }
    }
    let maxDomain = max;
    return (
      <div className={ styles.content }>
        <div
          className={ styles.glowText }
        >
          TARGET
        </div>
        <div className={styles.buttonsBlock}>
          <RadioButtons
            names={ buttonsNames }
            checked={ this.state.checked }
            handlerClick ={:: this.handlerClick}
            style={{
              width: window.innerWidth / 26.7,
              height: window.innerWidth / 87.3,
            }}
          />
        </div>
        <div className={styles.title}>TOP TARGETS</div>
        <div className={styles.designations}>
        <svg height={ window.innerWidth / 64 }>
          <Designations
            x="0"
            y={ window.innerWidth / 192 }
            color="suspiciousGradient"
            textColor="#8f9295"
            text="Suspicious"
          />
          <Designations
            x={ window.innerWidth / 11.4 }
            y={ window.innerWidth / 192 }
            color="blockedGradient"
            textColor="#8f9295"
            text="Blocked"
          />
        </svg>
        </div>
        <div className={styles.dataBlockInner}>
          <Scrollbar
            renderTrackVertical={this.renderTrack}
            renderThumbVertical={this.renderThumb}
          >
            <div className={styles.dataBlockInner}>
            { this.props.data[this.state.checked].map((el, idx) =>
                <DataView
                  maxDomain={ maxDomain }
                  key={ idx }
                  name={ el.key }
                  total={ el.total }
                  blocked={ el.blocked }
                />
            ) }
            </div>
          </Scrollbar>
        </div>
      </div>
    );
  }
}
