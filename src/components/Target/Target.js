import React, { Component } from 'react';
import styles from './Target.scss';
import { Designations } from '../FleetActivity/components';
import { DataView } from './components';
import { RadioButtons } from 'components';
import Scrollbar from 'react-custom-scrollbars';

const data1 = [
  {
    name: 'AFCM',
    total: 160,
    blocked: 100,
  },
  {
    name: 'APIM',
    total: 100,
    blocked: 50,
  },
  {
    name: 'OLS',
    total: 80,
    blocked: 30,
  },
  {
    name: 'BCM',
    total: 30,
    blocked: 10,
  },
  {
    name: 'BTRS',
    total: 75,
    blocked: 36,
  },
  {
    name: 'AFCM',
    total: 160,
    blocked: 100,
  },
  {
    name: 'APIM',
    total: 100,
    blocked: 50,
  },
  {
    name: 'OLS',
    total: 80,
    blocked: 30,
  },
  {
    name: 'BCM',
    total: 30,
    blocked: 10,
  },
  {
    name: 'BTRS',
    total: 75,
    blocked: 36,
  },
];

const buttonsNames = ['ECU', 'MSG', 'Vehicle'];

export default class Target extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'ECU',
    };
  }

  renderTrack({ style }) {
    const trackStyle = {
      width: '2%',
      position: 'absolute',
      height: '90%',
      right: '0',
      top: '0',
      bottom: '0',
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
            { data1.map((el, idx) =>
                <DataView key={ idx } name={ el.name } total={ el.total } blocked={ el.blocked } />
            ) }
            </div>
          </Scrollbar>
        </div>
      </div>
    );
  }
}
