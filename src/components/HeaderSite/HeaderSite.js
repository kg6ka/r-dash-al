import React, { Component, PropTypes } from 'react';
import { MainMenu } from './components';
import styles from './HeaderSite.scss';

class HeaderSite extends Component {
    constructor(props) {
        super(props);

        this.count_error = 3;
        this.update_label = 'Update';
        this.update_date = '2016 March 02, 13:21';
        this.user_img = 'avatar.png';
    }
    render() {
        return <header className={styles.headerSite}>
            <div className={styles.menuToggle}></div>
            <a href="#home" className={styles.logo}><img src="/assets/images/logo.png"/></a>
            <div className={styles.center}>
                <MainMenu/>
                <a className={styles.update}>
                    <span>{this.update_label}</span>
                    <span>{this.update_date}</span>
                </a>
            </div>
            <div className={styles.error}>{this.count_error}</div>
            <a href="#home" className={styles.user}><img src={`/assets/images/${this.user_img}`}/></a>
        </header>;
    }

}

export default HeaderSite;