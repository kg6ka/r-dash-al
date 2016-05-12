import React, { Component, PropTypes } from 'react';
const { object } = PropTypes;
import { Scrollbars } from 'react-custom-scrollbars';

export default class CustomScrollbars extends Component {
  static propTypes = {
    children: object,
  };

  renderTrack({ style }) {
    const trackStyle = {
      width: '90%',
      position: 'absolute',
      height: '2%',
      right: '5%',
      bottom: '7%',
      borderRadius: '3px',
      cursor: 'pointer',
      backgroundColor: '#37434b',
    };
    return (
      <div
        style={{ ...style, ...trackStyle }}
      />
    );
  }

  renderThumb({ style }) {
    const thumbStyle = {
      backgroundColor: '#cecece',
      borderRadius: '3px',
      width: '30%',
    };
    return (
        <div
          style={{ ...style, ...thumbStyle }}
        />
    );
  }

  render() {
    return (
      <Scrollbars
        renderTrackHorizontal={this.renderTrack}
        renderThumbHorizontal={this.renderThumb}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}
