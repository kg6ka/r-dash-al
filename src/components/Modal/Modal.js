import React from 'react';
import Modal from 'react-modal';
import styles from './Modal.scss';

const defaultStyles = {
  overlay: {
    backgroundColor: null,
    zIndex: 10,
  },
  content: {
    position: 'absolute',
    top: null,
    left: null,
    right: null,
    bottom: null,
    border: null,
    background: null,
    borderRadius: null,
    outline: null,
    padding: null,
    overflow: 'visible',
  },
};

export default (properties) => {
  if (properties.isOpen) {
    return (
      <div>
        <Modal {...properties} style={defaultStyles}>
          { properties.children }
          <button
            onClick={ properties.onRequestClose }
            className={styles.closeBtn}
          >
            &times;
          </button>
        </Modal>
      </div>
    );
  }

  return (<div />);
};
