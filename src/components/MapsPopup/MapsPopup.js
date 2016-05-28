import React, { Component, PropTypes } from 'react';
const { object, func } = PropTypes;
import { Modal, Map } from 'components';
import styles from './MapsPopup.scss';
import { connect } from 'react-redux';
import { openMapsPopup, hideMapsPopup, getHeatmapData } from 'redux/modules/mapsPopup';

export default class MapsPopup extends Component {
  static propTypes = {
    mapsPopup: object,
    openMapsPopup: func,
    hideMapsPopup: func,
    getHeatmapData: func,
  };

  render() {
    return (
      <Modal
        isOpen={ this.props.mapsPopup.isMapsModalOpen }
        onRequestClose={ this.props.hideMapsPopup }
        className={styles.popupContent}
      >
        <Map
          lat={this.props.map.center.lat}
          lng={this.props.map.center.lng}
          locations={this.props.map.data}
          desc={this.props.map.center.desc}
          isMapsModalOpen={this.props.mapsPopup.isMapsModalOpen}
          />
      </Modal>
    );
  }
}

export default connect(
  ({ mapsPopup, map }) => ({ mapsPopup, map }),
  { openMapsPopup, hideMapsPopup, getHeatmapData }
)(MapsPopup);
