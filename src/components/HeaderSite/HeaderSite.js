import React, { Component, PropTypes } from 'react';
import { MainMenu,ToggleMenu } from './components';
import { Link } from 'react-router';
import styles from './HeaderSite.scss';

class HeaderSite extends Component {
    constructor(props) {
        super(props);

        this.count_error = 2;
        this.update_label = 'Update';
        this.update_date = '2016 March 02, 13:21';
        this.user_img = 'avatar.png';
    }


    render() {
        return <header className={styles.headerSite}>
            <ToggleMenu/>
            <Link to="dashboard" className={styles.logo}><img src="/assets/images/logo.png"/></Link>
            <div className={styles.center}>
                <MainMenu tags={ this.props.tags } />
                <a className={styles.update}>
                    <span>{this.update_label}</span>
                    <span>{this.update_date}</span>
                </a>
            </div>
            <div className={styles.error} onClick={this.props.onClick.bind(this)}>{this.count_error}</div>
            <a href="#home" className={styles.user}><img src={`/assets/images/${this.user_img}`}/></a>
        </header>;
    }

}

export default HeaderSite;