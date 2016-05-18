import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router';
import styles from './BackBtn.scss';

export default class BackBtn extends Component {
    render() {
        return (
            <div className={styles.backBtn}>
            <Link style={{color:'#337ab7',  fontSize: '17px'}}  to="/dashboard" > {"<"} </Link>
            <span>Dashboard</span>
                </div>
            );
    }
}



