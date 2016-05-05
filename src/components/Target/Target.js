import React, { Component } from 'react';
import styles from './Target.scss';
import { Designations } from '../FleetActivity/components';
import { DataView } from './components';
// import Scrollbar from 'react-gemini-scrollbar';
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

  onChange(event) {
    this.setState({
      checked: event.currentTarget.value,
    });
  }

  renderRadioButton(item, idx) {
    return (
      [<input
        id={ `target-${idx}` }
        className={styles.customRadio}
        name="types"
        type="radio"
        value={ item }
        onChange={ ::this.onChange }
        checked={ this.state.checked === item }
      />,
      <label className={styles.radioButton} key={ idx } htmlFor={ `target-${idx}` }>
        { item }
      </label>]
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
          { buttonsNames.map((item, idx) =>
            this.renderRadioButton(item, idx)) }
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
        <Scrollbar className={styles.dataBlock}>
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
