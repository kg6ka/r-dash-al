import React, { Component, PropTypes } from 'react';
const { array, string, object, func } = PropTypes;
import styles from './RadioButtons.scss';

export default class RadioButtons extends Component {
  static propTypes = {
    names: array,
    checked: string,
    style: object,
    handlerClick: func,
  };

  renderRadioButton(item, idx) {
    return (
      [<input
        id={ `button-${idx}` }
        className={styles.customRadio}
        name="types"
        type="radio"
        value={ item }
        onChange={ this.props.handlerClick }
        checked={ this.props.checked === item }
      />,
      <label className={styles.radioButton}
        style={ this.props.style } key={ idx } htmlFor={ `button-${idx}` }
      >
        { item }
      </label>]
    );
  }

  render() {
    return (
      <div>
        {this.props.names.map((item, idx) =>
          this.renderRadioButton(item, idx))}
      </div>
    );
  }
}
