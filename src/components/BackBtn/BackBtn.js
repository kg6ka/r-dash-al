import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './BackBtn.scss';

export default class AnomaliesList extends Component {
  handler() {
    console.log('Export table');
  }

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.backBtn}>
          <Link to="/dashboard" >Dashboard</Link>
        </div>
        <div className={styles.export} onClick={this.handler.bind(this)}>
          EXPORT
        </div>
      </div>
    );
  }
}
