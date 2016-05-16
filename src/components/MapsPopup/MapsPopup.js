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
        <Map lat={48.856614} lng={2.3522219} />
      </Modal>
    );
  }
}

export default connect(
  ({ mapsPopup }) => ({ mapsPopup }),
  { openMapsPopup, hideMapsPopup, getHeatmapData }
)(MapsPopup);
