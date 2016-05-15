import React, { Component } from 'react';
import { HeaderSite, AnomaliesContainer } from 'components';
import styles from '../Dashboard/Dashboard.scss';
import cx from 'classnames';


export default class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: Math.random(),
            alertsVisibility: false
        };
    }

    componentDidMount() {
        window.setInterval(() => {
            this.setState({
                percent: Math.random(1),
            });
        }, 5000);

    }
    changeAlertsVisibilty =() => {
        this.setState({
            alertsVisibility: !this.state.alertsVisibility
        });
    }

    render() {

        return (
            <div>
                <HeaderSite onClick={this.changeAlertsVisibilty}/>
                <div className={styles.layout}>
                <AnomaliesContainer/>
                    </div>
            </div>
        );
    }
}


