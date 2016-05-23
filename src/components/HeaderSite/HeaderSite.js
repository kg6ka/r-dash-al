import React from 'react';
import { MainMenu, ToggleMenu } from './components';
import { Link } from 'react-router';
import styles from './HeaderSite.scss';

export default (properties) => {
  const countError = 2;
  const updateLabel = 'Update';
  const updateDate = '2016 March 02, 13:21';
  const userImg = 'avatar.png';
  return (
    <header className={styles.headerSite}>
      <ToggleMenu />
      <Link to="dashboard" className={styles.logo}>
        <img alt="logo" src="/assets/images/logo.png" />
      </Link>
      <div className={styles.center}>
        <MainMenu />
        <a className={styles.update}>
          <span>{ updateLabel }</span>
          <span>{ updateDate }</span>
        </a>
      </div>
      <div className={styles.error} onClick={ ::properties.onClick }>
        { countError }
      </div>
      <a href="#home" className={styles.user}>
        <img alt="user" src={`/assets/images/${userImg}`} />
      </a>
    </header>
  );
};
