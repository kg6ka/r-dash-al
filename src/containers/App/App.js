import React, { Component, PropTypes } from 'react';
const { node } = PropTypes;
import { connect } from 'react-redux';
import styles from './App.scss';

import { HeaderSite } from 'components';
  
class App extends Component {
  static propTypes = {
    children: node,
  }

  changeAlertsVisibilty =() => {
    this.setState({
      alertsVisibility: !this.state.alertsVisibility,
    });
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <HeaderSite onClick={ this.changeAlertsVisibilty } />
        { children }
      </div>
    );
  }
}

export default connect()(App);
