import React, { Component, PropTypes } from 'react';
const { node } = PropTypes;
import { connect } from 'react-redux';
import styles from './App.scss';

import { HeaderSite } from 'components';
  
class App extends Component {
  static propTypes = {
    children: node,
  }



  render() {
    const { children } = this.props;
    return (
      <div>
        <HeaderSite />
        { children }
      </div>
    );
  }
}

export default connect()(App);
