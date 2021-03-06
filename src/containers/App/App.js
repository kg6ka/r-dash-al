import React, { Component, PropTypes } from 'react';
const { node } = PropTypes;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showAlerts } from './../../redux/modules/alertsList';
import { getCurrentTags, changeCurrentTag } from './../../redux/modules/getTags';
import { setTime, stopTime, removeTime, setPeriod } from './../../redux/modules/time';

import styles from './App.scss';

import { HeaderSite } from 'components';

class App extends Component {
  static propTypes = {
    children: node,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if(!this.props.getTags.data.length) {
      this.props.getCurrentTags();
    }

  }
  changeAlertsVisibilty = () => {
    this.props.showAlerts(true);
  }

  render() {
    let thisName;
    const currentIndex = this.props.location.pathname.indexOf('/', 1);
    if (currentIndex > 0) {
      thisName = this.props.location.pathname.slice(1, currentIndex);
    } else {
      thisName = this.props.location.pathname.slice(1);
    }

    const { children, getTags } = this.props;
    return (
      <div>
        <HeaderSite
          onClick={this.changeAlertsVisibilty}
          changeTag={ this.props.changeCurrentTag }
          tags={ getTags.data }
          time={ this.props.time }
          currentName={ thisName }
          currentTag={this.props.getTags.currentTag }
          start={this.props.removeTime }
          stop={ this.props.stopTime }
          updateDate={this.props.updateDate}  />
        { children }
      </div>
    );
  }
}

export default connect(({
    alertsList,
    getTags,
    time,
  }) => ({
    alertsList,
    getTags,
    time,
  }),
  dispatch => bindActionCreators({
    showAlerts,
    getCurrentTags,
    changeCurrentTag,
    setTime,
    removeTime,
    stopTime,
    setPeriod,
  }, dispatch))(App);


