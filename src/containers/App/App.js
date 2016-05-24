import React, { Component, PropTypes } from 'react';
const { node } = PropTypes;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showAlerts } from './../../redux/modules/alertsList';
import { getCurrentTags } from './../../redux/modules/getTags';
import styles from './App.scss';

import { HeaderSite } from 'components';

class App extends Component {
  static propTypes = {
    children: node,
  };

  componentDidMount() {
    if(!this.props.getTags.data.length) {
      this.props.getCurrentTags();
    }
  }
  changeAlertsVisibilty = () => {
    this.props.showAlerts(true);
  }

  render() {
    const { children, getTags } = this.props;
    return (
      <div>
        <HeaderSite onClick={this.changeAlertsVisibilty} tags={ getTags.data } />
        { children }
      </div>
    );
  }
}

export default connect(({
        alertsList,
        getTags,
    }) => ({
      alertsList,
      getTags,
    }),
    dispatch => bindActionCreators({
      showAlerts,
      getCurrentTags,
    }, dispatch))(App);


