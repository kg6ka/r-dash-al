import React, { Component } from 'react';
import { MainMenu, ToggleMenu } from './components';
import { Link } from 'react-router';
import styles from './HeaderSite.scss';

class HeaderSite extends Component {
    constructor(props) {
        super(props);

        this.count_error = 2;
        this.update_label = 'Update';
        this.update_date = '2016 March 02, 13:21';
        this.user_img = 'avatar.png';
        this.state = {};
        this.state.updateStop = false;
    }

    changeTimer() {
      if (this.state.updateStop) {
        this.props.start();
        this.setState({
          updateStop: false,
        });
      } else {
        this.props.stop();
        this.setState({
          updateStop: true,
        });
      }
    }


    render() {
        return <header className={styles.headerSite}>
            <ToggleMenu/>
            <Link to="dashboard" className={styles.logo}><img src="/assets/images/logo.png"/></Link>
            <div className={styles.center}>
                <MainMenu
                  tags={ this.props.tags }
                  currentName={ this.props.currentName }
                  currentTag={ this.props.currentTag }
                  changeTag={ this.props.changeTag }
                  />
                <a className={styles.update}>
                  {this.state.updateStop ?
                    <div className={styles.updateButtonCancel} onClick={ ::this.changeTimer }></div> :
                    <div className={styles.updateButton} onClick={ ::this.changeTimer }></div>}
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
