import React, { Component, PropTypes } from 'react';
const { node } = PropTypes;
import { connect } from 'react-redux';
import { showAlerts } from './../../redux/modules/alertsList';
import { bindActionCreators } from 'redux';
import styles from './App.scss';

import { HeaderSite } from 'components';
  
class App extends Component {
  static propTypes = {
    children: node,
  }
  changeAlertsVisibilty = () => {
    this.props.showAlerts(true);
  }
  
  render() {
    const { children } = this.props;
    return (
      <div>
        <HeaderSite onClick={this.changeAlertsVisibilty}/>
        { children }
      </div>
    );
  }
}

export default connect(({
        alertsList
    }) => ({
      alertsList
    }),
    dispatch => bindActionCreators({
      showAlerts
    }, dispatch))(App);



