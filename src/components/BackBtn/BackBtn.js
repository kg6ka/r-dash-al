import React from 'react';
import { Link } from 'react-router';
import styles from './BackBtn.scss';

export default () => (
  <div className={styles.backBtn}>
    <Link to="/dashboard" >Dashboard</Link>
  </div>
);
