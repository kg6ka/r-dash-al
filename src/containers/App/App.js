import React, { Component, PropTypes } from 'react';
const { node } = PropTypes;
import { connect } from 'react-redux';
import styles from './App.scss';

class App extends Component {
  static propTypes = {
    children: node,
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        This is an example how to organize general layout in app. This line is in App.js file
        <hr />
        <header className={styles.custom}>
          This header is styled by style, specified in CSS module
        </header>
        <hr />
        { children }
        <hr />
        <footer>Footer</footer>
      </div>
    );
  }
}

export default connect()(App);
