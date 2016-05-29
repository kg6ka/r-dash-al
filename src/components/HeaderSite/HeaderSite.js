import React, { Component, PropTypes } from 'react';
import { MainMenu, ToggleMenu } from './components';
import { Link } from 'react-router';
import styles from './HeaderSite.scss';
import moment from 'moment';
const { object, func, array } = PropTypes;

class HeaderSite extends Component {
  static propTypes = {
    time: object,
    start: func,
    stop: func,
    tags: array,
    onClick: func,
  };
  constructor(props) {
    super(props);

    this.count_error = 2;
    this.update_label = 'Update ';
//     this.update_date = '2016 March 02, 13:21';
    this.user_img = 'avatar.png';
  }

  changeTimer() {
    if (this.props.time.paused) {
      this.props.start();
    } else {
      this.props.stop();
    }
  }

  render() {


    const updateDate = moment(this.props.time.updateDate).format('MMMM DD, h:mm');
    
    return <header className={styles.headerSite}>
      <ToggleMenu
        period={this.props.time.period}
        />
      <Link to="/dashboard" className={styles.logo}><img src="/assets/images/logo.png"/></Link>
      <div className={styles.center}>
        <MainMenu
          tags={ this.props.tags }
          currentName={ this.props.currentName }
          currentTag={ this.props.currentTag }
          changeTag={ this.props.changeTag }
          />
        <a className={styles.update}>
          <div className={this.props.time.paused ? styles.updateButtonCancel : styles.updateButton} onClick={ ::this.changeTimer }></div>
          <span>{this.update_label}</span>
          <span>{updateDate}</span>
        </a>
      </div>
      <div className={styles.error} onClick={this.props.onClick.bind(this)}>{this.count_error}</div>
      <a href="#home" className={styles.user}><img src={`/assets/images/${this.user_img}`}/></a>
    </header>;
  }

}

export default HeaderSite;
