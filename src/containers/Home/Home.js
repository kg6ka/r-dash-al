import React, { Component, PropTypes } from 'react';
const { object, func } = PropTypes;
import { connect } from 'react-redux';
import { logout } from 'redux/modules/currentUser';

class Home extends Component {
  static propTypes = {
    currentUser: object.isRequired,
    logout: func.isRequired,
  };

  render() {
    const { currentUser: { token }, logout: doLogout } = this.props;
    return (
      <h1>Hello! {token}
        <button onClick={doLogout}>Logout</button>
      </h1>
    );
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser }),
  { logout }
)(Home);
