import { Component, PropTypes } from 'react';
const { bool, node, object } = PropTypes;
import { connect } from 'react-redux';

class AuthorizedArea extends Component {
  static propTypes = {
    isLoggedIn: bool.isRequired,
    children: node,
  };

  static contextTypes = {
    router: object.isRequired,
  };

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.context.router.push('/login');
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.isLoggedIn) {
      this.context.router.push('/login');
    }
  }

  render() {
    return this.props.isLoggedIn ? this.props.children : null;
  }
}

export default connect(
  ({ currentUser }) => ({ isLoggedIn: !!currentUser.token }),
)(AuthorizedArea);
