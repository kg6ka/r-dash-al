import React, { Component, PropTypes } from 'react';
const { bool, object, func } = PropTypes;
import { connect } from 'react-redux';
import { login } from 'redux/modules/currentUser';

class Login extends Component {
  static propTypes = {
    isLoggedIn: bool.isRequired,
    login: func.isRequired,
  };

  static contextTypes = {
    router: object.isRequired,
  };

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.context.router.push('/');
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isLoggedIn) {
      this.context.router.push('/');
    }
  }

  handleLogin = (e) => {
    this.props.login(
      this.refs.login.value,
      this.refs.password.value,
    );
    e.preventDefault();
  }

  render() {
    return (
      <div>
        This is a fake login page. login and password is submitted through Redux
        <form onSubmit={this.handleLogin}>
          Login: <input type="text" ref="login" />
          Password: <input type="password" ref="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default connect(
  ({ currentUser }) => ({ isLoggedIn: !!currentUser.token }),
  { login }
)(Login);
